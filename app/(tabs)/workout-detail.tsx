import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { ArrowLeft, Clock, Flame, Zap, Play, Pause, RotateCcw, CheckCircle2, Dumbbell, Timer } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Video, ResizeMode } from 'expo-av';

const { width } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);

const EXERCISES = [
  { 
    name: 'Warm Up', 
    duration: 10, 
    icon: <Timer size={32} color="#FFF" />,
    video: 'https://player.vimeo.com/external/494270225.sd.mp4?s=d0046600c6d705c93c126d4036e788736a18d15a&profile_id=165&oauth2_token_id=57447761'
  },
  { 
    name: 'Push-ups', 
    duration: 30, 
    icon: <Dumbbell size={32} color="#FFF" />,
    video: 'https://player.vimeo.com/external/494270451.sd.mp4?s=d31c46369c9b9649516c0f2095cc6068224fa934&profile_id=165&oauth2_token_id=57447761'
  },
  { 
    name: 'Squats', 
    duration: 30, 
    icon: <Dumbbell size={32} color="#FFF" />,
    video: 'https://player.vimeo.com/external/450622963.sd.mp4?s=95521715886915152861b585ee581b09b0b410d7&profile_id=165&oauth2_token_id=57447761'
  },
  { 
    name: 'Burpees', 
    duration: 20, 
    icon: <Zap size={32} color="#FFF" />,
    video: 'https://player.vimeo.com/external/494270514.sd.mp4?s=8872b73b2260e0a583e769641775791776566085&profile_id=165&oauth2_token_id=57447761'
  },
];

