# AIZEN Chat - Teknik Dokümantasyon

## Profesyonel CRM & İletişim Platformu

---

## 1. Proje Genel Bakış

AIZEN Chat, çok kanallı mesajlaşma, yapay zeka destekli müşteri hizmeti, sesli canlı destek ve CRM özelliklerini bir arada sunan profesyonel bir iletişim platformudur.

### Temel Özellikler
- **Çok Kanallı Mesajlaşma**: WhatsApp, Instagram, Telegram, Facebook, E-posta, SMS, Web Chat
- **Yapay Zeka Destekli Cevaplar**: Otomatik mesaj önerileri ve AI asistan
- **Sesli Canlı Destek**: WebRTC tabanlı sesli görüşme sistemi
- **Konuşan AI Modülü**: Sesli yapay zeka müşteri desteği (TTS/STT)
- **Çağrı Yönlendirme**: Farklı numaralara ve AI asistana otomatik yönlendirme
- **CRM Sistemi**: Müşteri yönetimi, etiketleme, filtreleme
- **Kampanya Yönetimi**: Broadcast, drip, tetikleyici kampanyalar
- **Randevu Sistemi**: Liste ve takvim görünümü
- **Sipariş & Kargo Takip**: Detaylı sipariş ve kargo durumu takibi
- **Admin Paneli**: Süper admin tüm şirketleri yönetme
- **Mobil Uygulama**: React Native / Expo (Android & iOS)

---

## 2. Teknoloji Altyapısı

### Frontend
| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| Next.js | 15.3.2 | React framework, SSR, API Routes |
| React | 19.x | UI library |
| TypeScript | 5.x | Tip güvenliği |
| Tailwind CSS | 4.x | Stil framework |
| Zustand | 5.x | State management |
| React Icons | 5.x | İkon kütüphanesi |
| date-fns | 4.x | Tarih formatları |

### Backend
| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| Next.js API Routes | 15.3.2 | REST API |
| Prisma ORM | 5.x | Veritabanı yönetimi |
| SQLite | - | Veritabanı (geliştirme) |
| NextAuth.js | 4.x | Kimlik doğrulama |
| bcryptjs | - | Şifre hashleme |

### Mobil
| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React Native | - | Mobil framework |
| Expo | - | Geliştirme araçları |

---

## 3. Kurulum Rehberi

### Ön Gereksinimler
- Node.js 18+ (önerilen: 22.x)
- npm 10+ veya yarn
- Git

### Adım 1: Projeyi Klonlama
```bash
git clone https://github.com/Caqlayano8/AIZEN-Chat.git
cd AIZEN-Chat
```

### Adım 2: Bağımlılıkları Yükleme
```bash
npm install
```

### Adım 3: Ortam Değişkenleri
`.env` dosyası oluşturun:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3001"
```

### Adım 4: Veritabanı Kurulumu
```bash
# Migration çalıştır
npx prisma migrate dev --name init

# Prisma Client oluştur
npx prisma generate

# Demo verilerle doldur
npx tsx prisma/seed.ts
```

### Adım 5: Uygulamayı Başlatma
```bash
npm run dev
```
Uygulama `http://localhost:3001` adresinde çalışacaktır.

### Demo Giriş Bilgileri
| Rol | E-posta | Şifre |
|-----|---------|-------|
| Admin | admin@aizenchat.com | demo123 |
| Agent | ayse@aizenchat.com | demo123 |
| Super Admin | superadmin@aizenchat.com | superadmin123 |

---

## 4. Veritabanı Şeması

### Model İlişkileri
```
Company (Şirket)
  ├── User (Kullanıcılar)
  ├── Contact (Kişiler)
  │   ├── Conversation (Görüşmeler)
  │   │   └── Message (Mesajlar)
  │   ├── Appointment (Randevular)
  │   ├── Order (Siparişler)
  │   └── VoiceCall (Sesli Aramalar)
  ├── Campaign (Kampanyalar)
  ├── Notification (Bildirimler)
  ├── ConnectedChannel (Bağlı Kanallar)
  ├── CallRoutingRule (Yönlendirme Kuralları)
  └── AIVoiceSettings (AI Ses Ayarları)
```

