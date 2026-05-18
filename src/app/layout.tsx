import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Aizentr - Akıllı CRM & İletişim Platformu",
  description:
    "Tüm sosyal medya kanallarınızı tek panelden yönetin. Yapay zeka destekli müşteri ilişkileri yönetimi, kampanya, randevu ve kargo takip sistemi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="h-full">
      <body className="h-full bg-[#f8fafc] antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
