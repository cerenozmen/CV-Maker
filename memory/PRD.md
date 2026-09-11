# PRD — ATS Uyumlu CV Hazırlayıcı

## Original Problem Statement
ATS uyumlu, sade ve profesyonel CV oluşturan bir full-stack web uygulaması. Kullanıcı form üzerinden bilgilerini girer (kişisel bilgiler, deneyim, eğitim, yetenekler), canlı ön izleme ile düzenler ve tek tıkla PDF indirir. CV çıktısı tek sütunlu, temiz ve ATS sistemleri tarafından okunabilir. Format: Profesyonel Profil, Eğitim, İş Deneyimi, Beceriler, Diller, Projeler, Sertifikalar. Eğitim, İş Deneyimi, Projeler ve Sertifikalar için tarih alanları.

## User Choices
- Kayıt yok / tek oturum (auth yok)
- Tarayıcı tarafında anında PDF
- Sadece Türkçe arayüz
- Tasarım: modern & profesyonel (ajans belirledi)

## Architecture
- **Frontend-only** React app (CRA + Tailwind + shadcn/ui). No backend/DB usage.
- State in React, persisted to `localStorage` (`ats-cv-data-v1`).
- Live HTML preview (Arial/Helvetica, tek sütun, ATS dostu).
- PDF: client-side `@react-pdf/renderer`, Roboto (Türkçe glyph destekli, gstatic TTF), gerçek/metin tabanlı → ATS-parseable. One-click download via `pdf().toBlob()`.
- Backend: untouched template (unused).

## Implemented (2026-06)
- Split-screen builder: sol accordion editör, sağ canlı A4 önizleme + mobil sekme geçişi (Düzenle/Önizleme).
- Bölümler: Kişisel Bilgiler, Profesyonel Profil, Eğitim, İş Deneyimi, Beceriler, Diller, Projeler, Sertifikalar.
- Ekle/sil kayıt kartları; tarih alanları (type=month, TR ay formatı) + "Halen devam ediyor" seçeneği; madde (bullet) editörü.
- Beceriler etiket sistemi; diller seviye seçici.
- ATS uyum skoru (gerçek zamanlı 9 kontrol).
- Örnek Veri Yükle / Formu Temizle.
- Tek tıkla PDF indirme (Türkçe karakterler doğru, metin extract edilebilir).
- Verified: build OK, live preview updates, PDF renders valid Turkish text, testing agent 100% frontend pass.

## Backlog (P1/P2)
- P1: Birden fazla CV şablonu/tema seçimi.
- P1: Bölüm sıralamasını sürükle-bırak ile değiştirme.
- P2: JSON olarak dışa/içe aktarma.
- P2: İş ilanı anahtar kelime eşleştirme önerileri (AI).
