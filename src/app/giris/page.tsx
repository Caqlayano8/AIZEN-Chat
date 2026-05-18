"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiZap, FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("E-posta veya şifre hatalı");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Bir hata oluştu, tekrar deneyin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Aizentr
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h1>
          <p className="text-gray-500 mb-8">Hesabınıza giriş yapın</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 font-medium mb-1.5 block">E-posta</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sirket.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-gray-600 font-medium">Şifre</label>
                <a href="#" className="text-xs text-purple-600 hover:text-purple-700">Şifremi Unuttum</a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all text-center disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="w-4 h-4 animate-spin" /> Giriş yapılıyor...
                </span>
              ) : "Giriş Yap"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">Demo hesaplar</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setEmail("admin@aizenchat.com"); setPassword("demo123"); }}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => { setEmail("ayse@aizenchat.com"); setPassword("demo123"); }}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Agent Demo
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Hesabınız yok mu?{" "}
              <Link href="/kayit" className="text-purple-600 hover:text-purple-700 font-medium">
                Ücretsiz Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <FiZap className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Tüm Kanallarınız Tek Panelde</h2>
          <p className="text-purple-100 text-lg">
            WhatsApp, Instagram, Telegram ve daha fazlası. Yapay zeka destekli CRM ile müşterilerinizi daha iyi yönetin.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-purple-200">Şirket</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">50M+</div>
              <div className="text-sm text-purple-200">Mesaj</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">%94</div>
              <div className="text-sm text-purple-200">Memnuniyet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
