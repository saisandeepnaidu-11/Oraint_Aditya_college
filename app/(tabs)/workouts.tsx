import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Dumbbell, Search, Filter, Zap, Heart, Braces, Activity } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedView = Animated.createAnimatedComponent(View);
const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Power'];

export default function WorkoutsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const workouts = [
    {
      title: 'Full Body Blast',
      duration: 15,
      calories: 280,
      intensity: 'Intense' as const,
      category: 'Strength',
      icon: <Dumbbell size={28} color="#FFF" />,
      image: require('@/assets/images/hydration_3d.png'), // Using available asset as premium background
    },
    {
      title: 'Core Crusher',
      duration: 10,
      calories: 150,
      intensity: 'Moderate' as const,
      category: 'Strength',
      icon: <Braces size={28} color="#FFF" />,
    },
    {
      title: 'Quick Cardio',
      duration: 7,
      calories: 120,
      intensity: 'Light' as const,
      category: 'Cardio',
      icon: <Heart size={28} color="#FFF" />,
    },
    {
      title: 'HIIT Training',
      duration: 20,
      calories: 350,
      intensity: 'Intense' as const,
      category: 'HIIT',
      icon: <Zap size={28} color="#FFF" />,
    },
    {
      title: 'Yoga Flow',
      duration: 30,
      calories: 120,
      intensity: 'Light' as const,
      category: 'Yoga',
      icon: <Activity size={28} color="#FFF" />,
    },
    {
      title: 'Power Lifting',
      duration: 45,
      calories: 200,
      intensity: 'Intense' as const,
      category: 'Power',
      icon: <Dumbbell size={28} color="#FFF" />,
    },
  ];

  const filteredWorkouts = selectedCategory === 'All' 
    ? workouts 
    : workouts.filter(w => w.category === selectedCategory);

  return (
    <View style={styles.container}>
       <LinearGradient
        colors={isLight ? ['#F8FAFC', '#E2E8F0', '#F8FAFC'] : ['#09090B', '#1E1B4B', '#09090B']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <AnimatedView entering={FadeInDown.delay(100)}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>CHOOSE YOUR,</Text>
              <Text style={[styles.title, { color: theme.text }]}>Challenge</Text>
            </View>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }]}>
              <Filter size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInDown.delay(200)}>
          <GlassCard style={styles.searchCard} intensity={25}>
            <Search size={22} color={theme.textMuted} />
            <TextInput 
              placeholder="Search trainings..."
              placeholderTextColor={theme.textMuted}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </GlassCard>
        </AnimatedView>

        <AnimatedView entering={FadeInDown.delay(300)}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.catPill,
                  selectedCategory === cat ? { backgroundColor: theme.tint, borderColor: theme.tint } : { borderColor: 'rgba(255,255,255,0.1)' }
                ]}
              >
                <Text style={[
                  styles.catText, 
                  { color: selectedCategory === cat ? '#FFF' : theme.textMuted }
                ]}>
                  {cat.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(400)}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>TRENDING NOW</Text>
            <TouchableOpacity><Text style={[styles.seeAll, { color: theme.tint }]}>SEE ALL</Text></TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularScroll}
          >
            {workouts.slice(0, 3).map((w, index) => (
              <WorkoutCard
                key={index}
                {...w}
                style={styles.popularCard}
                onPress={() => router.push('/(tabs)/workout-detail')}
              />
            ))}
          </ScrollView>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(500)}>
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 40 }]}>
            {selectedCategory.toUpperCase()} PROTOCOLS
          </Text>
          <View style={styles.verticalGrid}>
            {filteredWorkouts.map((w, index) => (
              <WorkoutCard
                key={index}
                {...w}
                onPress={() => router.push('/(tabs)/workout-detail')}
              />
            ))}
          </View>
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
  filterBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 24,
    gap: 16,
    marginVertical: 0,
    marginBottom: 32,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  categoryScroll: {
    gap: 12,
    marginBottom: 40,
    paddingRight: 24,
  },
  catPill: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 100,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  catText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2.5,
    opacity: 0.8,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  popularScroll: {
    gap: 20,
    paddingRight: 24,
  },
  popularCard: {
    width: 320,
    marginVertical: 0,
  },
  verticalGrid: {
    gap: 16,
  },
});
