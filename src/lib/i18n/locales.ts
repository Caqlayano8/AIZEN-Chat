export type Locale = "tr" | "en" | "de" | "fr" | "ar" | "es";

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  ar: "العربية",
  es: "Español",
};

export const localeFlags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  ar: "🇸🇦",
  es: "🇪🇸",
};

export type TranslationKeys = {
  // Common
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  filter: string;
  all: string;
  active: string;
  inactive: string;
  status: string;
  actions: string;
  close: string;
  confirm: string;
  back: string;
  next: string;
  loading: string;
  noData: string;
  success: string;
  error: string;

  // Navigation
  nav_dashboard: string;
  nav_messages: string;
  nav_contacts: string;
  nav_campaigns: string;
  nav_appointments: string;
  nav_notifications: string;
  nav_orders: string;
  nav_voiceSupport: string;
  nav_settings: string;
  nav_admin: string;

  // Dashboard
  dash_title: string;
  dash_totalConversations: string;
  dash_activeConversations: string;
  dash_resolvedToday: string;
  dash_avgResponseTime: string;
  dash_totalContacts: string;
  dash_newContactsToday: string;
  dash_pendingAppointments: string;
  dash_activeCampaigns: string;
  dash_totalOrders: string;
  dash_revenue: string;
  dash_aiResponseRate: string;
  dash_customerSatisfaction: string;
  dash_recentActivity: string;

  // Messages
  msg_title: string;
  msg_allChannels: string;
  msg_typeMessage: string;
  msg_send: string;
  msg_aiSuggestions: string;
  msg_useSuggestion: string;

  // Contacts
  contact_title: string;
  contact_addNew: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_company: string;
  contact_tags: string;
  contact_source: string;
  contact_customer: string;
  contact_lead: string;

  // Campaigns
  camp_title: string;
  camp_createNew: string;
  camp_broadcast: string;
  camp_drip: string;
  camp_triggered: string;
  camp_sent: string;
  camp_delivered: string;
  camp_read: string;
  camp_responses: string;

  // Appointments
  appt_title: string;
  appt_createNew: string;
  appt_date: string;
  appt_time: string;
  appt_duration: string;
  appt_scheduled: string;
  appt_confirmed: string;
  appt_completed: string;
  appt_cancelled: string;
  appt_listView: string;
  appt_calendarView: string;

  // Orders
  order_title: string;
  order_number: string;
  order_total: string;
  order_tracking: string;
  order_pending: string;
  order_processing: string;
  order_shipped: string;
  order_delivered: string;

  // Voice Support
  voice_title: string;
  voice_callHistory: string;
  voice_liveSupport: string;
  voice_routing: string;
  voice_aiSettings: string;
  voice_newCall: string;
  voice_totalCalls: string;
  voice_aiAnswered: string;
  voice_missed: string;
  voice_avgDuration: string;
  voice_forwarded: string;
  voice_inbound: string;
  voice_outbound: string;
  voice_ringing: string;
  voice_inProgress: string;
  voice_onHold: string;
  voice_callCompleted: string;
  voice_aiHandled: string;

  // Settings
  settings_title: string;
  settings_company: string;
  settings_channels: string;
  settings_team: string;
  settings_ai: string;
  settings_notifications: string;
  settings_billing: string;
  settings_security: string;
  settings_api: string;
  settings_language: string;

  // Admin
  admin_title: string;
  admin_overview: string;
  admin_companies: string;
  admin_system: string;
  admin_totalCompanies: string;
  admin_totalUsers: string;
  admin_totalRevenue: string;
  admin_addCompany: string;
  admin_planDistribution: string;

  // License
  license_title: string;
  license_key: string;
  license_generate: string;
  license_activate: string;
  license_deactivate: string;
  license_valid: string;
  license_expired: string;
  license_plan: string;
  license_expiresAt: string;
  license_maxUsers: string;
  license_management: string;

  // Auth
  auth_login: string;
  auth_register: string;
  auth_email: string;
  auth_password: string;
  auth_forgotPassword: string;
  auth_companyName: string;
  auth_yourName: string;
  auth_phone: string;
  auth_industry: string;
  auth_step1: string;
  auth_step2: string;
  auth_personalInfo: string;
  auth_companyInfo: string;
};

