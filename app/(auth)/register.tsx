import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Platform, Text, KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowRight, Mail, Lock, User, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(auth)/login');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Premium Mesh Background */}
      <LinearGradient
        colors={isLight ? Colors.gradients.mesh : ['#09090B', '#18181B', '#09090B']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
            <View style={[styles.logoIcon, { backgroundColor: theme.tint + '20' }]}>
              <Zap size={32} color={theme.tint} fill={theme.tint} />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>Join Neural<Text style={{ color: theme.tint }}>Fit</Text></Text>
            <Text style={styles.subtitle}>Begin your high-performance journey.</Text>
          </Animated.View>

          {/* Register Card */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <GlassCard style={styles.card} intensity={60}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }]}>
                <User size={18} color={theme.tabIconDefault} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Aditya Kumar"
                  placeholderTextColor={theme.tabIconDefault}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <Text style={[styles.label, { marginTop: 20 }]}>EMAIL ADDRESS</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }]}>
                <Mail size={18} color={theme.tabIconDefault} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="example@neuralfit.io"
                  placeholderTextColor={theme.tabIconDefault}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <Text style={[styles.label, { marginTop: 20 }]}>PASSWORD</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }]}>
                <Lock size={18} color={theme.tabIconDefault} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.tabIconDefault}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={handleRegister}
                disabled={isLoading}
                style={{ marginTop: 32 }}
              >
                <LinearGradient
                  colors={Colors.gradients.primary}
                  style={styles.btn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.btnText}>{isLoading ? 'CREATING LAB...' : 'CREATE ACCOUNT'}</Text>
                  {!isLoading && <ArrowRight size={20} color="#FFF" />}
                </LinearGradient>
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>

          {/* Footer Navigation */}
          <Animated.View entering={FadeInUp.delay(600)} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={[styles.footerLink, { color: theme.tint }]}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '500',
  },
  card: {
    marginVertical: 0,
    padding: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  btn: {
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  footerText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '800',
  },
});
