import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

interface AchievementBadgeProps {
  icon: React.ReactNode;
  label: string;
  unlocked: boolean;
  progress?: number; // 0 to 1
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function AchievementBadge({
  icon,
  label,
  unlocked,
  progress = 0,
}: AchievementBadgeProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];

  return (
    <AnimatedView
      entering={ZoomIn.springify()}
      style={[
        styles.container,
        {
          backgroundColor: unlocked ? `${theme.success}20` : `${theme.tabIconDefault}10`,
          borderColor: unlocked ? theme.success : theme.border,
        },
      ]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: unlocked ? theme.success : theme.tabIconDefault,
            opacity: unlocked ? 1 : 0.5,
          },
        ]}>
        {icon}
      </View>
      <Text style={[styles.label, { color: theme.text, opacity: unlocked ? 1 : 0.6 }]}>
        {label}
      </Text>
      {!unlocked && progress > 0 && (
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress * 100}%`,
              backgroundColor: theme.tint,
            },
          ]}
        />
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    minWidth: 80,
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
  },
});