const tr: TranslationKeys = {
  save: "Kaydet", cancel: "İptal", delete: "Sil", edit: "Düzenle", add: "Ekle", search: "Ara", filter: "Filtre", all: "Tümü", active: "Aktif", inactive: "Pasif", status: "Durum", actions: "İşlemler", close: "Kapat", confirm: "Onayla", back: "Geri", next: "İleri", loading: "Yükleniyor...", noData: "Veri bulunamadı", success: "Başarılı", error: "Hata",
  nav_dashboard: "Panel", nav_messages: "Mesajlar", nav_contacts: "Rehber / CRM", nav_campaigns: "Kampanyalar", nav_appointments: "Randevular", nav_notifications: "Bildirimler", nav_orders: "Sipariş / Kargo", nav_voiceSupport: "Sesli Destek", nav_settings: "Ayarlar", nav_admin: "Admin Panel",
  dash_title: "Dashboard", dash_totalConversations: "Toplam Görüşme", dash_activeConversations: "Aktif Görüşme", dash_resolvedToday: "Bugün Çözülen", dash_avgResponseTime: "Ort. Yanıt Süresi", dash_totalContacts: "Toplam Kişi", dash_newContactsToday: "Bugün Yeni", dash_pendingAppointments: "Bekleyen Randevu", dash_activeCampaigns: "Aktif Kampanya", dash_totalOrders: "Toplam Sipariş", dash_revenue: "Gelir", dash_aiResponseRate: "AI Yanıt Oranı", dash_customerSatisfaction: "Müşteri Memnuniyeti", dash_recentActivity: "Son Aktiviteler",
  msg_title: "Mesajlar", msg_allChannels: "Tüm Kanallar", msg_typeMessage: "Mesajınızı yazın...", msg_send: "Gönder", msg_aiSuggestions: "AI Önerileri", msg_useSuggestion: "Kullan",
  contact_title: "Rehber / CRM", contact_addNew: "Yeni Kişi Ekle", contact_name: "Ad Soyad", contact_phone: "Telefon", contact_email: "E-posta", contact_company: "Şirket", contact_tags: "Etiketler", contact_source: "Kaynak", contact_customer: "Müşteri", contact_lead: "Potansiyel",
  camp_title: "Kampanyalar", camp_createNew: "Yeni Kampanya", camp_broadcast: "Toplu Gönderim", camp_drip: "Damla Kampanya", camp_triggered: "Tetikleyici", camp_sent: "Gönderilen", camp_delivered: "Ulaşan", camp_read: "Okunan", camp_responses: "Yanıtlar",
  appt_title: "Randevular", appt_createNew: "Yeni Randevu", appt_date: "Tarih", appt_time: "Saat", appt_duration: "Süre", appt_scheduled: "Planlanmış", appt_confirmed: "Onaylanmış", appt_completed: "Tamamlanmış", appt_cancelled: "İptal Edilmiş", appt_listView: "Liste Görünümü", appt_calendarView: "Takvim Görünümü",
  order_title: "Sipariş & Kargo", order_number: "Sipariş No", order_total: "Toplam", order_tracking: "Kargo Takip", order_pending: "Beklemede", order_processing: "Hazırlanıyor", order_shipped: "Kargoda", order_delivered: "Teslim Edildi",
  voice_title: "Sesli Destek", voice_callHistory: "Arama Geçmişi", voice_liveSupport: "Canlı Destek", voice_routing: "Yönlendirme", voice_aiSettings: "AI Ses Ayarları", voice_newCall: "Yeni Arama", voice_totalCalls: "Toplam Arama", voice_aiAnswered: "AI Yanıtlanan", voice_missed: "Cevapsız", voice_avgDuration: "Ort. Süre", voice_forwarded: "Yönlendirilen", voice_inbound: "Gelen", voice_outbound: "Giden", voice_ringing: "Çalıyor", voice_inProgress: "Görüşmede", voice_onHold: "Beklemede", voice_callCompleted: "Tamamlandı", voice_aiHandled: "AI Yanıtladı",
  settings_title: "Ayarlar", settings_company: "Şirket Bilgileri", settings_channels: "Kanal Entegrasyonları", settings_team: "Ekip Yönetimi", settings_ai: "Yapay Zeka", settings_notifications: "Bildirimler", settings_billing: "Fatura & Plan", settings_security: "Güvenlik", settings_api: "API & Webhook", settings_language: "Dil Ayarları",
  admin_title: "Süper Admin Paneli", admin_overview: "Genel Bakış", admin_companies: "Şirketler", admin_system: "Sistem", admin_totalCompanies: "Toplam Şirket", admin_totalUsers: "Toplam Kullanıcı", admin_totalRevenue: "Toplam Gelir", admin_addCompany: "Yeni Şirket Ekle", admin_planDistribution: "Plan Dağılımı",
  license_title: "Lisans Yönetimi", license_key: "Lisans Anahtarı", license_generate: "Lisans Oluştur", license_activate: "Aktifleştir", license_deactivate: "Devre Dışı Bırak", license_valid: "Geçerli", license_expired: "Süresi Dolmuş", license_plan: "Plan", license_expiresAt: "Bitiş Tarihi", license_maxUsers: "Maks. Kullanıcı", license_management: "Lisans Yönetimi",
  auth_login: "Giriş Yap", auth_register: "Kayıt Ol", auth_email: "E-posta", auth_password: "Şifre", auth_forgotPassword: "Şifremi Unuttum", auth_companyName: "Şirket Adı", auth_yourName: "Adınız Soyadınız", auth_phone: "Telefon", auth_industry: "Sektör", auth_step1: "Adım 1", auth_step2: "Adım 2", auth_personalInfo: "Kişisel Bilgiler", auth_companyInfo: "Şirket Bilgileri",
};

