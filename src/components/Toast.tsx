"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { FiCheck, FiX, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastMessage key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastMessage({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const config: Record<ToastType, { icon: React.ComponentType<{ className?: string }>; bg: string; border: string; text: string }> = {
    success: { icon: FiCheck, bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
    error: { icon: FiX, bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
    warning: { icon: FiAlertCircle, bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
    info: { icon: FiInfo, bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  };

  const c = config[toast.type];

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${c.bg} ${c.border} animate-slide-in min-w-[280px] max-w-[400px]`}>
      <c.icon className={`w-5 h-5 flex-shrink-0 ${c.text}`} />
      <p className={`text-sm font-medium ${c.text} flex-1`}>{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className={`p-0.5 rounded hover:bg-white/50 ${c.text}`}>
        <FiX className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