### Temel Modeller

#### User (Kullanıcı)
- `id`, `name`, `email`, `password` (hash), `role` (admin/agent/manager/superadmin), `companyId`

#### Company (Şirket)
- `id`, `name`, `email`, `phone`, `industry`, `plan` (starter/professional/enterprise), `isActive`

#### Contact (Kişi / Müşteri)
- `id`, `name`, `phone`, `email`, `source` (whatsapp/instagram/telegram...), `status` (active/lead/customer), `tags`

#### Conversation (Görüşme)
- `id`, `contactId`, `channel`, `status` (open/pending/resolved), `priority`, `assignedToId`

#### Message (Mesaj)
- `id`, `conversationId`, `content`, `type` (text/image/audio...), `sender` (agent/contact/ai/system), `aiSuggestion`

#### VoiceCall (Sesli Arama)
- `id`, `contactId`, `agentId`, `direction` (inbound/outbound), `status`, `duration`, `aiHandled`, `aiTranscript`, `forwardedTo`

#### CallRoutingRule (Yönlendirme Kuralı)
- `id`, `condition` (business_hours/after_hours/busy/no_answer), `action` (ring_agent/forward_number/ai_assistant/voicemail), `targetNumber`

#### AIVoiceSettings (AI Ses Ayarları)
- `id`, `companyId`, `isEnabled`, `voiceModel`, `language`, `greeting`, `personality`, `fallbackAction`, `maxCallDuration`

---

## 5. API Endpoints

### Kimlik Doğrulama
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/auth/register` | Yeni şirket ve kullanıcı kaydı |
| POST | `/api/auth/[...nextauth]` | NextAuth giriş/çıkış |

### Kişiler (Contacts)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/contacts?companyId=X&status=Y` | Kişileri listele |
| POST | `/api/contacts` | Yeni kişi oluştur |

### Görüşmeler (Conversations)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/conversations?companyId=X&channel=Y` | Görüşmeleri listele |
| POST | `/api/conversations` | Yeni görüşme oluştur |

### Mesajlar (Messages)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/messages?conversationId=X` | Mesajları getir |
| POST | `/api/messages` | Mesaj gönder (AI öneri dahil) |

### Kampanyalar (Campaigns)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/campaigns?companyId=X` | Kampanyaları listele |
| POST | `/api/campaigns` | Yeni kampanya oluştur |
| PUT | `/api/campaigns` | Kampanya güncelle |

### Randevular (Appointments)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/appointments?companyId=X` | Randevuları listele |
| POST | `/api/appointments` | Yeni randevu oluştur |
| PUT | `/api/appointments` | Randevu güncelle |

### Siparişler (Orders)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/orders?companyId=X` | Siparişleri listele |
| POST | `/api/orders` | Yeni sipariş oluştur |
| PUT | `/api/orders` | Sipariş güncelle |

### Sesli Destek (Voice)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/voice?companyId=X` | Aramaları listele |
| POST | `/api/voice` | Yeni arama başlat (routing otomatik) |
| PUT | `/api/voice` | Arama durumunu güncelle |

### Çağrı Yönlendirme (Call Routing)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/voice/routing?companyId=X` | Kuralları listele |
| POST | `/api/voice/routing` | Yeni kural oluştur |
| PUT | `/api/voice/routing` | Kural güncelle |
| DELETE | `/api/voice/routing?id=X` | Kural sil |

### AI Ses Ayarları
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/voice/ai-settings?companyId=X` | Ayarları getir |
| PUT | `/api/voice/ai-settings` | Ayarları güncelle |

### Dashboard
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/dashboard?companyId=X` | İstatistikleri getir |

### Şirketler (Admin)
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/companies` | Tüm şirketleri listele |
| GET | `/api/companies?id=X` | Şirket detayı |
| PUT | `/api/companies` | Şirket güncelle |

---

## 6. Sesli Canlı Destek Sistemi

### Mimari

```
Müşteri Araması
      │
      ▼