const en: TranslationKeys = {
  save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit", add: "Add", search: "Search", filter: "Filter", all: "All", active: "Active", inactive: "Inactive", status: "Status", actions: "Actions", close: "Close", confirm: "Confirm", back: "Back", next: "Next", loading: "Loading...", noData: "No data found", success: "Success", error: "Error",
  nav_dashboard: "Dashboard", nav_messages: "Messages", nav_contacts: "Contacts / CRM", nav_campaigns: "Campaigns", nav_appointments: "Appointments", nav_notifications: "Notifications", nav_orders: "Orders / Shipping", nav_voiceSupport: "Voice Support", nav_settings: "Settings", nav_admin: "Admin Panel",
  dash_title: "Dashboard", dash_totalConversations: "Total Conversations", dash_activeConversations: "Active Conversations", dash_resolvedToday: "Resolved Today", dash_avgResponseTime: "Avg. Response Time", dash_totalContacts: "Total Contacts", dash_newContactsToday: "New Today", dash_pendingAppointments: "Pending Appointments", dash_activeCampaigns: "Active Campaigns", dash_totalOrders: "Total Orders", dash_revenue: "Revenue", dash_aiResponseRate: "AI Response Rate", dash_customerSatisfaction: "Customer Satisfaction", dash_recentActivity: "Recent Activity",
  msg_title: "Messages", msg_allChannels: "All Channels", msg_typeMessage: "Type your message...", msg_send: "Send", msg_aiSuggestions: "AI Suggestions", msg_useSuggestion: "Use",
  contact_title: "Contacts / CRM", contact_addNew: "Add New Contact", contact_name: "Full Name", contact_phone: "Phone", contact_email: "Email", contact_company: "Company", contact_tags: "Tags", contact_source: "Source", contact_customer: "Customer", contact_lead: "Lead",
  camp_title: "Campaigns", camp_createNew: "New Campaign", camp_broadcast: "Broadcast", camp_drip: "Drip Campaign", camp_triggered: "Triggered", camp_sent: "Sent", camp_delivered: "Delivered", camp_read: "Read", camp_responses: "Responses",
  appt_title: "Appointments", appt_createNew: "New Appointment", appt_date: "Date", appt_time: "Time", appt_duration: "Duration", appt_scheduled: "Scheduled", appt_confirmed: "Confirmed", appt_completed: "Completed", appt_cancelled: "Cancelled", appt_listView: "List View", appt_calendarView: "Calendar View",
  order_title: "Orders & Shipping", order_number: "Order No", order_total: "Total", order_tracking: "Tracking", order_pending: "Pending", order_processing: "Processing", order_shipped: "Shipped", order_delivered: "Delivered",
  voice_title: "Voice Support", voice_callHistory: "Call History", voice_liveSupport: "Live Support", voice_routing: "Routing", voice_aiSettings: "AI Voice Settings", voice_newCall: "New Call", voice_totalCalls: "Total Calls", voice_aiAnswered: "AI Answered", voice_missed: "Missed", voice_avgDuration: "Avg. Duration", voice_forwarded: "Forwarded", voice_inbound: "Inbound", voice_outbound: "Outbound", voice_ringing: "Ringing", voice_inProgress: "In Progress", voice_onHold: "On Hold", voice_callCompleted: "Completed", voice_aiHandled: "AI Handled",
  settings_title: "Settings", settings_company: "Company Info", settings_channels: "Channel Integrations", settings_team: "Team Management", settings_ai: "Artificial Intelligence", settings_notifications: "Notifications", settings_billing: "Billing & Plan", settings_security: "Security", settings_api: "API & Webhook", settings_language: "Language Settings",
  admin_title: "Super Admin Panel", admin_overview: "Overview", admin_companies: "Companies", admin_system: "System", admin_totalCompanies: "Total Companies", admin_totalUsers: "Total Users", admin_totalRevenue: "Total Revenue", admin_addCompany: "Add New Company", admin_planDistribution: "Plan Distribution",
  license_title: "License Management", license_key: "License Key", license_generate: "Generate License", license_activate: "Activate", license_deactivate: "Deactivate", license_valid: "Valid", license_expired: "Expired", license_plan: "Plan", license_expiresAt: "Expires At", license_maxUsers: "Max Users", license_management: "License Management",
  auth_login: "Login", auth_register: "Register", auth_email: "Email", auth_password: "Password", auth_forgotPassword: "Forgot Password", auth_companyName: "Company Name", auth_yourName: "Your Name", auth_phone: "Phone", auth_industry: "Industry", auth_step1: "Step 1", auth_step2: "Step 2", auth_personalInfo: "Personal Information", auth_companyInfo: "Company Information",
};

