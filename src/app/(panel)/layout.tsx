"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useAppStore } from "@/lib/store";
import { I18nProvider } from "@/lib/i18n";
import { ToastProvider } from "@/components/Toast";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore();

  return (
    <I18nProvider>
      <ToastProvider>
        <div className="h-full flex">
          <Sidebar />
          <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-[72px]"}`}>
            <Header />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </ToastProvider>
    </I18nProvider>
  );
}
