# Aizentr Mobile App

React Native / Expo ile geliştirilmiş Aizentr CRM mobil uygulaması.

## Kurulum

```bash
cd mobile
npm install
```

## Çalıştırma

```bash
# Geliştirme sunucusu
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios
```

## Özellikler

- **Dashboard**: Anlık istatistikler ve özet
- **Mesajlar**: Tüm kanallardan gelen mesajlar (WhatsApp, Instagram, Telegram vb.)
- **Rehber**: CRM müşteri yönetimi
- **Ayarlar**: Yapay zeka, bildirim ve hesap ayarları

## Derleme

```bash
# Android APK
eas build --platform android

# iOS IPA
eas build --platform ios
```

## Platform Desteği

- Android 6.0+
- iOS 13.0+