const de: TranslationKeys = {
  save: "Speichern", cancel: "Abbrechen", delete: "Löschen", edit: "Bearbeiten", add: "Hinzufügen", search: "Suchen", filter: "Filter", all: "Alle", active: "Aktiv", inactive: "Inaktiv", status: "Status", actions: "Aktionen", close: "Schließen", confirm: "Bestätigen", back: "Zurück", next: "Weiter", loading: "Laden...", noData: "Keine Daten gefunden", success: "Erfolg", error: "Fehler",
  nav_dashboard: "Dashboard", nav_messages: "Nachrichten", nav_contacts: "Kontakte / CRM", nav_campaigns: "Kampagnen", nav_appointments: "Termine", nav_notifications: "Benachrichtigungen", nav_orders: "Bestellungen / Versand", nav_voiceSupport: "Sprachsupport", nav_settings: "Einstellungen", nav_admin: "Admin-Panel",
  dash_title: "Dashboard", dash_totalConversations: "Gesamtgespräche", dash_activeConversations: "Aktive Gespräche", dash_resolvedToday: "Heute gelöst", dash_avgResponseTime: "Durchschn. Antwortzeit", dash_totalContacts: "Gesamtkontakte", dash_newContactsToday: "Heute neu", dash_pendingAppointments: "Ausstehende Termine", dash_activeCampaigns: "Aktive Kampagnen", dash_totalOrders: "Gesamtbestellungen", dash_revenue: "Umsatz", dash_aiResponseRate: "KI-Antwortrate", dash_customerSatisfaction: "Kundenzufriedenheit", dash_recentActivity: "Letzte Aktivitäten",
  msg_title: "Nachrichten", msg_allChannels: "Alle Kanäle", msg_typeMessage: "Nachricht eingeben...", msg_send: "Senden", msg_aiSuggestions: "KI-Vorschläge", msg_useSuggestion: "Verwenden",
  contact_title: "Kontakte / CRM", contact_addNew: "Neuen Kontakt hinzufügen", contact_name: "Vollständiger Name", contact_phone: "Telefon", contact_email: "E-Mail", contact_company: "Unternehmen", contact_tags: "Tags", contact_source: "Quelle", contact_customer: "Kunde", contact_lead: "Interessent",
  camp_title: "Kampagnen", camp_createNew: "Neue Kampagne", camp_broadcast: "Massenversand", camp_drip: "Drip-Kampagne", camp_triggered: "Ausgelöst", camp_sent: "Gesendet", camp_delivered: "Zugestellt", camp_read: "Gelesen", camp_responses: "Antworten",
  appt_title: "Termine", appt_createNew: "Neuer Termin", appt_date: "Datum", appt_time: "Uhrzeit", appt_duration: "Dauer", appt_scheduled: "Geplant", appt_confirmed: "Bestätigt", appt_completed: "Abgeschlossen", appt_cancelled: "Storniert", appt_listView: "Listenansicht", appt_calendarView: "Kalenderansicht",
  order_title: "Bestellungen & Versand", order_number: "Bestellnr.", order_total: "Gesamt", order_tracking: "Sendungsverfolgung", order_pending: "Ausstehend", order_processing: "In Bearbeitung", order_shipped: "Versendet", order_delivered: "Geliefert",
  voice_title: "Sprachsupport", voice_callHistory: "Anrufverlauf", voice_liveSupport: "Live-Support", voice_routing: "Weiterleitung", voice_aiSettings: "KI-Spracheinstellungen", voice_newCall: "Neuer Anruf", voice_totalCalls: "Gesamtanrufe", voice_aiAnswered: "KI beantwortet", voice_missed: "Verpasst", voice_avgDuration: "Durchschn. Dauer", voice_forwarded: "Weitergeleitet", voice_inbound: "Eingehend", voice_outbound: "Ausgehend", voice_ringing: "Klingelt", voice_inProgress: "Im Gespräch", voice_onHold: "In Warteschleife", voice_callCompleted: "Abgeschlossen", voice_aiHandled: "KI bearbeitet",
  settings_title: "Einstellungen", settings_company: "Firmeninfo", settings_channels: "Kanalintegrationen", settings_team: "Teamverwaltung", settings_ai: "Künstliche Intelligenz", settings_notifications: "Benachrichtigungen", settings_billing: "Abrechnung & Plan", settings_security: "Sicherheit", settings_api: "API & Webhook", settings_language: "Spracheinstellungen",
  admin_title: "Super-Admin-Panel", admin_overview: "Übersicht", admin_companies: "Unternehmen", admin_system: "System", admin_totalCompanies: "Gesamtunternehmen", admin_totalUsers: "Gesamtbenutzer", admin_totalRevenue: "Gesamtumsatz", admin_addCompany: "Neues Unternehmen", admin_planDistribution: "Planverteilung",
  license_title: "Lizenzverwaltung", license_key: "Lizenzschlüssel", license_generate: "Lizenz erstellen", license_activate: "Aktivieren", license_deactivate: "Deaktivieren", license_valid: "Gültig", license_expired: "Abgelaufen", license_plan: "Plan", license_expiresAt: "Ablaufdatum", license_maxUsers: "Max. Benutzer", license_management: "Lizenzverwaltung",
  auth_login: "Anmelden", auth_register: "Registrieren", auth_email: "E-Mail", auth_password: "Passwort", auth_forgotPassword: "Passwort vergessen", auth_companyName: "Firmenname", auth_yourName: "Ihr Name", auth_phone: "Telefon", auth_industry: "Branche", auth_step1: "Schritt 1", auth_step2: "Schritt 2", auth_personalInfo: "Persönliche Informationen", auth_companyInfo: "Firmeninformationen",
};

