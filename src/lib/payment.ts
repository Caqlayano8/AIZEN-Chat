/**
 * Payment Integration Service
 * Supports Stripe and iyzico for subscription management
 */

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
  features: string[];
}

export const PLANS: PaymentPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    currency: "TRY",
    interval: "monthly",
    features: ["3 Kullanıcı", "500 Kişi", "2 Kanal", "Temel AI", "E-posta Destek"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 2999,
    currency: "TRY",
    interval: "monthly",
    features: ["15 Kullanıcı", "5.000 Kişi", "5 Kanal", "Gelişmiş AI", "Sesli Destek", "7/24 Destek"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9999,
    currency: "TRY",
    interval: "monthly",
    features: ["100 Kullanıcı", "50.000 Kişi", "Sınırsız Kanal", "Özel AI Model", "Özel Entegrasyon", "Dedike Destek"],
  },
];

// Stripe Integration
export const stripeService = {
  async createCheckoutSession(planId: string, customerEmail: string) {
    const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET) return { url: null, error: "Stripe yapılandırılmamış" };

    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return { url: null, error: "Plan bulunamadı" };

    try {
      const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${STRIPE_SECRET}`,
        },
        body: new URLSearchParams({
          "mode": "subscription",
          "customer_email": customerEmail,
          "line_items[0][price_data][currency]": plan.currency.toLowerCase(),
          "line_items[0][price_data][product_data][name]": `AIZEN Chat ${plan.name}`,
          "line_items[0][price_data][unit_amount]": (plan.price * 100).toString(),
          "line_items[0][price_data][recurring][interval]": "month",
          "line_items[0][quantity]": "1",
          "success_url": `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
          "cancel_url": `${process.env.NEXTAUTH_URL}/ayarlar?tab=billing`,
        }),
      });

      const data = await res.json();
      return { url: data.url, error: null };
    } catch (error) {
      console.error("Stripe session error:", error);
      return { url: null, error: "Ödeme oturumu oluşturulamadı" };
    }
  },

  async cancelSubscription(subscriptionId: string) {
    const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET) return { success: false, error: "Stripe yapılandırılmamış" };

    try {
      await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${STRIPE_SECRET}` },
      });
      return { success: true, error: null };
    } catch {
      return { success: false, error: "Abonelik iptal edilemedi" };
    }
  },
};

// iyzico Integration
export const iyzicoService = {
  async createPayment(planId: string, buyer: Record<string, string>) {
    const API_KEY = process.env.IYZICO_API_KEY;
    const SECRET_KEY = process.env.IYZICO_SECRET_KEY;
    if (!API_KEY || !SECRET_KEY) return { url: null, error: "iyzico yapılandırılmamış" };

    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return { url: null, error: "Plan bulunamadı" };

    try {
      const res = await fetch("https://api.iyzipay.com/payment/iyzipos/checkoutform/initialize/auth/ecom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
        },
        body: JSON.stringify({
          locale: "tr",
          price: plan.price.toString(),
          paidPrice: plan.price.toString(),
          currency: "TRY",
          basketId: `AIZEN-${planId}-${Date.now()}`,
          paymentGroup: "SUBSCRIPTION",
          buyer: {
            id: buyer.id,
            name: buyer.name,
            surname: buyer.surname,
            email: buyer.email,
            gsmNumber: buyer.phone,
            identityNumber: "00000000000",
            registrationAddress: buyer.address || "İstanbul",
            city: "İstanbul",
            country: "Türkiye",
          },
          basketItems: [
            {
              id: planId,
              name: `AIZEN Chat ${plan.name}`,
              category1: "Yazılım",
              itemType: "VIRTUAL",
              price: plan.price.toString(),
            },
          ],
          callbackUrl: `${process.env.NEXTAUTH_URL}/api/payment/iyzico/callback`,
        }),
      });

      const data = await res.json();
      return { url: data.paymentPageUrl || null, error: data.errorMessage || null };
    } catch {
      return { url: null, error: "iyzico ödeme oluşturulamadı" };
    }
  },
};
