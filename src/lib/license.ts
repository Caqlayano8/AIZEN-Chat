import crypto from "crypto";

const LICENSE_SECRET = process.env.LICENSE_SECRET || "AIZEN-CHAT-LICENSE-SECRET-2026";

export type LicensePlan = "starter" | "professional" | "enterprise";

export interface LicenseData {
  companyId: string;
  companyName: string;
  plan: LicensePlan;
  maxUsers: number;
  maxContacts: number;
  maxChannels: number;
  features: string[];
  issuedAt: string;
  expiresAt: string;
}

export interface LicensePayload extends LicenseData {
  key: string;
  signature: string;
  isValid: boolean;
}

const planLimits: Record<LicensePlan, { maxUsers: number; maxContacts: number; maxChannels: number; features: string[] }> = {
  starter: {
    maxUsers: 3,
    maxContacts: 500,
    maxChannels: 2,
    features: ["messaging", "contacts", "notifications"],
  },
  professional: {
    maxUsers: 15,
    maxContacts: 5000,
    maxChannels: 5,
    features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions"],
  },
  enterprise: {
    maxUsers: 100,
    maxContacts: 50000,
    maxChannels: 10,
    features: ["messaging", "contacts", "notifications", "campaigns", "appointments", "orders", "voice_support", "ai_suggestions", "ai_voice", "call_routing", "api_access", "white_label", "priority_support"],
  },
};

function generateKey(plan: LicensePlan): string {
  const prefix = plan === "enterprise" ? "ENT" : plan === "professional" ? "PRO" : "STR";
  const segments: string[] = [prefix];
  for (let i = 0; i < 4; i++) {
    segments.push(crypto.randomBytes(2).toString("hex").toUpperCase());
  }
  return segments.join("-");
}

function createSignature(data: LicenseData, key: string): string {
  const payload = JSON.stringify({ ...data, key });
  return crypto.createHmac("sha256", LICENSE_SECRET).update(payload).digest("hex");
}

export function generateLicense(companyId: string, companyName: string, plan: LicensePlan, durationMonths: number = 12): LicensePayload {
  const limits = planLimits[plan];
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

  const data: LicenseData = {
    companyId,
    companyName,
    plan,
    maxUsers: limits.maxUsers,
    maxContacts: limits.maxContacts,
    maxChannels: limits.maxChannels,
    features: limits.features,
    issuedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  const key = generateKey(plan);
  const signature = createSignature(data, key);

  return {
    ...data,
    key,
    signature,
    isValid: true,
  };
}

export function validateLicense(key: string, signature: string, data: LicenseData): { valid: boolean; reason?: string } {
  const expectedSignature = createSignature(data, key);
  if (signature !== expectedSignature) {
    return { valid: false, reason: "Geçersiz lisans imzası" };
  }

  const now = new Date();
  const expiresAt = new Date(data.expiresAt);
  if (now > expiresAt) {
    return { valid: false, reason: "Lisans süresi dolmuş" };
  }

  return { valid: true };
}

export function decodeLicenseKey(key: string): { plan: LicensePlan; valid: boolean } {
  const prefix = key.split("-")[0];
  const plans: Record<string, LicensePlan> = { ENT: "enterprise", PRO: "professional", STR: "starter" };
  const plan = plans[prefix];
  if (!plan) return { plan: "starter", valid: false };
  return { plan, valid: true };
}

export { planLimits };