const fr: TranslationKeys = {
  save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", edit: "Modifier", add: "Ajouter", search: "Rechercher", filter: "Filtrer", all: "Tous", active: "Actif", inactive: "Inactif", status: "Statut", actions: "Actions", close: "Fermer", confirm: "Confirmer", back: "Retour", next: "Suivant", loading: "Chargement...", noData: "Aucune donnée trouvée", success: "Succès", error: "Erreur",
  nav_dashboard: "Tableau de bord", nav_messages: "Messages", nav_contacts: "Contacts / CRM", nav_campaigns: "Campagnes", nav_appointments: "Rendez-vous", nav_notifications: "Notifications", nav_orders: "Commandes / Livraison", nav_voiceSupport: "Support vocal", nav_settings: "Paramètres", nav_admin: "Panneau Admin",
  dash_title: "Tableau de bord", dash_totalConversations: "Conversations totales", dash_activeConversations: "Conversations actives", dash_resolvedToday: "Résolues aujourd'hui", dash_avgResponseTime: "Temps de réponse moy.", dash_totalContacts: "Contacts totaux", dash_newContactsToday: "Nouveaux aujourd'hui", dash_pendingAppointments: "Rendez-vous en attente", dash_activeCampaigns: "Campagnes actives", dash_totalOrders: "Commandes totales", dash_revenue: "Revenus", dash_aiResponseRate: "Taux de réponse IA", dash_customerSatisfaction: "Satisfaction client", dash_recentActivity: "Activité récente",
  msg_title: "Messages", msg_allChannels: "Tous les canaux", msg_typeMessage: "Tapez votre message...", msg_send: "Envoyer", msg_aiSuggestions: "Suggestions IA", msg_useSuggestion: "Utiliser",
  contact_title: "Contacts / CRM", contact_addNew: "Ajouter un contact", contact_name: "Nom complet", contact_phone: "Téléphone", contact_email: "E-mail", contact_company: "Entreprise", contact_tags: "Étiquettes", contact_source: "Source", contact_customer: "Client", contact_lead: "Prospect",
  camp_title: "Campagnes", camp_createNew: "Nouvelle campagne", camp_broadcast: "Diffusion", camp_drip: "Campagne goutte-à-goutte", camp_triggered: "Déclenchée", camp_sent: "Envoyés", camp_delivered: "Livrés", camp_read: "Lus", camp_responses: "Réponses",
  appt_title: "Rendez-vous", appt_createNew: "Nouveau rendez-vous", appt_date: "Date", appt_time: "Heure", appt_duration: "Durée", appt_scheduled: "Planifié", appt_confirmed: "Confirmé", appt_completed: "Terminé", appt_cancelled: "Annulé", appt_listView: "Vue liste", appt_calendarView: "Vue calendrier",
  order_title: "Commandes & Livraison", order_number: "N° commande", order_total: "Total", order_tracking: "Suivi", order_pending: "En attente", order_processing: "En traitement", order_shipped: "Expédié", order_delivered: "Livré",
  voice_title: "Support vocal", voice_callHistory: "Historique d'appels", voice_liveSupport: "Support en direct", voice_routing: "Routage", voice_aiSettings: "Paramètres voix IA", voice_newCall: "Nouvel appel", voice_totalCalls: "Appels totaux", voice_aiAnswered: "Répondus par IA", voice_missed: "Manqués", voice_avgDuration: "Durée moy.", voice_forwarded: "Transférés", voice_inbound: "Entrant", voice_outbound: "Sortant", voice_ringing: "Sonne", voice_inProgress: "En cours", voice_onHold: "En attente", voice_callCompleted: "Terminé", voice_aiHandled: "Géré par IA",
  settings_title: "Paramètres", settings_company: "Info entreprise", settings_channels: "Intégrations canaux", settings_team: "Gestion d'équipe", settings_ai: "Intelligence artificielle", settings_notifications: "Notifications", settings_billing: "Facturation & Plan", settings_security: "Sécurité", settings_api: "API & Webhook", settings_language: "Paramètres de langue",
  admin_title: "Panneau Super Admin", admin_overview: "Vue d'ensemble", admin_companies: "Entreprises", admin_system: "Système", admin_totalCompanies: "Entreprises totales", admin_totalUsers: "Utilisateurs totaux", admin_totalRevenue: "Revenus totaux", admin_addCompany: "Ajouter une entreprise", admin_planDistribution: "Distribution des plans",
  license_title: "Gestion des licences", license_key: "Clé de licence", license_generate: "Générer une licence", license_activate: "Activer", license_deactivate: "Désactiver", license_valid: "Valide", license_expired: "Expiré", license_plan: "Plan", license_expiresAt: "Expire le", license_maxUsers: "Utilisateurs max.", license_management: "Gestion des licences",
  auth_login: "Connexion", auth_register: "S'inscrire", auth_email: "E-mail", auth_password: "Mot de passe", auth_forgotPassword: "Mot de passe oublié", auth_companyName: "Nom de l'entreprise", auth_yourName: "Votre nom", auth_phone: "Téléphone", auth_industry: "Secteur", auth_step1: "Étape 1", auth_step2: "Étape 2", auth_personalInfo: "Informations personnelles", auth_companyInfo: "Informations entreprise",
};

