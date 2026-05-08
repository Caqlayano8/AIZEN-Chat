import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { colors, spacing, borderRadius } from "../lib/theme";

interface Contact {
  id: string;
  name: string;
  company: string;
  phone: string;
  status: "customer" | "lead" | "active";
  avatar: string;
}

const contacts: Contact[] = [
  { id: "1", name: "Ahmet Yılmaz", company: "Yılmaz Teknoloji", phone: "+90 532 111 22 33", status: "customer", avatar: "AY" },
  { id: "2", name: "Fatma Demir", company: "", phone: "+90 505 222 33 44", status: "lead", avatar: "FD" },
  { id: "3", name: "Mehmet Kaya", company: "Kaya İnşaat", phone: "+90 542 333 44 55", status: "customer", avatar: "MK" },
  { id: "4", name: "Ayşe Özkan", company: "Özkan Danışmanlık", phone: "+90 533 444 55 66", status: "lead", avatar: "AÖ" },
  { id: "5", name: "Ali Çelik", company: "Çelik Group", phone: "+90 544 555 66 77", status: "customer", avatar: "AÇ" },
  { id: "6", name: "Zeynep Arslan", company: "Arslan Ltd.", phone: "+90 555 666 77 88", status: "active", avatar: "ZA" },
];

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  customer: { label: "Müşteri", color: "#15803d", bg: "#dcfce7" },
  lead: { label: "Lead", color: "#1d4ed8", bg: "#dbeafe" },
  active: { label: "Aktif", color: colors.primary, bg: `${colors.primary}20` },
};

export default function ContactsScreen() {
  const renderItem = ({ item }: { item: Contact }) => {
    const st = statusLabels[item.status];
    return (
      <TouchableOpacity style={styles.contactItem}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          {item.company ? <Text style={styles.contactCompany}>{item.company}</Text> : null}
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
          <Text style={[styles.statusText, { color: st.color }]}>{st.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rehber</Text>
        <Text style={styles.count}>{contacts.length} kişi</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="İsim veya şirket ara..."
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.sm, backgroundColor: colors.card },
  title: { fontSize: 28, fontWeight: "800", color: colors.text },
  count: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  searchInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  avatarText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: "600", color: colors.text },
  contactCompany: { fontSize: 11, color: colors.primary, marginTop: 1 },
  contactPhone: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.sm },
  statusText: { fontSize: 10, fontWeight: "700" },
  fab: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: { color: "#fff", fontSize: 28, fontWeight: "300", marginTop: -2 },
});
