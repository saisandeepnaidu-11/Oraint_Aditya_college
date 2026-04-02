import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Zap, Trophy, Flame, Target, Heart, TrendingUp, Crown, Star, ChevronRight, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

export default function AchievementsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const achievements = [
    { icon: <Flame size={24} color="#FF4D4D" />, label: 'First Step', desc: 'Started first workout', unlocked: true },
    { icon: <Trophy size={24} color="#FFD700" />, label: 'Week Warrior', desc: '7 Day workout streak', unlocked: true, progress: 0.8 },
    { icon: <Target size={24} color="#00F0FF" />, label: 'Goal Crusher', desc: 'Reached weight goal', unlocked: false, progress: 0.5 },
    { icon: <Heart size={24} color="#FF3366" />, label: 'Heart Healer', desc: 'Maintain HR for 20m', unlocked: false, progress: 0.3 },
  ];

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
          <View>
            <Text style={styles.greeting}>YOUR LEGACY,</Text>
            <Text style={[styles.title, { color: theme.text }]}>Milestones</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: `${theme.tint}20` }]}>
            <Crown size={18} color={theme.tint} />
            <Text style={[styles.levelText, { color: theme.tint }]}>LVL 12</Text>
          </View>
        </AnimatedView>

        {/* Premium Membership / Points Card */}
        <AnimatedView entering={FadeInDown.delay(200)}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={['#18181B', '#000000']}
              style={styles.pointsCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardBrand}>Neural<Text style={{ color: theme.tint }}>Fit</Text> <Text style={styles.proLabel}>PRO</Text></Text>
                <Zap size={22} color={theme.tint} fill={theme.tint} />
              </View>
              
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsValue}>2,450</Text>
                <Text style={[styles.pointsLabel, { color: theme.textMuted }]}>NEURAL POINTS EARNED</Text>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.footerLabel}>MEMBER SINCE</Text>
                  <Text style={styles.footerValue}>APR 2024</Text>
                </View>
                <View style={styles.rankContainer}>
                  <Text style={styles.rankText}>ELITE RANK</Text>
                  <TrendingUp size={14} color="#10B981" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </AnimatedView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <GlassCard style={styles.smallStatCard} intensity={20}>
            <View style={[styles.statIconWrapper, { backgroundColor: `${theme.tint}10` }]}>
               <Trophy size={20} color={theme.tint} />
            </View>
            <Text style={[styles.smallStatValue, { color: theme.text }]}>12</Text>
            <Text style={[styles.smallStatLabel, { color: theme.textMuted }]}>BADGES</Text>
          </GlassCard>
          <GlassCard style={styles.smallStatCard} intensity={20}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#10B98115' }]}>
               <Award size={20} color="#10B981" />
            </View>
            <Text style={[styles.smallStatValue, { color: theme.text }]}>84%</Text>
            <Text style={[styles.smallStatLabel, { color: theme.textMuted }]}>LEVEL-OP</Text>
          </GlassCard>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>BADGES & REWARDS</Text>
        <View style={styles.badgeGrid}>
          {achievements.map((item, index) => (
            <AnimatedView 
              key={index} 
              entering={FadeInUp.delay(300 + index * 100)}
              style={styles.badgeWrapper}
            >
              <GlassCard style={styles.badgeCard} intensity={item.unlocked ? 40 : 20}>
                <View style={[styles.iconBox, { backgroundColor: item.unlocked ? `${theme.tint}20` : 'rgba(255,255,255,0.05)' }]}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { 
                    color: item.unlocked ? (item.icon as any).props.color : '#52525B',
                    size: 32
                  })}
                </View>
                <Text style={[styles.badgeName, { color: item.unlocked ? theme.text : '#52525B' }]}>{item.label}</Text>
                <Text style={[styles.badgeDesc, { color: theme.textMuted }]} numberOfLines={1}>{item.desc}</Text>
                {item.progress && !item.unlocked && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${item.progress * 100}%`, backgroundColor: theme.tint }]} />
                  </View>
                )}
                {item.unlocked && <View style={[styles.unlockedDot, { backgroundColor: '#10B981' }]} />}
              </GlassCard>
            </AnimatedView>
          ))}
        </View>

        {/* Next Achievement Sneak Peak */}
        <AnimatedView entering={FadeInUp.delay(700)}>
          <TouchableOpacity activeOpacity={0.8} style={styles.nextTouch}>
            <GlassCard style={styles.nextCard} intensity={30}>
              <View style={[styles.nextIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                 <Star size={24} color="#F59E0B" fill="#F59E0B" />
              </View>
              <View style={styles.nextInfo}>
                <Text style={[styles.nextLabel, { color: theme.textMuted }]}>NEXT UNLOCKABLE</Text>
                <Text style={[styles.nextName, { color: theme.text }]}>Master of Iron</Text>
              </View>
              <ChevronRight size={22} color={theme.textMuted} />
            </GlassCard>
          </TouchableOpacity>
        </AnimatedView>

        <View style={{ height: 120 }} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  greeting: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1.5,
    marginTop: -4,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  levelText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  pointsCard: {
    width: '100%',
    height: 220,
    borderRadius: 32,
    padding: 28,
    justifyContent: 'space-between',
    marginBottom: 32,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  proLabel: {
    fontSize: 12,
    fontWeight: '900',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pointsContainer: {
    marginVertical: 12,
  },
  pointsValue: {
    color: '#FFF',
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -2,
  },
  pointsLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: -6,
    opacity: 0.6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  footerValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  rankText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  smallStatCard: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginVertical: 0,
    borderRadius: 24,
    gap: 4,
  },
  statIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  smallStatValue: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  smallStatLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 24,
    letterSpacing: 2,
    opacity: 0.8,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  badgeWrapper: {
    width: (width - 64) / 2,
  },
  badgeCard: {
    padding: 24,
    marginVertical: 0,
    alignItems: 'center',
    borderRadius: 32,
    height: 200,
    justifyContent: 'center',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  badgeDesc: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.6,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  unlockedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  nextTouch: {
    marginTop: 40,
  },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    marginVertical: 0,
    borderRadius: 32,
    gap: 16,
  },
  nextIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextInfo: {
    flex: 1,
    gap: 2,
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  nextName: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
