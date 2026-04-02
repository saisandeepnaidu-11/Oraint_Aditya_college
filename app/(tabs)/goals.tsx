import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Target, Zap, TrendingDown, Calendar, Plus, ArrowRight, Flame, Trophy, Activity } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

export default function GoalsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const goalItems = [
    {
      icon: <TrendingDown size={22} color="#10B981" />,
      title: 'Weight Goal',
      current: '75',
      target: '70',
      unit: 'kg',
      progress: 0.65,
      color: '#10B981',
    },
    {
      icon: <Zap size={22} color={theme.tint} />,
      title: 'Workouts',
      current: '4',
      target: '5',
      unit: 'sessions',
      progress: 0.8,
      color: theme.tint,
    },
    {
      icon: <Activity size={22} color={theme.accent} />,
      title: 'Daily Steps',
      current: '8,420',
      target: '10k',
      unit: 'steps',
      progress: 0.84,
      color: theme.accent,
    },
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
            <Text style={styles.greeting}>YOUR AMBITIONS,</Text>
            <Text style={[styles.title, { color: theme.text }]}>Active Goals</Text>
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.tint }]}>
            <Plus size={24} color="#FFF" />
          </TouchableOpacity>
        </AnimatedView>

        {/* Weekly Progress Overview */}
        <AnimatedView entering={FadeInDown.delay(200)}>
          <GlassCard style={styles.summaryCard} intensity={40}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryInfo}>
                <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>WEEKLY PERFORMANCE</Text>
                <Text style={[styles.summaryValue, { color: theme.text }]}>Leveling Up!</Text>
              </View>
              <Trophy size={40} color={theme.tint} />
            </View>
            <View style={styles.summaryBarBg}>
              <LinearGradient 
                colors={Colors.gradients.primary} 
                style={[styles.summaryBarFill, { width: '82%' }]} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={[styles.summaryDesc, { color: theme.textMuted }]}>You've smashed 82% of your weekly targets. Stay focused!</Text>
          </GlassCard>
        </AnimatedView>

        {/* Interactive Goal Cards */}
        <View style={styles.goalsList}>
          {goalItems.map((goal, index) => (
            <AnimatedView key={index} entering={FadeInUp.delay(300 + index * 100)}>
              <GlassCard style={styles.goalCard} intensity={30}>
                <View style={styles.goalTop}>
                  <View style={[styles.iconBox, { backgroundColor: `${goal.color}15` }]}>
                    {goal.icon}
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={[styles.goalTitle, { color: theme.text }]}>{goal.title}</Text>
                    <Text style={[styles.goalProgressText, { color: theme.textMuted }]}>
                      <Text style={{ color: theme.text, fontWeight: '900' }}>{goal.current}</Text> / {goal.target} {goal.unit}
                    </Text>
                  </View>
                  <View style={[styles.percentBox, { backgroundColor: `${goal.color}10` }]}>
                    <Text style={[styles.percentText, { color: goal.color }]}>{Math.round(goal.progress * 100)}%</Text>
                  </View>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${goal.progress * 100}%`, backgroundColor: goal.color }]} />
                </View>
              </GlassCard>
            </AnimatedView>
          ))}
        </View>

        {/* Quick Add Section */}
        <AnimatedView entering={FadeInUp.delay(600)}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>SET NEW TARGET</Text>
          <GlassCard style={styles.inputCard} intensity={25}>
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <Text style={[styles.label, { color: theme.textMuted }]}>GOAL TITLE</Text>
                <TextInput 
                  placeholder="e.g. 5K Run"
                  placeholderTextColor={theme.tabIconDefault}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>
              <View style={[styles.inputWrapper, { width: 100 }]}>
                <Text style={[styles.label, { color: theme.textMuted }]}>TARGET</Text>
                <TextInput 
                  placeholder="Value"
                  keyboardType="numeric"
                  placeholderTextColor={theme.tabIconDefault}
                  style={[styles.textInput, { color: theme.text }]}
                />
              </View>
            </View>
            <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.tint }]}>
              <Text style={styles.createBtnText}>INITIATE GOAL</Text>
              <ArrowRight size={20} color="#FFF" />
            </TouchableOpacity>
          </GlassCard>
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
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
  summaryCard: {
    padding: 28,
    marginBottom: 40,
    marginVertical: 0,
    borderRadius: 32,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryInfo: {
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  summaryBarBg: {
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 16,
  },
  summaryBarFill: {
    height: '100%',
    borderRadius: 7,
  },
  summaryDesc: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  goalsList: {
    gap: 16,
    marginBottom: 48,
  },
  goalCard: {
    padding: 24,
    marginVertical: 0,
    borderRadius: 24,
  },
  goalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalInfo: {
    flex: 1,
    marginLeft: 20,
    gap: 2,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  goalProgressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  percentBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: 2,
    opacity: 0.8,
  },
  inputCard: {
    padding: 28,
    marginVertical: 0,
    borderRadius: 32,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 28,
  },
  inputWrapper: {
    flex: 1,
    gap: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  textInput: {
    height: 50,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    fontSize: 18,
    fontWeight: '700',
  },
  createBtn: {
    height: 64,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  createBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
