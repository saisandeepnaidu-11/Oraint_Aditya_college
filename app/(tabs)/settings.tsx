import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Switch, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
  Settings as SettingsIcon,
  Bell,
  Volume2,
  Moon,
  Lock,
  HelpCircle,
  ChevronRight,
  Download,
  Database,
  ArrowLeft
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';
  
  const [notifications, setNotifications] = React.useState(true);
  const [sounds, setSounds] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(colorScheme === 'dark');

  const SettingItem = ({ icon: Icon, title, value, onToggle, showChevron = false, isLast }: any) => (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={[styles.settingItem, !isLast && { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }]}>
        <View style={[styles.settingIcon, { backgroundColor: `${theme.tint}15` }]}>
          <Icon size={20} color={theme.tint} />
        </View>
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
        {showChevron ? (
          <ChevronRight size={18} color={theme.textMuted} />
        ) : (
          <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: `${theme.tint}40` }}
            thumbColor={value ? theme.tint : '#94A3B8'}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Premium Mesh Background */}
      <LinearGradient
        colors={isLight ? ['#F8FAFC', '#E2E8F0', '#F8FAFC'] : ['#09090B', '#1E1B4B', '#09090B']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        </AnimatedView>

        <AnimatedView entering={FadeInDown.delay(200)}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>COMMUNICATIONS</Text>
          <GlassCard style={styles.card} intensity={25}>
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              value={notifications}
              onToggle={setNotifications}
            />
            <SettingItem
              icon={Volume2}
              title="Neural Sound Effects"
              value={sounds}
              onToggle={setSounds}
              isLast
            />
          </GlassCard>
        </AnimatedView>

        <AnimatedView entering={FadeInDown.delay(300)}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>INTERFACE</Text>
          <GlassCard style={styles.card} intensity={25}>
            <SettingItem
              icon={Moon}
              title="Deep Dark Mode"
              value={darkMode}
              onToggle={setDarkMode}
              isLast
            />
          </GlassCard>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(400)}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>DATA PROTOCOLS</Text>
          <GlassCard style={styles.card} intensity={25}>
            <SettingItem
              icon={Download}
              title="Export Biometric Data"
              showChevron={true}
            />
            <SettingItem
              icon={Database}
              title="Flush System Cache"
              showChevron={true}
              isLast
            />
          </GlassCard>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(500)}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>LEGAL & SUPPORT</Text>
          <GlassCard style={styles.card} intensity={20}>
            <SettingItem
              icon={HelpCircle}
              title="Help Matrix"
              showChevron={true}
            />
            <SettingItem
              icon={Lock}
              title="Privacy Architecture"
              showChevron={true}
            />
            <SettingItem
              icon={SettingsIcon}
              title="Terms of Engagement"
              showChevron={true}
              isLast
            />
          </GlassCard>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(600)}>
          <Text style={[styles.version, { color: theme.textMuted }]}>NeuralFit v1.2.0 • REL_240401</Text>
        </AnimatedView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 16,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 16,
    marginTop: 8,
    opacity: 0.6,
  },
  card: {
    padding: 6,
    marginBottom: 32,
    marginVertical: 0,
    borderRadius: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 16,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    letterSpacing: -0.2,
  },
  version: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 40,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.4,
  },
});