┌─────────────────┐
│  Yönlendirme    │──── Mesai Saatleri? ──► Temsilciye Yönlendir
│  Motoru         │──── Mesai Dışı? ──────► AI Asistan
│                 │──── Meşgul? ──────────► Farklı Numara
│                 │──── Cevapsız? ────────► Sesli Mesaj
└─────────────────┘
```

### WebRTC Entegrasyonu
Sesli canlı destek WebRTC (Web Real-Time Communication) teknolojisi üzerine kurulmuştur:

1. **Signaling Server**: WebSocket tabanlı sinyal sunucusu ile bağlantı kurulumu
2. **STUN/TURN**: NAT traversal için Google STUN sunucuları
3. **MediaStream**: getUserMedia API ile mikrofon erişimi
4. **RTCPeerConnection**: Peer-to-peer ses bağlantısı

### Nasıl Entegre Edilir?

#### WebRTC Sunucu Kurulumu (Production)
```bash
# Coturn TURN sunucusu kurulumu
sudo apt install coturn
sudo systemctl enable coturn

# /etc/turnserver.conf ayarları
listening-port=3478
tls-listening-port=5349
realm=aizenchat.com
server-name=aizenchat.com
fingerprint
lt-cred-mech
```

#### Twilio SIP Entegrasyonu (Telefon Numaraları)
```javascript
// Twilio ile telefon numarası bağlama
const twilio = require('twilio');
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// Gelen aramaları yönlendirme
app.post('/voice/incoming', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  
  // AI asistan aktifse
  if (aiEnabled) {
    twiml.connect().stream({ url: 'wss://your-server/ai-voice' });
  } else {
    twiml.dial('+905335550002'); // Temsilciye yönlendir
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
});
```

---

## 7. Konuşan Yapay Zeka Modülü

### Mimari

```
Müşteri Sesi ──► STT (Speech-to-Text) ──► NLP (Anlama) ──► Yanıt Üretme ──► TTS (Text-to-Speech) ──► Müşteriye Ses
                      │                       │                  │
                 Google/Whisper          GPT-4/Claude         OpenAI TTS
                      │                       │                  │
                 Metin çıktı           Bağlam analizi         Ses çıktı
