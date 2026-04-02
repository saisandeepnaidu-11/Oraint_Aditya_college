import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, ScrollView, Dimensions, Platform, Text, KeyboardAvoidingView } from 'react-native';
import { router, Link } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowRight, Mail, Lock, Zap, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const [email, setEmail] = useState('aditya@neuralfit.io');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
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
            <Text style={[styles.title, { color: theme.text }]}>Neural<Text style={{ color: theme.tint }}>Fit</Text></Text>
            <Text style={styles.subtitle}>Log in to your high-performance lab.</Text>
          </Animated.View>

          {/* Login Card */}
          <Animated.View entering={FadeInUp.delay(400)}>
            <GlassCard style={styles.card} intensity={60}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
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

              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={[styles.forgotText, { color: theme.tint }]}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={Colors.gradients.primary}
                  style={styles.loginBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginBtnText}>{isLoading ? 'AUTHENTICATING...' : 'SIGN IN'}</Text>
                  {!isLoading && <ArrowRight size={20} color="#FFF" />}
                </LinearGradient>
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>

          {/* Footer Navigation */}
          <Animated.View entering={FadeInUp.delay(600)} style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={[styles.footerLink, { color: theme.tint }]}>Create One</Text>
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
    fontSize: 42,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 32,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
  },
  loginBtn: {
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 18,
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
