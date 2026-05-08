"use client";

import { useState } from "react";
import Link from "next/link";
import { FiZap, FiUser, FiMail, FiLock, FiPhone, FiBriefcase, FiCheck } from "react-icons/fi";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex">
      {/* Left - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-8">
            <FiZap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Şirketinizi Kaydedin</h2>
          <p className="text-purple-100 mb-8">14 gün ücretsiz deneme ile tüm özellikleri keşfedin.</p>
          <div className="space-y-4">
            {[
              "Tüm sosyal medya kanallarını entegre edin",
              "Yapay zeka ile otomatik müşteri hizmeti",
              "Kampanya ve toplu mesaj gönderimi",
              "Randevu ve sipariş takip sistemi",
              "Detaylı analitik ve raporlama",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm text-purple-100">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Aizentr
            </span>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-0 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-400"
                }`}>{s}</div>
                {s < 2 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? "bg-purple-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Kişisel Bilgiler</h1>
              <p className="text-gray-500 mb-6">Hesabınızı oluşturmak için bilgilerinizi girin</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-1.5 block">Ad</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Adınız" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-1.5 block">Soyad</label>
                    <input type="text" placeholder="Soyadınız" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">E-posta</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" placeholder="ornek@sirket.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Telefon</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="+90 5XX XXX XXXX" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Şifre</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="password" placeholder="En az 8 karakter" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Devam Et
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Şirket Bilgileri</h1>
              <p className="text-gray-500 mb-6">Şirketinizi kaydedin ve hemen başlayın</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Şirket Adı</label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Şirket adınız" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-1.5 block">Sektör</label>
                    <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                      <option>Teknoloji</option>
                      <option>E-Ticaret</option>
                      <option>Sağlık</option>
                      <option>Eğitim</option>
                      <option>Gayrimenkul</option>
                      <option>Finans</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-1.5 block">Şirket Büyüklüğü</label>
                    <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                      <option>1-10 Çalışan</option>
                      <option>11-50 Çalışan</option>
                      <option>51-200 Çalışan</option>
                      <option>200+ Çalışan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Şirket Web Sitesi</label>
                  <input type="url" placeholder="https://sirket.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">WhatsApp Numaranız</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="+90 5XX XXX XXXX" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20" />
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" />
                  <span className="text-xs text-gray-500">
                    <a href="#" className="text-purple-600">Kullanım Şartları</a> ve{" "}
                    <a href="#" className="text-purple-600">Gizlilik Politikası</a>&apos;nı kabul ediyorum
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50"
                  >
                    Geri
                  </button>
                  <Link
                    href="/dashboard"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all text-center"
                  >
                    Kaydı Tamamla
                  </Link>
                </div>
              </div>
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-purple-600 hover:text-purple-700 font-medium">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