```

### Bileşenler

#### 1. Konuşma Tanıma (STT - Speech-to-Text)
```javascript
// OpenAI Whisper API ile ses tanıma
const transcription = await openai.audio.transcriptions.create({
  file: audioBuffer,
  model: "whisper-1",
  language: "tr",
});
```

#### 2. Doğal Dil İşleme (NLP)
```javascript
// GPT-4 ile müşteri niyeti anlama
const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: `Sen ${company.name} şirketinin müşteri hizmetleri asistanısın. ${aiSettings.personality} bir tarzda konuş.` },
    { role: "user", content: transcription.text },
  ],
});
```

#### 3. Ses Sentezi (TTS - Text-to-Speech)
```javascript
// OpenAI TTS API ile ses üretme
const speech = await openai.audio.speech.create({
  model: "tts-1",
  voice: aiSettings.voiceModel, // nova, alloy, echo, etc.
  input: completion.choices[0].message.content,
  speed: 1.0,
});
```

### Entegrasyon Adımları

1. **OpenAI API Key Alın**: https://platform.openai.com/api-keys
2. `.env` dosyasına ekleyin:
```env
OPENAI_API_KEY="sk-your-api-key"
```
3. AI ses modülünü aktifleştirin (Ayarlar > AI Ses Ayarları)
4. Karşılama mesajını ve kişilik tipini ayarlayın
5. Geri dönüş aksiyonunu seçin (İnsan temsilciye aktar / Mesaj al / Sonlandır)

### Bilgi Tabanı Yapılandırma
AI asistanın şirkete özel bilgilerle cevap vermesi için:
```json
{
  "company_info": "AIZEN Chat, profesyonel CRM ve iletişim platformudur.",
  "products": ["Starter Paket - ₺499", "Professional Paket - ₺999", "Enterprise Paket - ₺4999"],
  "working_hours": "Pazartesi-Cuma, 09:00-18:00",
  "faq": {
    "kargo_suresi": "Siparişler 2-3 iş günü içinde teslim edilir.",
    "iade_politikasi": "14 gün içinde koşulsuz iade kabul edilir."
  }
}
```

---

## 8. Çağrı Yönlendirme Sistemi

### Kural Yapısı

Her yönlendirme kuralı şu bileşenlerden oluşur:

| Bileşen | Açıklama | Seçenekler |
|---------|----------|------------|
| Koşul | Kuralın ne zaman tetikleneceği | Mesai saatleri, Mesai dışı, Meşgul, Cevapsız, Her zaman |
| Aksiyon | Ne yapılacağı | Temsilciye yönlendir, Numaraya yönlendir, AI asistan, Sesli mesaj, Sıraya al |
| Öncelik | Hangi kuralın önce uygulanacağı | 1-100 (yüksek = önce) |
| Maks Bekleme | Maksimum bekleme süresi (saniye) | 15-120 |

### Örnek Yönlendirme Senaryoları

#### Senaryo 1: İş Saatleri (09:00-18:00)
```
Gelen Arama → Temsilciye Yönlendir (30sn bekle) → Cevap yoksa AI Asistan
```

#### Senaryo 2: Mesai Dışı
```
Gelen Arama → AI Asistan direkt devreye → Çözemezse mesaj al
```

#### Senaryo 3: Tüm Temsilciler Meşgul
```
Gelen Arama → Farklı numara (+90 533 555 0002) → Cevap yoksa sesli mesaj
```

### Birden Fazla Numara Yönlendirme
```javascript
// Sıralı yönlendirme
const forwardNumbers = [
  "+90 533 555 0001", // Ana hat
  "+90 534 555 0002", // Yedek hat
  "+90 535 555 0003", // Acil hat
];

