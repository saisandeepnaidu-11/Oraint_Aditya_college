import React from 'react';
import { StyleSheet, Pressable, PressableProps, Text, ViewStyle, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface PrimaryButtonProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({ title, icon, style, textStyle, ...props }: PrimaryButtonProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[
        styles.button,
        { backgroundColor: theme.tint, shadowColor: theme.tint },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {icon}
      <Text style={[styles.text, textStyle, { color: colorScheme === 'dark' ? '#000' : '#FFF' }]}>{title}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999, // Pill shape
    gap: 8,
    // Glow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
