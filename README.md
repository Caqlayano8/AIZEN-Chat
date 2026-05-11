# AIZEN Chat

**Yapay Zeka Destekli Profesyonel CRM & İletişim Platformu**

AIZEN Chat, WhatsApp tarzı arayüzle tüm sosyal medya kanallarını tek panelden yönetmenizi sağlayan, yapay zeka destekli profesyonel bir CRM platformudur.

## Özellikler

### Mesajlaşma & İletişim
- **Çok Kanallı Mesajlaşma** — WhatsApp, Instagram, Telegram, Facebook, E-posta, SMS, Web Chat
- **Yapay Zeka Destekli Cevaplar** — Otomatik mesaj önerileri
- **Gerçek Zamanlı Bildirimler**

### Sesli Destek & AI
- **Sesli Canlı Destek** — WebRTC tabanlı sesli görüşme
- **Konuşan AI Modülü** — Sesli yapay zeka müşteri desteği (STT + NLP + TTS)
- **Çağrı Yönlendirme** — Mesai saatleri, meşgul, cevapsız durumlarına göre otomatik yönlendirme
- **Farklı Numaralara Yönlendirme** — Sıralı ve koşullu numara yönlendirme

### CRM & Yönetim
- **Müşteri Yönetimi** — Profiller, etiketleme, filtreleme, toplu işlemler
- **Kampanya Yönetimi** — Broadcast, drip, tetikleyici kampanyalar
- **Randevu Sistemi** — Liste ve takvim görünümü
- **Sipariş & Kargo Takip** — Detaylı sipariş ve kargo durumu
- **Süper Admin Paneli** — Tüm şirketleri yönetme

### Mobil
- **Android & iOS** — React Native / Expo ile mobil uygulama

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| State | Zustand |
| Backend | Next.js API Routes, Prisma ORM, SQLite |
| Auth | NextAuth.js (JWT) |
| Mobil | React Native, Expo |
| AI | OpenAI API (GPT-4, Whisper, TTS) |

## Kurulum

```bash
# Klonla
git clone https://github.com/Caqlayano8/AIZEN-Chat.git
cd AIZEN-Chat

# Bağımlılıkları yükle
npm install

# Veritabanı kurulumu
npx prisma migrate dev --name init
npx prisma generate
npx tsx prisma/seed.ts

# Çalıştır
npm run dev
```

Uygulama: http://localhost:3001

## Demo Giriş

| Rol | E-posta | Şifre |
|-----|---------|-------|
| Admin | admin@aizenchat.com | demo123 |
| Agent | ayse@aizenchat.com | demo123 |
| Super Admin | superadmin@aizenchat.com | superadmin123 |

## Sayfalar

| Sayfa | Yol | Açıklama |
|-------|-----|----------|
| Landing | `/` | Ürün tanıtım, fiyatlandırma |
| Giriş | `/giris` | Kullanıcı girişi |
| Kayıt | `/kayit` | 2 adımlı şirket kaydı |
| Dashboard | `/dashboard` | İstatistikler, grafikler |
| Mesajlar | `/mesajlar` | WhatsApp tarzı mesajlaşma |
| Rehber | `/rehber` | CRM / Müşteri yönetimi |
| Kampanyalar | `/kampanyalar` | Kampanya yönetimi |
| Randevular | `/randevular` | Randevu sistemi |
| Bildirimler | `/bildirimler` | Bildirimler |
| Sipariş/Kargo | `/kargo` | Sipariş & kargo takip |
| Sesli Destek | `/sesli-destek` | Sesli canlı destek + AI |
| Ayarlar | `/ayarlar` | 8 tab ayarlar |
| Admin | `/admin` | Süper admin paneli |

## API Endpoints

- `POST /api/auth/register` — Kayıt
- `GET/POST /api/contacts` — Kişiler
- `GET/POST /api/conversations` — Görüşmeler
- `GET/POST /api/messages` — Mesajlar
- `GET/POST/PUT /api/campaigns` — Kampanyalar
- `GET/POST/PUT /api/appointments` — Randevular
- `GET/POST/PUT /api/orders` — Siparişler
- `GET/POST/PUT /api/voice` — Sesli aramalar
- `GET/POST/PUT/DELETE /api/voice/routing` — Çağrı yönlendirme
- `GET/PUT /api/voice/ai-settings` — AI ses ayarları
- `GET /api/dashboard` — Dashboard istatistikleri
- `GET/PUT /api/companies` — Şirket yönetimi (admin)

## Dokümantasyon

Detaylı teknik dokümantasyon: [`docs/AIZEN-Chat-Teknik-Dokumantasyon.md`](docs/AIZEN-Chat-Teknik-Dokumantasyon.md)

## Lisans

MIT