const ar: TranslationKeys = {
  save: "حفظ", cancel: "إلغاء", delete: "حذف", edit: "تعديل", add: "إضافة", search: "بحث", filter: "تصفية", all: "الكل", active: "نشط", inactive: "غير نشط", status: "الحالة", actions: "إجراءات", close: "إغلاق", confirm: "تأكيد", back: "رجوع", next: "التالي", loading: "جاري التحميل...", noData: "لا توجد بيانات", success: "نجاح", error: "خطأ",
  nav_dashboard: "لوحة التحكم", nav_messages: "الرسائل", nav_contacts: "جهات الاتصال", nav_campaigns: "الحملات", nav_appointments: "المواعيد", nav_notifications: "الإشعارات", nav_orders: "الطلبات / الشحن", nav_voiceSupport: "الدعم الصوتي", nav_settings: "الإعدادات", nav_admin: "لوحة المدير",
  dash_title: "لوحة التحكم", dash_totalConversations: "إجمالي المحادثات", dash_activeConversations: "المحادثات النشطة", dash_resolvedToday: "تم حلها اليوم", dash_avgResponseTime: "متوسط وقت الاستجابة", dash_totalContacts: "إجمالي جهات الاتصال", dash_newContactsToday: "جديد اليوم", dash_pendingAppointments: "مواعيد معلقة", dash_activeCampaigns: "حملات نشطة", dash_totalOrders: "إجمالي الطلبات", dash_revenue: "الإيرادات", dash_aiResponseRate: "معدل استجابة الذكاء الاصطناعي", dash_customerSatisfaction: "رضا العملاء", dash_recentActivity: "النشاط الأخير",
  msg_title: "الرسائل", msg_allChannels: "جميع القنوات", msg_typeMessage: "اكتب رسالتك...", msg_send: "إرسال", msg_aiSuggestions: "اقتراحات الذكاء الاصطناعي", msg_useSuggestion: "استخدام",
  contact_title: "جهات الاتصال", contact_addNew: "إضافة جهة اتصال", contact_name: "الاسم الكامل", contact_phone: "الهاتف", contact_email: "البريد الإلكتروني", contact_company: "الشركة", contact_tags: "العلامات", contact_source: "المصدر", contact_customer: "عميل", contact_lead: "محتمل",
  camp_title: "الحملات", camp_createNew: "حملة جديدة", camp_broadcast: "بث جماعي", camp_drip: "حملة تنقيط", camp_triggered: "مُشغّلة", camp_sent: "مُرسل", camp_delivered: "تم التوصيل", camp_read: "مقروء", camp_responses: "الردود",
  appt_title: "المواعيد", appt_createNew: "موعد جديد", appt_date: "التاريخ", appt_time: "الوقت", appt_duration: "المدة", appt_scheduled: "مجدول", appt_confirmed: "مؤكد", appt_completed: "مكتمل", appt_cancelled: "ملغي", appt_listView: "عرض القائمة", appt_calendarView: "عرض التقويم",
  order_title: "الطلبات والشحن", order_number: "رقم الطلب", order_total: "الإجمالي", order_tracking: "التتبع", order_pending: "معلق", order_processing: "قيد المعالجة", order_shipped: "تم الشحن", order_delivered: "تم التوصيل",
  voice_title: "الدعم الصوتي", voice_callHistory: "سجل المكالمات", voice_liveSupport: "الدعم المباشر", voice_routing: "التوجيه", voice_aiSettings: "إعدادات الصوت الذكي", voice_newCall: "مكالمة جديدة", voice_totalCalls: "إجمالي المكالمات", voice_aiAnswered: "أجاب الذكاء الاصطناعي", voice_missed: "فائتة", voice_avgDuration: "متوسط المدة", voice_forwarded: "محولة", voice_inbound: "واردة", voice_outbound: "صادرة", voice_ringing: "يرن", voice_inProgress: "جاري", voice_onHold: "في الانتظار", voice_callCompleted: "مكتملة", voice_aiHandled: "تم التعامل بالذكاء الاصطناعي",
  settings_title: "الإعدادات", settings_company: "معلومات الشركة", settings_channels: "تكامل القنوات", settings_team: "إدارة الفريق", settings_ai: "الذكاء الاصطناعي", settings_notifications: "الإشعارات", settings_billing: "الفواتير والخطة", settings_security: "الأمان", settings_api: "API و Webhook", settings_language: "إعدادات اللغة",
  admin_title: "لوحة المدير العام", admin_overview: "نظرة عامة", admin_companies: "الشركات", admin_system: "النظام", admin_totalCompanies: "إجمالي الشركات", admin_totalUsers: "إجمالي المستخدمين", admin_totalRevenue: "إجمالي الإيرادات", admin_addCompany: "إضافة شركة", admin_planDistribution: "توزيع الخطط",
  license_title: "إدارة التراخيص", license_key: "مفتاح الترخيص", license_generate: "إنشاء ترخيص", license_activate: "تفعيل", license_deactivate: "إلغاء التفعيل", license_valid: "صالح", license_expired: "منتهي الصلاحية", license_plan: "الخطة", license_expiresAt: "ينتهي في", license_maxUsers: "أقصى عدد مستخدمين", license_management: "إدارة التراخيص",
  auth_login: "تسجيل الدخول", auth_register: "التسجيل", auth_email: "البريد الإلكتروني", auth_password: "كلمة المرور", auth_forgotPassword: "نسيت كلمة المرور", auth_companyName: "اسم الشركة", auth_yourName: "اسمك", auth_phone: "الهاتف", auth_industry: "القطاع", auth_step1: "الخطوة 1", auth_step2: "الخطوة 2", auth_personalInfo: "المعلومات الشخصية", auth_companyInfo: "معلومات الشركة",
};

