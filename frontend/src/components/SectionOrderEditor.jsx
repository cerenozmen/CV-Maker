import { useState } from "react";
import { SECTION_META } from "../lib/sections";
import { GripVertical, ArrowUp, ArrowDown, Rows3 } from "lucide-react";

const move = (arr, from, to) => {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const SectionOrderEditor = ({ order, onChange }) => {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDrop = (i) => {
    if (dragIndex === null || dragIndex === i) return;
    onChange(move(order, dragIndex, i));
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div data-testid="section-order-editor" className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Rows3 className="h-4 w-4 text-slate-500" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Bölüm Sıralaması</span>
      </div>
      <p className="mb-2 text-[11px] text-slate-400">Sürükleyerek ya da oklarla bölümlerin sırasını değiştirin.</p>
      <ul className="flex flex-col gap-1.5">
        {order.map((id, i) => {
          const meta = SECTION_META[id];
          if (!meta) return null;
          const Icon = meta.icon;
          return (
            <li
              key={id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
              data-testid={`section-order-item-${id}`}
              className={`flex items-center gap-2 rounded-lg border bg-slate-50/70 px-2.5 py-2 transition-colors ${overIndex === i && dragIndex !== null ? "border-blue-400 bg-blue-50" : "border-slate-200"} ${dragIndex === i ? "opacity-50" : ""}`}
            >
              <GripVertical className="h-4 w-4 cursor-grab text-slate-400" />
              <Icon className="h-4 w-4 text-slate-500" />
              <span className="flex-1 text-[13px] font-medium text-slate-700">{meta.label}</span>
              <button
                type="button"
                onClick={() => onChange(move(order, i, i - 1))}
                disabled={i === 0}
                data-testid={`section-up-${id}`}
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                aria-label="Yukarı taşı"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onChange(move(order, i, i + 1))}
                disabled={i === order.length - 1}
                data-testid={`section-down-${id}`}
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                aria-label="Aşağı taşı"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
