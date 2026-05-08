# Aizentr - Akıllı CRM & İletişim Platformu

Kommo benzeri, yapay zeka destekli profesyonel CRM ve çok kanallı iletişim platformu.

## Özellikler

### Çok Kanallı Mesajlaşma
- WhatsApp Business API entegrasyonu
- Instagram DM yönetimi
- Telegram Bot desteği
- Facebook Messenger
- E-posta ve SMS
- Web Chat widget

### Yapay Zeka Desteği
- Otomatik müşteri karşılama ve cevaplama
- Akıllı mesaj yönlendirme
- Duygu analizi
- AI destekli kampanya metni oluşturma

### CRM & Müşteri Yönetimi
- Detaylı müşteri profilleri ve etiketleme
- Lead takibi ve pipeline yönetimi
- Toplu içe/dışa aktarma
- Müşteri segmentasyonu

### Kampanya Yönetimi
- Toplu mesaj gönderimi (Broadcast)
- Drip kampanyalar
- Otomatik tetikleyiciler
- Performans raporları

### Randevu Sistemi
- Online randevu planlama
- Otomatik hatırlatmalar
- Takvim görünümü
- Müşteri onay sistemi

### Sipariş & Kargo Takip
- Sipariş yönetimi
- Kargo durumu takibi
- Otomatik müşteri bildirimleri
- Gelir raporları

### Yönetim Panelleri
- **Admin Panel**: Tüm şirketleri yönetme, sistem ayarları
- **Şirket Paneli**: Her şirketin kendi CRM paneli

## Teknoloji Stack

### Web Platformu
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Icons**: React Icons

### Mobil Uygulama
- **Framework**: React Native / Expo
- **Navigation**: React Navigation
- **Platform**: Android & iOS

## Kurulum

### Web
```bash
cd Aizentr
npm install
npm run dev
```

### Mobil
```bash
cd Aizentr/mobile
npm install
npx expo start
```

## Yapı

```
Aizentr/
├── src/
│   ├── app/
│   │   ├── (panel)/          # Yönetim paneli sayfaları
│   │   │   ├── dashboard/    # Ana panel
│   │   │   ├── mesajlar/     # Mesajlaşma (WhatsApp tarzı)
│   │   │   ├── rehber/       # CRM / Kişi yönetimi
│   │   │   ├── kampanyalar/  # Kampanya yönetimi
│   │   │   ├── randevular/   # Randevu sistemi
│   │   │   ├── bildirimler/  # Bildirimler
│   │   │   ├── kargo/        # Sipariş & kargo takip
│   │   │   └── ayarlar/      # Şirket & sistem ayarları
│   │   ├── giris/            # Giriş sayfası
│   │   ├── kayit/            # Kayıt sayfası (şirket kayıt)
│   │   └── page.tsx          # Landing page
│   ├── components/           # Paylaşılan bileşenler
│   ├── lib/                  # Yardımcı fonksiyonlar ve store
│   └── types/                # TypeScript tip tanımları
├── mobile/                   # React Native mobil uygulama
│   ├── src/
│   │   ├── screens/          # Ekranlar
│   │   ├── components/       # Bileşenler
│   │   └── lib/              # Yardımcı
│   ├── App.tsx               # Ana uygulama
│   └── app.json              # Expo yapılandırması
└── README.md
```

## Lisans

Tüm hakları saklıdır.
