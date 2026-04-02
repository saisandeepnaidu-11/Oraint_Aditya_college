import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withSpring, withDelay } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface StatRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string | readonly [string, string];
  label?: string;
  valueText?: string;
}

export function StatRing({
  progress,
  size = 140,
  strokeWidth = 12,
  color,
  label,
  valueText,
}: StatRingProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  
  const activeColor = color || theme.tint;
  const isGradient = Array.isArray(activeColor);
  const strokeColor = isGradient ? "url(#ringGrad)" : activeColor;
  const glowColor = isGradient ? activeColor[0] : activeColor;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withDelay(
      300,
      withSpring(progress, { 
        damping: 15,
        stiffness: 100,
      })
    );
  }, [progress]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - circumference * animatedProgress.value,
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          {isGradient && (
            <LinearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={activeColor[0]} />
              <Stop offset="1" stopColor={activeColor[1]} />
            </LinearGradient>
          )}
        </Defs>
        {/* Background Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorScheme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Glow Layer (Subtle Shadow) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={glowColor}
          strokeWidth={strokeWidth + 2}
          fill="none"
          opacity={0.15}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - circumference * progress}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
        {/* Active Progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor as string}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View style={styles.centerText}>
        <Text style={[styles.value, { color: theme.text }]}>{valueText || `${Math.round(progress * 100)}%`}</Text>
        {label && <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    transform: [{ rotate: '0deg' }],
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  value: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: -1,
    opacity: 0.8,
  },
});
