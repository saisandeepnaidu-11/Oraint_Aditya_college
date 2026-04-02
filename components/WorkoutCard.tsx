import React from 'react';
import { View, StyleSheet, Pressable, PressableProps, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Clock, Flame, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WorkoutCardProps extends PressableProps {
  title: string;
  duration: number;
  calories: number;
  intensity: 'Light' | 'Moderate' | 'Intense';
  icon: React.ReactNode;
  image?: ImageSourcePropType;
  category?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function WorkoutCard({
  title,
  duration,
  calories,
  intensity,
  icon,
  image,
  category,
  style,
  ...props
}: WorkoutCardProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const scale = useSharedValue(1);

  const getIntensityColor = () => {
    switch (intensity) {
      case 'Light': return theme.success;
      case 'Moderate': return '#F59E0B';
      case 'Intense': return '#EF4444';
      default: return theme.tint;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[animatedStyle, style]}
      {...props}>
      <GlassCard style={styles.card} intensity={image ? 30 : 40}>
        {image && (
          <Image source={image} style={styles.bgImage} blurRadius={Platform.OS === 'web' ? 0 : 5} />
        )}
        <LinearGradient 
          colors={image ? ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)'] : ['transparent', 'transparent']} 
          style={StyleSheet.absoluteFill} 
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.iconWrapper, { backgroundColor: image ? 'rgba(255,255,255,0.2)' : `${theme.tint}15` }]}>
              {icon}
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: image ? '#FFF' : theme.text }]}>{title}</Text>
              <View style={styles.metaRow}>
                <View style={[styles.intensityBadge, { backgroundColor: `${getIntensityColor()}20` }]}>
                  <View style={[styles.intensityDot, { backgroundColor: getIntensityColor() }]} />
                  <Text style={[styles.intensityText, { color: getIntensityColor() }]}>{intensity}</Text>
                </View>
                {category && <Text style={[styles.categoryText, { color: image ? '#CCC' : theme.textMuted }]}>{category}</Text>}
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: image ? 'rgba(255,255,255,0.1)' : theme.border }]} />

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Clock size={16} color={image ? '#FFF' : theme.tabIconDefault} opacity={0.8} />
              <Text style={[styles.statText, { color: image ? '#FFF' : theme.text }]}>{duration} MIN</Text>
            </View>
            <View style={styles.statItem}>
              <Flame size={16} color={image ? theme.tint : theme.tint} />
              <Text style={[styles.statText, { color: image ? '#FFF' : theme.text }]}>{calories} KCAL</Text>
            </View>
            <ChevronRight size={18} color={image ? '#FFF' : theme.textMuted} style={{ marginLeft: 'auto' }} />
          </View>
        </View>
      </GlassCard>
    </AnimatedPressable>
  );
}

import { Platform } from 'react-native';

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  intensityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  intensityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  intensityText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.7,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
