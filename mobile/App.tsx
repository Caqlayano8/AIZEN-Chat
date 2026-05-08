import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import DashboardScreen from "./src/screens/DashboardScreen";
import ChatListScreen from "./src/screens/ChatListScreen";
import ContactsScreen from "./src/screens/ContactsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { colors } from "./src/lib/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderTopColor: colors.border,
            backgroundColor: colors.card,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Panel"
          component={DashboardScreen}
          options={{ tabBarLabel: "Panel" }}
        />
        <Tab.Screen
          name="Mesajlar"
          component={ChatListScreen}
          options={{
            tabBarLabel: "Mesajlar",
            tabBarBadge: 6,
            tabBarBadgeStyle: { backgroundColor: colors.primary, fontSize: 10 },
          }}
        />
        <Tab.Screen
          name="Rehber"
          component={ContactsScreen}
          options={{ tabBarLabel: "Rehber" }}
        />
        <Tab.Screen
          name="Ayarlar"
          component={SettingsScreen}
          options={{ tabBarLabel: "Ayarlar" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