export default function WorkoutDetailScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';
  const navigation = useNavigation();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = useSharedValue(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<Video>(null);

  const currentExercise = EXERCISES[currentExerciseIndex];
  const radius = 85;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        progress.value = withTiming((timeLeft - 1) / currentExercise.duration, {
          duration: 1000,
          easing: Easing.linear,
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextExercise();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const handleNextExercise = () => {
    if (currentExerciseIndex < EXERCISES.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeLeft(EXERCISES[nextIndex].duration);
      progress.value = 1;
      setIsActive(true);
    } else {
      setIsActive(false);
      setIsCompleted(true);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetWorkout = () => {
    setCurrentExerciseIndex(0);
    setTimeLeft(EXERCISES[0].duration);
    progress.value = 1;
    setIsActive(false);
    setIsCompleted(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isLight ? ['#F8FAFC', '#E2E8F0', '#F8FAFC'] : ['#09090B', '#1E1B4B', '#09090B']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }]}>
            <ArrowLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>FULL BODY BLAST</Text>
          <View style={{ width: 44 }} />
        </AnimatedView>

        {!isCompleted ? (
          <>
            {/* Immersive Workout Video Player */}
            <AnimatedView entering={FadeInDown.delay(200)}>
              <GlassCard style={styles.imageCard} intensity={40}>
                <Video
                  ref={videoRef}
                  style={styles.video}
                  source={{ uri: currentExercise.video }}
                  useNativeControls={false}
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  shouldPlay={isActive}
                />
                <View style={styles.exerciseBadge}>
                  <Text style={styles.exerciseBadgeText}>EXERCISE {currentExerciseIndex + 1}/{EXERCISES.length}</Text>
                </View>
              </GlassCard>
            </AnimatedView>

            {/* Timer Section */}
            <AnimatedView entering={FadeInDown.delay(300)} style={styles.timerContainer}>
              <View style={styles.svgWrapper}>
                <Svg width={220} height={220}>
                  <Circle
                    cx={110}
                    cy={110}
                    r={radius}
                    stroke={isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)'}
                    strokeWidth={14}
                    fill="none"
                  />
                  <Circle
                     cx={110}
                     cy={110}
                     r={radius}
                     stroke={theme.tint}
                     strokeWidth={14}
                     fill="none"
                     opacity={0.1}
                  />
                  <AnimatedCircle
                    cx={110}
                    cy={110}
                    r={radius}
                    stroke={theme.tint}
                    strokeWidth={14}
                    fill="none"
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                    strokeLinecap="round"
                    rotation="-90"
                    originX={110}
                    originY={110}
                  />
                </Svg>
                <View style={styles.timerLabels}>
                  <Text style={[styles.timerValue, { color: theme.text }]}>{timeLeft}s</Text>
                  <Text style={[styles.timerLabel, { color: theme.textMuted }]}>{currentExercise.name}</Text>
                </View>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={toggleTimer} style={[styles.controlBtn, { backgroundColor: theme.tint }]}>
                  {isActive ? <Pause size={32} color="#FFF" /> : <Play size={32} color="#FFF" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={resetWorkout} style={[styles.secondaryControl, { backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }]}>
                  <RotateCcw size={22} color={theme.text} />
                </TouchableOpacity>
              </View>
            </AnimatedView>

            {/* Exercise List */}
            <AnimatedView entering={FadeInUp.delay(400)} style={styles.listSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>UP NEXT</Text>
              {EXERCISES.map((ex, idx) => (
                <View key={idx} style={[styles.exerciseItem, idx < currentExerciseIndex && styles.completedItem]}>
                  <View style={[styles.idxBadge, { backgroundColor: idx === currentExerciseIndex ? theme.tint : (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)') }]}>
                    <Text style={[styles.idxText, { color: idx === currentExerciseIndex ? '#FFF' : theme.textMuted }]}>{idx + 1}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, { color: theme.text }]}>{ex.name}</Text>
                    <Text style={[styles.itemDetail, { color: theme.textMuted }]}>{ex.duration} SECONDS</Text>
                  </View>
                  {idx < currentExerciseIndex && <CheckCircle2 size={24} color="#10B981" />}
                </View>
              ))}
            </AnimatedView>
          </>
        ) : (
          /* Completion State */
          <AnimatedView entering={FadeInUp} style={styles.completeContainer}>
             <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.completeIconGradient}
              >
                <CheckCircle2 size={60} color="#FFF" />
              </LinearGradient>
            <Text style={[styles.completeTitle, { color: theme.text }]}>WORKOUT COMPLETE!</Text>
            <Text style={[styles.completeSubtitle, { color: theme.textMuted }]}>You crushed the Full Body blast.</Text>
            <TouchableOpacity onPress={resetWorkout} style={[styles.completeBtn, { backgroundColor: theme.tint }]}>
              <Text style={styles.completeBtnText}>RESTART WORKOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.finishBtn}>
              <Text style={[styles.finishBtnText, { color: theme.textMuted }]}>CLOSE PLAYER</Text>
            </TouchableOpacity>
          </AnimatedView>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  backBtn: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 13, fontWeight: '900', letterSpacing: 2, opacity: 0.8 },
  imageCard: { 
    height: 320, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 0, 
    marginVertical: 0, 
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  video: {
    width: '100%',
    height: '100%',
  },
  exerciseBadge: { 
    position: 'absolute', 
    bottom: 24, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 100 
  },
  exerciseBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  timerContainer: { alignItems: 'center', marginVertical: 40 },
  svgWrapper: { alignItems: 'center', justifyContent: 'center' },
  timerLabels: { position: 'absolute', alignItems: 'center', gap: 4 },
  timerValue: { fontSize: 64, fontWeight: '900', letterSpacing: -1 },
  timerLabel: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, opacity: 0.6 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 32, marginTop: 40 },
  controlBtn: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  secondaryControl: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  listSection: { marginTop: 32 },
  sectionTitle: { fontSize: 12, fontWeight: '900', marginBottom: 24, letterSpacing: 2, opacity: 0.6 },
  exerciseItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, gap: 20 },
  completedItem: { opacity: 0.4 },
  idxBadge: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  idxText: { fontSize: 16, fontWeight: '900' },
  itemInfo: { flex: 1, gap: 4 },
  itemName: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  itemDetail: { fontSize: 13, fontWeight: '700', opacity: 0.6 },
  completeContainer: { alignItems: 'center', paddingTop: 60, gap: 12 },
  completeIconGradient: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  completeTitle: { fontSize: 36, fontWeight: '900', textAlign: 'center', letterSpacing: -1 },
  completeSubtitle: { fontSize: 18, textAlign: 'center', marginBottom: 32 },
  completeBtn: { height: 72, width: '100%', borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  completeBtnText: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1.5 },
  finishBtn: { padding: 24 },
  finishBtnText: { fontSize: 13, fontWeight: '800', letterSpacing: 1.5 },
});