for (const number of forwardNumbers) {
  const result = await tryForward(number, maxWaitTime);
  if (result.answered) break;
}
```

---

## 9. Admin Paneli (Süper Admin)

### Erişim
Süper admin olarak giriş yapın: `superadmin@aizenchat.com / superadmin123`

### Özellikler
1. **Genel Bakış**: Tüm şirketlerin özet istatistikleri, gelir dağılımı, plan dağılımı
2. **Şirket Yönetimi**: Şirket ekleme, düzenleme, askıya alma, silme
3. **Sistem Durumu**: Sunucu, veritabanı, WebSocket, AI motoru durumları
4. **Kaynak İzleme**: CPU, RAM, disk, bant genişliği kullanımı

---

## 10. Mobil Uygulama

### Kurulum
```bash
cd mobile
npm install
npx expo start
```

### Yapı
- `App.tsx` - Ana uygulama ve navigasyon
- `src/screens/DashboardScreen.tsx` - Dashboard
- `src/screens/ChatListScreen.tsx` - Mesajlar listesi
- `src/screens/ContactsScreen.tsx` - Kişiler
- `src/screens/SettingsScreen.tsx` - Ayarlar
- `src/lib/theme.ts` - Tema renkleri

---

## 11. Production Deployment

### Önerilen Altyapı

| Bileşen | Öneri |
|---------|-------|
| Hosting | Vercel / AWS / DigitalOcean |
| Veritabanı | PostgreSQL (Supabase / Neon) |
| Dosya Depolama | AWS S3 / Cloudflare R2 |
| WebSocket | Ably / Pusher / Socket.io Server |
| SMS/Arama | Twilio / Vonage |
| AI | OpenAI API (GPT-4 + Whisper + TTS) |
| CDN | Cloudflare |
| Monitoring | Sentry / Datadog |

### PostgreSQL'e Geçiş
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```bash
npx prisma migrate dev --name switch-to-postgres
```

### Ortam Değişkenleri (Production)
```env
DATABASE_URL="postgresql://user:password@host:5432/aizenchat"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://app.aizenchat.com"
OPENAI_API_KEY="sk-xxx"
TWILIO_ACCOUNT_SID="ACxxx"
TWILIO_AUTH_TOKEN="xxx"
TWILIO_PHONE_NUMBER="+905xxxxxxxxx"
```

---

## 12. Güvenlik

- Şifreler bcryptjs ile hashlenmiştir (12 round)
- JWT tabanlı oturum yönetimi (NextAuth)
- CSRF koruması (NextAuth dahili)
- Rate limiting önerilir (production)
- HTTPS zorunludur (production)
- Ortam değişkenleri `.env` dosyasında saklanır
- API endpoints yetki kontrolü gerektirir

---

## 13. Dosya Yapısı

```
AIZEN-Chat/
├── prisma/
│   ├── schema.prisma          # Veritabanı şeması
│   ├── seed.ts                # Demo veri oluşturma
│   └── migrations/            # Veritabanı migration'ları
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global stiller
│   │   ├── giris/page.tsx     # Giriş sayfası
│   │   ├── kayit/page.tsx     # Kayıt sayfası (2 adımlı)
│   │   ├── (panel)/
│   │   │   ├── layout.tsx     # Panel layout (sidebar + header)
│   │   │   ├── dashboard/     # Dashboard
│   │   │   ├── mesajlar/      # Mesajlaşma (WhatsApp tarzı)
│   │   │   ├── rehber/        # CRM / Kişiler
│   │   │   ├── kampanyalar/   # Kampanya yönetimi
│   │   │   ├── randevular/    # Randevu sistemi
│   │   │   ├── bildirimler/   # Bildirimler
│   │   │   ├── kargo/         # Sipariş & Kargo
│   │   │   ├── sesli-destek/  # Sesli canlı destek + AI
│   │   │   ├── ayarlar/       # Ayarlar (8 tab)
│   │   │   └── admin/         # Süper admin paneli
│   │   └── api/
│   │       ├── auth/          # Kimlik doğrulama
│   │       ├── contacts/      # Kişiler API
│   │       ├── conversations/ # Görüşmeler API
│   │       ├── messages/      # Mesajlar API
│   │       ├── campaigns/     # Kampanyalar API
│   │       ├── appointments/  # Randevular API
│   │       ├── orders/        # Siparişler API
│   │       ├── notifications/ # Bildirimler API
│   │       ├── voice/         # Sesli destek API
│   │       ├── companies/     # Şirketler API (admin)
│   │       ├── channels/      # Kanallar API
│   │       └── dashboard/     # Dashboard API
│   ├── components/
│   │   ├── Sidebar.tsx        # Yan menü
│   │   ├── Header.tsx         # Üst başlık
│   │   └── ChannelIcon.tsx    # Kanal ikonları
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── auth.ts            # NextAuth ayarları
│   │   ├── store.ts           # Zustand store
│   │   └── mock-data.ts       # Mock veriler
│   └── types/
│       └── index.ts           # TypeScript tipleri
├── mobile/                    # React Native mobil uygulama
├── docs/                      # Dokümantasyon
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 14. Geliştirme Notları

### Komutlar
```bash
npm run dev          # Geliştirme sunucusu (port 3001)
npm run build        # Production build
npm run start        # Production sunucu
npm run lint         # ESLint kontrolü
npx prisma studio    # Veritabanı görüntüleyici (GUI)
npx prisma migrate dev  # Migration çalıştır
npx tsx prisma/seed.ts  # Demo veri yükle
```

### Yeni Özellik Ekleme
1. Prisma şemasına model ekleyin
2. `npx prisma migrate dev --name feature-name`
3. API route oluşturun (`src/app/api/feature/route.ts`)
4. Frontend sayfası oluşturun (`src/app/(panel)/feature/page.tsx`)
5. Sidebar'a link ekleyin (`src/components/Sidebar.tsx`)

---

*Bu dokümantasyon AIZEN Chat v1.0 için hazırlanmıştır.*
*Tarih: Mayıs 2026*