const es: TranslationKeys = {
  save: "Guardar", cancel: "Cancelar", delete: "Eliminar", edit: "Editar", add: "Agregar", search: "Buscar", filter: "Filtrar", all: "Todos", active: "Activo", inactive: "Inactivo", status: "Estado", actions: "Acciones", close: "Cerrar", confirm: "Confirmar", back: "Atrás", next: "Siguiente", loading: "Cargando...", noData: "No se encontraron datos", success: "Éxito", error: "Error",
  nav_dashboard: "Panel", nav_messages: "Mensajes", nav_contacts: "Contactos / CRM", nav_campaigns: "Campañas", nav_appointments: "Citas", nav_notifications: "Notificaciones", nav_orders: "Pedidos / Envíos", nav_voiceSupport: "Soporte de voz", nav_settings: "Configuración", nav_admin: "Panel Admin",
  dash_title: "Panel de control", dash_totalConversations: "Conversaciones totales", dash_activeConversations: "Conversaciones activas", dash_resolvedToday: "Resueltas hoy", dash_avgResponseTime: "Tiempo respuesta prom.", dash_totalContacts: "Contactos totales", dash_newContactsToday: "Nuevos hoy", dash_pendingAppointments: "Citas pendientes", dash_activeCampaigns: "Campañas activas", dash_totalOrders: "Pedidos totales", dash_revenue: "Ingresos", dash_aiResponseRate: "Tasa respuesta IA", dash_customerSatisfaction: "Satisfacción del cliente", dash_recentActivity: "Actividad reciente",
  msg_title: "Mensajes", msg_allChannels: "Todos los canales", msg_typeMessage: "Escribe tu mensaje...", msg_send: "Enviar", msg_aiSuggestions: "Sugerencias IA", msg_useSuggestion: "Usar",
  contact_title: "Contactos / CRM", contact_addNew: "Agregar contacto", contact_name: "Nombre completo", contact_phone: "Teléfono", contact_email: "Correo", contact_company: "Empresa", contact_tags: "Etiquetas", contact_source: "Origen", contact_customer: "Cliente", contact_lead: "Prospecto",
  camp_title: "Campañas", camp_createNew: "Nueva campaña", camp_broadcast: "Difusión masiva", camp_drip: "Campaña de goteo", camp_triggered: "Activada", camp_sent: "Enviados", camp_delivered: "Entregados", camp_read: "Leídos", camp_responses: "Respuestas",
  appt_title: "Citas", appt_createNew: "Nueva cita", appt_date: "Fecha", appt_time: "Hora", appt_duration: "Duración", appt_scheduled: "Programada", appt_confirmed: "Confirmada", appt_completed: "Completada", appt_cancelled: "Cancelada", appt_listView: "Vista lista", appt_calendarView: "Vista calendario",
  order_title: "Pedidos y envíos", order_number: "N° pedido", order_total: "Total", order_tracking: "Seguimiento", order_pending: "Pendiente", order_processing: "Procesando", order_shipped: "Enviado", order_delivered: "Entregado",
  voice_title: "Soporte de voz", voice_callHistory: "Historial de llamadas", voice_liveSupport: "Soporte en vivo", voice_routing: "Enrutamiento", voice_aiSettings: "Config. voz IA", voice_newCall: "Nueva llamada", voice_totalCalls: "Total llamadas", voice_aiAnswered: "Respondidas por IA", voice_missed: "Perdidas", voice_avgDuration: "Duración prom.", voice_forwarded: "Transferidas", voice_inbound: "Entrante", voice_outbound: "Saliente", voice_ringing: "Sonando", voice_inProgress: "En curso", voice_onHold: "En espera", voice_callCompleted: "Completada", voice_aiHandled: "Manejada por IA",
  settings_title: "Configuración", settings_company: "Info de empresa", settings_channels: "Integraciones de canales", settings_team: "Gestión de equipo", settings_ai: "Inteligencia artificial", settings_notifications: "Notificaciones", settings_billing: "Facturación y plan", settings_security: "Seguridad", settings_api: "API y Webhook", settings_language: "Configuración de idioma",
  admin_title: "Panel Super Admin", admin_overview: "Vista general", admin_companies: "Empresas", admin_system: "Sistema", admin_totalCompanies: "Empresas totales", admin_totalUsers: "Usuarios totales", admin_totalRevenue: "Ingresos totales", admin_addCompany: "Agregar empresa", admin_planDistribution: "Distribución de planes",
  license_title: "Gestión de licencias", license_key: "Clave de licencia", license_generate: "Generar licencia", license_activate: "Activar", license_deactivate: "Desactivar", license_valid: "Válida", license_expired: "Expirada", license_plan: "Plan", license_expiresAt: "Expira el", license_maxUsers: "Máx. usuarios", license_management: "Gestión de licencias",
  auth_login: "Iniciar sesión", auth_register: "Registrarse", auth_email: "Correo", auth_password: "Contraseña", auth_forgotPassword: "Olvidé mi contraseña", auth_companyName: "Nombre de empresa", auth_yourName: "Tu nombre", auth_phone: "Teléfono", auth_industry: "Industria", auth_step1: "Paso 1", auth_step2: "Paso 2", auth_personalInfo: "Información personal", auth_companyInfo: "Información de empresa",
};

export const translations: Record<Locale, TranslationKeys> = { tr, en, de, fr, ar, es };
