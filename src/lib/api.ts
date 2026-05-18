"use client";

const BASE = "";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "API hatası");
  }
  return res.json();
}

export const api = {
  // Dashboard
  getDashboard: (companyId: string) =>
    fetcher<Record<string, unknown>>(`/api/dashboard?companyId=${companyId}`),

  // Contacts
  getContacts: (companyId: string, params?: Record<string, string>) => {
    const q = new URLSearchParams({ companyId, ...params }).toString();
    return fetcher<unknown[]>(`/api/contacts?${q}`);
  },
  createContact: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/contacts", { method: "POST", body: JSON.stringify(data) }),

  // Conversations
  getConversations: (companyId: string, channel?: string) => {
    const q = new URLSearchParams({ companyId, ...(channel ? { channel } : {}) }).toString();
    return fetcher<unknown[]>(`/api/conversations?${q}`);
  },

  // Messages
  getMessages: (conversationId: string) =>
    fetcher<unknown[]>(`/api/messages?conversationId=${conversationId}`),
  sendMessage: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/messages", { method: "POST", body: JSON.stringify(data) }),

  // Campaigns
  getCampaigns: (companyId: string) =>
    fetcher<unknown[]>(`/api/campaigns?companyId=${companyId}`),
  createCampaign: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/campaigns", { method: "POST", body: JSON.stringify(data) }),

  // Appointments
  getAppointments: (companyId: string) =>
    fetcher<unknown[]>(`/api/appointments?companyId=${companyId}`),
  createAppointment: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/appointments", { method: "POST", body: JSON.stringify(data) }),

  // Orders
  getOrders: (companyId: string) =>
    fetcher<unknown[]>(`/api/orders?companyId=${companyId}`),

  // Notifications
  getNotifications: (companyId: string) =>
    fetcher<unknown[]>(`/api/notifications?companyId=${companyId}`),

  // Channels
  getChannels: (companyId: string) =>
    fetcher<unknown[]>(`/api/channels?companyId=${companyId}`),

  // Voice
  getVoiceCalls: (companyId: string) =>
    fetcher<unknown[]>(`/api/voice?companyId=${companyId}`),
  getRoutingRules: (companyId: string) =>
    fetcher<unknown[]>(`/api/voice/routing?companyId=${companyId}`),
  getAiVoiceSettings: (companyId: string) =>
    fetcher<unknown>(`/api/voice/ai-settings?companyId=${companyId}`),

  // Auth
  register: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),

  // License
  validateLicense: (key: string) =>
    fetcher<unknown>(`/api/license?key=${key}`),
  createLicense: (data: Record<string, unknown>) =>
    fetcher<unknown>("/api/license", { method: "POST", body: JSON.stringify(data) }),

  // AI
  getAiResponse: (message: string, context?: string) =>
    fetcher<{ reply: string; suggestions: string[] }>("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message, context }),
    }),

  // Companies
  getCompanies: () => fetcher<unknown[]>("/api/companies"),
};
