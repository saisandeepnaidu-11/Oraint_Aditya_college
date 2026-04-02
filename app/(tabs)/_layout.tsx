import React from 'react';
import { Home, Dumbbell, Apple, User, Trophy, Settings } from 'lucide-react-native';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(24, 24, 27, 0.85)',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 30,
          left: 40,
          right: 40,
          height: 76,
          borderRadius: 38,
          elevation: 25,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.3,
          shadowRadius: 30,
          paddingHorizontal: 10,
          borderWidth: 1.5,
          borderColor: isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)',
        },
        tabBarItemStyle: {
          height: 60,
          marginTop: 8,
        },
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTransparent: true,
        headerTintColor: theme.text,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: `${theme.tint}15` }]}>
              <Home size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: `${theme.tint}15` }]}>
              <Dumbbell size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="workout-detail"
        options={{
          title: 'Workout Detail',
          href: null,
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Diet Tracker',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: `${theme.tint}15` }]}>
              <Apple size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: `${theme.tint}15` }]}>
              <User size={24} color={color} />
            </View>
          ),
        }}
      />
      {/* Hidden Screens */}
      <Tabs.Screen name="achievements" options={{ href: null }} />
      <Tabs.Screen name="goals" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
