"use client";

import Link from "next/link";
import {
  FiZap,
  FiMessageSquare,
  FiUsers,
  FiSend,
  FiCalendar,
  FiPackage,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiArrowRight,
  FiCheck,
  FiPlay,
  FiStar,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaTelegram, FaFacebook } from "react-icons/fa";

const features = [
  {
    icon: FiMessageSquare,
    title: "Çok Kanallı Mesajlaşma",
    desc: "WhatsApp, Instagram, Telegram, Facebook, E-posta ve SMS - tüm kanallar tek panelde",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: FiUsers,
    title: "Akıllı CRM",
    desc: "Müşteri ilişkilerinizi yapay zeka destekli araçlarla profesyonelce yönetin",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FiZap,
    title: "Yapay Zeka Asistan",
    desc: "7/24 otomatik cevaplar, akıllı yönlendirme ve müşteri analizi",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: FiSend,
    title: "Kampanya Yönetimi",
    desc: "Toplu mesaj, drip kampanyalar ve otomatik tetikleyiciler ile satışlarınızı artırın",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: FiCalendar,
    title: "Randevu Sistemi",
    desc: "Online randevu planlama, hatırlatma ve takip sistemi",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: FiPackage,
    title: "Sipariş & Kargo Takip",
    desc: "Siparişlerinizi ve kargo süreçlerinizi tek panelden takip edin",
    color: "from-teal-500 to-cyan-600",
  },
];

const plans = [
  {
    name: "Başlangıç",
    price: "499",
    features: ["2 Kanal Entegrasyonu", "500 Kişi", "1 Kullanıcı", "Temel AI Cevaplar", "E-posta Destek"],
    popular: false,
  },
  {
    name: "Profesyonel",
    price: "1.499",
    features: [
      "5 Kanal Entegrasyonu",
      "5.000 Kişi",
      "5 Kullanıcı",
      "Gelişmiş AI",
      "Kampanya Sistemi",
      "Randevu Yönetimi",
      "Öncelikli Destek",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "4.999",
    features: [
      "Sınırsız Kanal",
      "Sınırsız Kişi",
      "Sınırsız Kullanıcı",
      "Özel AI Eğitimi",
      "API Erişimi",
      "Kargo Takip",
      "Özel Entegrasyonlar",
      "7/24 Destek",
    ],
    popular: false,
  },
];

const stats = [
  { value: "10K+", label: "Aktif Şirket" },
  { value: "50M+", label: "Mesaj / Ay" },
  { value: "%94", label: "Müşteri Memnuniyeti" },
  { value: "2.4 sn", label: "Ort. Yanıt Süresi" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Aizentr
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Özellikler</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Fiyatlar</a>
            <a href="#channels" className="text-sm text-gray-600 hover:text-gray-900">Kanallar</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/giris" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Ücretsiz Dene
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <FiZap className="w-4 h-4" />
            Yapay Zeka Destekli CRM Platformu
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Tüm Kanallarınızı
            <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Tek Panelden Yönetin
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            WhatsApp, Instagram, Telegram ve daha fazlası. Müşterilerinizle tüm kanallardan iletişim kurun,
            yapay zeka ile otomatik cevaplar verin, satışlarınızı artırın.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Link
              href="/kayit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              Ücretsiz Başla <FiArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-6 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all">
              <FiPlay className="w-5 h-5" /> Demo İzle
            </button>
          </div>

          {/* Channel Icons */}
          <div className="flex items-center justify-center gap-6 mb-12" id="channels">
            {[
              { icon: FaWhatsapp, color: "text-green-500", bg: "bg-green-50" },
              { icon: FaInstagram, color: "text-pink-500", bg: "bg-pink-50" },
              { icon: FaTelegram, color: "text-blue-500", bg: "bg-blue-50" },
              { icon: FaFacebook, color: "text-blue-600", bg: "bg-blue-50" },
            ].map((ch, i) => (
              <div key={i} className={`w-14 h-14 ${ch.bg} rounded-2xl flex items-center justify-center shadow-sm`}>
                <ch.icon className={`w-7 h-7 ${ch.color}`} />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">İşletmeniz İçin Her Şey Bir Arada</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kommo benzeri profesyonel CRM araçları ile müşteri ilişkilerinizi üst seviyeye taşıyın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Neden <span className="text-purple-600">Aizentr</span>?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: FiShield, text: "Kurumsal düzeyde güvenlik ve veri koruma" },
                  { icon: FiTrendingUp, text: "Satışlarınızı %40'a kadar artırın" },
                  { icon: FiGlobe, text: "7/24 yapay zeka destekli müşteri hizmeti" },
                  { icon: FiUsers, text: "Sınırsız ekip üyesi ve departman yönetimi" },
                  { icon: FiZap, text: "Dakikalar içinde kurulum ve entegrasyon" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-gray-700 font-medium pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Şirketinizi Hemen Kaydedin</h3>
              <p className="text-purple-100 mb-6">14 gün ücretsiz deneme. Kredi kartı gerekmez.</p>
              <div className="space-y-3 mb-6">
                {["WhatsApp Business API entegrasyonu", "Otomatik müşteri karşılama", "Yapay zeka chatbot", "Kampanya gönderimi"].map(
                  (t) => (
                    <div key={t} className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-green-400" />
                      <span className="text-sm">{t}</span>
                    </div>
                  )
                )}
              </div>
              <Link
                href="/kayit"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Hemen Başla <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
            <p className="text-lg text-gray-600">İşletmenize uygun planı seçin, hemen başlayın</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 border-2 transition-all ${
                  plan.popular ? "border-purple-500 shadow-xl shadow-purple-500/10 scale-105" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="flex items-center gap-1 text-purple-600 text-xs font-bold mb-4">
                    <FiStar className="w-4 h-4" /> EN POPÜLER
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm"> TL / ay</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kayit"
                  className={`block text-center py-3 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Başla
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <FiZap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Aizentr</span>
              </div>
              <p className="text-gray-400 text-sm">
                Yapay zeka destekli CRM ve iletişim platformu. Tüm kanallarınızı tek panelden yönetin.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white">Özellikler</a></li>
                <li><a href="#pricing" className="hover:text-white">Fiyatlar</a></li>
                <li><a href="#channels" className="hover:text-white">Entegrasyonlar</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Kariyer</a></li>
                <li><a href="#" className="hover:text-white">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Yardım Merkezi</a></li>
                <li><a href="#" className="hover:text-white">Dokümantasyon</a></li>
                <li><a href="#" className="hover:text-white">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-white">Kullanım Şartları</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            &copy; 2024 Aizentr. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
