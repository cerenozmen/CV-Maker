import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ZoomIn, Move, Check, X } from "lucide-react";

const D = 256; // circular viewport size (px)
const OUT = 400; // exported square size (px)

export const PhotoCropperDialog = ({ open, src, initialCrop, onCancel, onSave }) => {
  const imgRef = useRef(null);
  const dragRef = useRef(null);
  const [nat, setNat] = useState(null); // {w,h}
  const [zoom, setZoom] = useState(initialCrop?.zoom || 1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const baseScale = nat ? D / Math.min(nat.w, nat.h) : 1;
  const drawnW = nat ? nat.w * baseScale * zoom : D;
  const drawnH = nat ? nat.h * baseScale * zoom : D;

  const clamp = useCallback((p, dw, dh) => ({
    x: Math.min(0, Math.max(D - dw, p.x)),
    y: Math.min(0, Math.max(D - dh, p.y)),
  }), []);

  // load natural dimensions when the dialog opens / src changes
  useEffect(() => {
    if (!open || !src) return;
    const im = new Image();
    im.onload = () => {
      const w = im.naturalWidth, h = im.naturalHeight;
      setNat({ w, h });
      const bs = D / Math.min(w, h);
      const z = initialCrop?.zoom || 1;
      const dw = w * bs * z, dh = h * bs * z;
      const start = initialCrop
        ? { x: initialCrop.x, y: initialCrop.y }
        : { x: (D - dw) / 2, y: (D - dh) / 2 };
      setZoom(z);
      setPos({ x: Math.min(0, Math.max(D - dw, start.x)), y: Math.min(0, Math.max(D - dh, start.y)) });
    };
    im.src = src;
  }, [open, src, initialCrop]);

  const onZoom = (v) => {
    const z = v[0];
    const dw = nat.w * baseScale * z, dh = nat.h * baseScale * z;
    // keep the center point stable while zooming
    const cx = (D / 2 - pos.x) / (drawnW || 1);
    const cy = (D / 2 - pos.y) / (drawnH || 1);
    const next = { x: D / 2 - cx * dw, y: D / 2 - cy * dh };
    setZoom(z);
    setPos(clamp(next, dw, dh));
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const next = {
      x: dragRef.current.px + (e.clientX - dragRef.current.sx),
      y: dragRef.current.py + (e.clientY - dragRef.current.sy),
    };
    setPos(clamp(next, drawnW, drawnH));
  };
  const onPointerUp = () => { dragRef.current = null; };

  const handleSave = () => {
    if (!imgRef.current || !nat) return;
    const scale = OUT / D;
    const canvas = document.createElement("canvas");
    canvas.width = OUT;
    canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUT, OUT);
    ctx.drawImage(imgRef.current, pos.x * scale, pos.y * scale, drawnW * scale, drawnH * scale);
    onSave(canvas.toDataURL("image/jpeg", 0.9), { zoom, x: pos.x, y: pos.y });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent className="sm:max-w-md" data-testid="photo-cropper-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <Move className="h-4 w-4" /> Fotoğrafı Kırp ve Konumlandır
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Fotoğrafı sürükleyerek konumlandırın ve kaydırıcıyla yakınlaştırın.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-2">
          <div
            className="relative touch-none select-none overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-300"
            style={{ width: D, height: D, cursor: "grab" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            data-testid="cropper-viewport"
          >
            {src && (
              <img
                ref={imgRef}
                src={src}
                alt="Kırpılacak fotoğraf"
                draggable={false}
                style={{ position: "absolute", left: pos.x, top: pos.y, width: drawnW, height: drawnH, maxWidth: "none" }}
              />
            )}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-inset ring-white/70" />
          </div>

          <div className="flex w-full items-center gap-3 px-2">
            <ZoomIn className="h-4 w-4 text-slate-500" />
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.01}
              onValueChange={onZoom}
              className="flex-1"
              data-testid="cropper-zoom-slider"
            />
          </div>
          <p className="text-[11px] text-slate-400">Sürükleyerek konumlandırın, kaydırıcıyla yakınlaştırın.</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="cropper-cancel-button" className="gap-1.5">
            <X className="h-4 w-4" /> İptal
          </Button>
          <Button type="button" onClick={handleSave} data-testid="cropper-save-button" className="gap-1.5 bg-blue-600 hover:bg-blue-500">
            <Check className="h-4 w-4" /> Uygula
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
