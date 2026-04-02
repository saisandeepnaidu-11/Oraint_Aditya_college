import React from 'react';
import { View, StyleSheet, ViewProps, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
}

export function GlassCard({ children, style, intensity = 20, ...props }: GlassCardProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  return (
    <View 
      style={[
        styles.container,
        {
          shadowColor: theme.cardShadow,
        },
        style
      ]}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        style={[
          styles.blurContainer,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }
        ]}
      >
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40, // More rounded for premium feel
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
      web: {
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
      }
    }),
  },
  blurContainer: {
    borderRadius: 40,
    padding: 24,
    borderWidth: 1.2,
    overflow: 'hidden',
  },
});
