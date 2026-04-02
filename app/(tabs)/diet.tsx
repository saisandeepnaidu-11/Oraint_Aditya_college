import React, { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Animated, { FadeInDown, FadeInUp, useSharedValue, withSpring } from 'react-native-reanimated';
import { Camera, Utensils, Plus, Apple, Droplet, Zap, ChevronRight, Activity, MoreHorizontal, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

const INITIAL_MEALS = [
  { 
    id: '1', 
    name: 'Grilled Chicken Salad', 
    type: 'Lunch', 
    cal: 520, 
    protein: 54, 
    carbs: 35, 
    fats: 20, 
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300',
    color: '#10B981' 
  },
  { 
    id: '2', 
    name: 'Greek Yogurt & Berries', 
    type: 'Snack', 
    cal: 320, 
    protein: 22, 
    carbs: 30, 
    fats: 11, 
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=300',
    color: '#3B82F6'
  },
];

const DAILY_GOALS = {
  cal: 2000,
  protein: 150,
  carbs: 250,
  fats: 70,
};

function MacroBreakdownBar({ label, progress, color, value }: { label: string, progress: number, color: string, value: string }) {
  const barWidth = useSharedValue(0);
  
  React.useEffect(() => {
    barWidth.value = withSpring(Math.min(progress, 1));
  }, [progress]);

  return (
    <View style={styles.macroBarContainer}>
      <View style={styles.macroBarHeader}>
        <Text style={styles.macroBarLabel}>{label}</Text>
        <Text style={[styles.macroBarValue, { color }]}>{value}%</Text>
      </View>
      <View style={styles.macroTrack}>
        <Animated.View 
          style={[
            styles.macroFill, 
            { backgroundColor: color, width: `${Math.min(progress * 100, 100)}%` }
          ]} 
        />
      </View>
    </View>
  );
}

const FOOD_DATA_POOL = [
  { name: 'Poke Power Bowl', cal: 420, protein: 35, carbs: 40, fats: 12, color: '#34D399', isHealthy: true, insight: 'Optimal post-workout glycogen replenishment.' },
  { name: 'Grilled Salmon', cal: 510, protein: 45, carbs: 10, fats: 28, color: '#10B981', isHealthy: true, insight: 'High Omega-3 for muscle inflammation control.' },
  { name: 'Double Cheese Pizza', cal: 850, protein: 12, carbs: 95, fats: 45, color: '#EF4444', isHealthy: false, insight: 'High saturated fats and refined carbs. Not ideal for training.' },
  { name: 'Glazed Donuts', cal: 400, protein: 2, carbs: 55, fats: 22, color: '#F472B6', isHealthy: false, insight: 'Empty calories and high sugar spike. Avoid during diet phases.' },
  { name: 'Quinoa & Chickpea', cal: 380, protein: 18, carbs: 55, fats: 10, color: '#A855F7', isHealthy: true, insight: 'Fiber-rich complex carbs for sustained energy.' },
];

export default function DietScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const [meals, setMeals] = useState(INITIAL_MEALS);
  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const totals = useMemo(() => {
    return meals.reduce((acc, meal) => ({
      cal: acc.cal + meal.cal,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + (meal.fats || 0),
    }), { cal: 0, protein: 0, carbs: 0, fats: 0 });
  }, [meals]);

  const handleScanImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Photos access required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIsScanning(true);
      setStatusMessage('Scanning for Diet Suitability...');
      
      setTimeout(() => {
        const detectedItem = FOOD_DATA_POOL[Math.floor(Math.random() * FOOD_DATA_POOL.length)];
        
        if (detectedItem.isHealthy) {
          const newMeal = {
            id: Math.random().toString(),
            name: detectedItem.name,
            type: 'Diet Approved ✅',
            cal: detectedItem.cal,
            protein: detectedItem.protein,
            carbs: detectedItem.carbs,
            fats: detectedItem.fats,
            image: result.assets[0].uri,
            color: detectedItem.color,
            insight: detectedItem.insight,
          };
          
          setMeals([newMeal, ...meals]);
          setIsScanning(false);
          setStatusMessage('Healthy! Added to Log.');
        } else {
          setIsScanning(false);
          setStatusMessage('Not for Diet ❌');
          Alert.alert(
            'Incompatible Meal',
            `${detectedItem.name} was detected. This item does not meet your diet-approved standards and will not be logged.`,
            [{ text: 'Dismiss', onPress: () => setStatusMessage(null) }]
          );
        }
        
        setTimeout(() => setStatusMessage(null), 3000);
      }, 2000);
    }
  };

  const handleDuplicateMeal = (meal: typeof INITIAL_MEALS[0]) => {
    const newMeal = {
      ...meal,
      id: Math.random().toString(),
    };
    setMeals([newMeal, ...meals]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isLight ? ['#F8FAFC', '#E2E8F0', '#F8FAFC'] : ['#09090B', '#1E1B4B', '#09090B']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Nutrition</Text>
            <TouchableOpacity style={[styles.addIconBtn, { backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }]}>
              <Plus size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.quickStats}>
            <View style={[styles.statBadge, { backgroundColor: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.15)' }]}>
              <Zap size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.statText, { color: isLight ? '#92400E' : '#FBBF24' }]}>
                {totals.cal.toLocaleString()} <Text style={styles.statUnit}>kcal</Text>
              </Text>
            </View>
            <View style={[styles.statBadge, { backgroundColor: isLight ? '#DCFCE7' : 'rgba(16, 185, 129, 0.15)' }]}>
              <CheckCircle2 size={14} color="#10B981" />
              <Text style={[styles.statText, { color: isLight ? '#065F46' : '#34D399' }]}>
                {totals.protein} <Text style={styles.statUnit}>Protein</Text>
              </Text>
            </View>
          </View>
        </AnimatedView>

        <Text style={styles.subtext}>Diet Tracker Statistics</Text>

        {/* Macro Breakdown Section */}
        <AnimatedView entering={FadeInDown.delay(200)}>
          <GlassCard style={styles.macroCard} intensity={40}>
            <Text style={styles.cardTitle}>Macro Breakdown</Text>
            <MacroBreakdownBar 
              label="Protein" 
              progress={totals.protein / DAILY_GOALS.protein} 
              color="#34D399" 
              value={Math.round((totals.protein / DAILY_GOALS.protein) * 100).toString()} 
            />
            <MacroBreakdownBar 
              label="Carbs" 
              progress={totals.carbs / DAILY_GOALS.carbs} 
              color="#3B82F6" 
              value={Math.round((totals.carbs / DAILY_GOALS.carbs) * 100).toString()} 
            />
            <MacroBreakdownBar 
              label="Fat" 
              progress={totals.fats / DAILY_GOALS.fats} 
              color="#F59E0B" 
              value={Math.round((totals.fats / DAILY_GOALS.fats) * 100).toString()} 
            />
          </GlassCard>
        </AnimatedView>

        {/* Analyze Your Meal Card */}
        <AnimatedView entering={FadeInDown.delay(300)}>
          <GlassCard style={styles.analyzeCard} intensity={40}>
            <View style={styles.cameraIconBg}>
              {statusMessage === 'Added to log!' ? (
                <CheckCircle2 size={32} color="#10B981" />
              ) : (
                <Camera size={32} color="#A855F7" />
              )}
            </View>
            <Text style={styles.analyzeTitle}>{statusMessage || 'Analyze Your Meal'}</Text>
            <Text style={styles.analyzeDesc}>
              Take a photo of your meal, and we'll analyze to provide nutritional details and macro estimates.
            </Text>
            <TouchableOpacity 
              onPress={handleScanImage}
              disabled={isScanning}
              style={styles.analyzeBtn}
            >
              <LinearGradient
                colors={['#A855F7', '#7C3AED']}
                style={styles.analyzeBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isScanning ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Camera size={20} color="#FFF" />
                    <Text style={styles.analyzeBtnText}>Upload Food Image</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </GlassCard>
        </AnimatedView>

        {/* Today's Meals Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.cardTitle, { marginBottom: 0 }]}>Today's Meals</Text>
          <MoreHorizontal size={24} color={theme.textMuted} />
        </View>

        <View style={styles.mealGrid}>
          {meals.map((meal) => (
            <GlassCard key={meal.id} style={styles.gridMealCard} intensity={30}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: meal.image }} style={styles.mealThumb} />
                <TouchableOpacity style={styles.menuDots}>
                  <MoreHorizontal size={20} color={theme.textMuted} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.mealCardContent}>
                <Text style={styles.gridMealName}>{meal.name}</Text>
                <Text style={styles.gridMealType}>{meal.type}</Text>
                
                <View style={styles.gridMacros}>
                  <Text style={styles.gridMacroValue}>{meal.cal} <Text style={styles.gridMacroLabel}>kcal</Text></Text>
                  <Text style={styles.gridMacroValue}>{meal.protein}g <Text style={styles.gridMacroLabel}>p</Text></Text>
                  <Text style={styles.gridMacroValue}>{meal.carbs}g <Text style={styles.gridMacroLabel}>c</Text></Text>
                  <Text style={styles.gridMacroValue}>{meal.fats}g <Text style={styles.gridMacroLabel}>f</Text></Text>
                </View>

                <View style={[styles.bottomStatusBar, { backgroundColor: `${meal.color}20` }]} />

                <TouchableOpacity 
                  style={styles.inlineAddBtn}
                  onPress={() => handleDuplicateMeal(meal)}
                >
                  <Plus size={16} color={theme.tint} />
                  <Text style={[styles.inlineAddText, { color: theme.tint }]}>Add Meal</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerTitle: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },
  addIconBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickStats: { flexDirection: 'row', gap: 12 },
  statBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    borderRadius: 14,
    minWidth: 90
  },
  statText: { fontSize: 16, fontWeight: '900', letterSpacing: -0.5 },
  statUnit: { fontSize: 11, fontWeight: '700', opacity: 0.6, textTransform: 'lowercase' },
  subtext: { fontSize: 12, color: '#94A3B8', fontWeight: '700', marginBottom: 24, paddingLeft: 4 },
  macroCard: { padding: 24, marginBottom: 24, marginVertical: 0, borderRadius: 32 },
  cardTitle: { fontSize: 18, fontWeight: '900', marginBottom: 20, letterSpacing: -0.5 },
  macroBarContainer: { marginBottom: 16 },
  macroBarHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  macroBarLabel: { fontSize: 12, fontWeight: '700', opacity: 0.6 },
  macroBarValue: { fontSize: 13, fontWeight: '900' },
  macroTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: 3 },
  analyzeCard: { alignItems: 'center', padding: 40, marginBottom: 40, marginVertical: 0, borderRadius: 32 },
  cameraIconBg: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: 'rgba(168, 85, 247, 0.1)', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 24
  },
  analyzeTitle: { fontSize: 24, fontWeight: '900', marginBottom: 12, letterSpacing: -0.5 },
  analyzeDesc: { 
    textAlign: 'center', 
    fontSize: 14, 
    lineHeight: 22, 
    color: '#94A3B8', 
    paddingHorizontal: 20,
    marginBottom: 32 
  },
  analyzeBtn: { width: '100%' },
  analyzeBtnGradient: { 
    height: 64, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 12 
  },
  analyzeBtnText: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  mealGrid: { 
    flexDirection: 'row', 
    gap: 16,
    flexWrap: 'wrap'
  },
  gridMealCard: { 
    width: (width - 48 - 16) / 2, 
    padding: 0, 
    marginVertical: 0, 
    borderRadius: 24, 
    overflow: 'hidden' 
  },
  cardHeader: { position: 'relative', height: 120 },
  mealThumb: { width: '100%', height: '100%', resizeMode: 'cover' },
  menuDots: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  mealCardContent: { padding: 16, gap: 4 },
  gridMealName: { fontSize: 17, fontWeight: '900', letterSpacing: -0.5 },
  gridMealType: { fontSize: 11, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 },
  gridMacros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  gridMacroValue: { fontSize: 13, fontWeight: '900' },
  gridMacroLabel: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  bottomStatusBar: { height: 4, width: '100%', borderRadius: 2, marginBottom: 16 },
  inlineAddBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 6,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)'
  },
  inlineAddText: { fontSize: 13, fontWeight: '900' },
});
