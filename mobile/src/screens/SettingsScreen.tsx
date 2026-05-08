import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { colors, spacing, borderRadius } from "../lib/theme";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ayarlar</Text>
      </View>

      {/* Profile */}
      <TouchableOpacity style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>MA</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Mehmet Aydın</Text>
          <Text style={styles.profileEmail}>mehmet@demosirket.com</Text>
          <Text style={styles.profileCompany}>Demo Şirket A.Ş.</Text>
        </View>
      </TouchableOpacity>

      {/* Settings Groups */}
      <Text style={styles.sectionTitle}>Genel</Text>
      <View style={styles.settingsGroup}>
        {[
          { label: "Bildirimler", icon: "🔔" },
          { label: "Dil", icon: "🌐", value: "Türkçe" },
          { label: "Tema", icon: "🎨", value: "Açık" },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>{item.icon}</Text>
            <Text style={styles.settingsLabel}>{item.label}</Text>
            {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Yapay Zeka</Text>
      <View style={styles.settingsGroup}>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsIcon}>🤖</Text>
          <Text style={styles.settingsLabel}>Otomatik Cevaplama</Text>
          <Switch value={true} trackColor={{ true: colors.primary }} />
        </View>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsIcon}>🧠</Text>
          <Text style={styles.settingsLabel}>Akıllı Yönlendirme</Text>
          <Switch value={true} trackColor={{ true: colors.primary }} />
        </View>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsIcon}>💬</Text>
          <Text style={styles.settingsLabel}>Duygu Analizi</Text>
          <Switch value={false} trackColor={{ true: colors.primary }} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Hesap</Text>
      <View style={styles.settingsGroup}>
        {[
          { label: "Güvenlik", icon: "🔒" },
          { label: "Plan & Fatura", icon: "💳", value: "Profesyonel" },
          { label: "Kanal Bağlantıları", icon: "🔗" },
          { label: "Ekip Yönetimi", icon: "👥" },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>{item.icon}</Text>
            <Text style={styles.settingsLabel}>{item.label}</Text>
            {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Aizentr v1.0.0</Text>
      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.lg },
  title: { fontSize: 28, fontWeight: "800", color: colors.text },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  profileAvatarText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "700", color: colors.text },
  profileEmail: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  profileCompany: { fontSize: 11, color: colors.primary, marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: colors.textMuted, paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xs },
  settingsGroup: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  settingsIcon: { fontSize: 18, marginRight: spacing.md },
  settingsLabel: { flex: 1, fontSize: 14, fontWeight: "500", color: colors.text },
  settingsValue: { fontSize: 13, color: colors.textMuted, marginRight: spacing.xs },
  chevron: { fontSize: 20, color: colors.textMuted },
  logoutButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: "#fef2f2",
    borderRadius: borderRadius.lg,
    alignItems: "center",
  },
  logoutText: { fontSize: 14, fontWeight: "600", color: colors.danger },
  version: { textAlign: "center", fontSize: 12, color: colors.textMuted, marginTop: spacing.lg },
});
