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
- **Şablon seçimi (4 tema: Modern, Klasik/serif, Minimal, Kompakt)** — önizleme ve PDF anında değişir; Klasik için Roboto Slab serif fontu (Türkçe destekli) kaydedildi.
- **Sürükle-bırak bölüm sıralaması** (yukarı/aşağı ok yedeği ile) — sıra hem editörde hem önizlemede hem PDF'te uygulanır.
- **İş İlanı Eşleştirme** — ilan metnini yapıştır, eşleşme skoru + eksik/eşleşen anahtar kelimeler; eksik kelimeye tıklayınca Becerilere eklenir (Türkçe stopword filtresi).
- Verified: testing agent iteration_1 (MVP) ve iteration_2 (3 yeni özellik) %100 frontend pass, sıfır JS hatası; sans+serif PDF Türkçe metin extract testi geçti.
