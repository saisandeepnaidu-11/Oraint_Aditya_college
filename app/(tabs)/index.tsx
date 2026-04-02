import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { StatRing } from '@/components/StatRing';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Flame, Droplets, Zap, Activity as ActivityIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedView = Animated.createAnimatedComponent(View);
const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';
  
  return (
    <View style={styles.container}>
      {/* Premium Mesh Background */}
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
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={[styles.username, { color: theme.text }]}>Aditya</Text>
            </View>
            <TouchableOpacity style={styles.streakPill}>
              <View style={[styles.streakBlur, { backgroundColor: isLight ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)' }]}>
                <Zap size={16} color="#10B981" fill="#10B981" />
                <Text style={styles.streakText}>12 DAY STREAK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </AnimatedView>

        {/* Main Stats Row */}
        <AnimatedView entering={FadeInDown.delay(200)} style={styles.mainStatsRow}>
          <GlassCard style={styles.largeCard} intensity={40}>
            <Text style={[styles.cardLabel, { color: theme.textMuted }]}>DAILY OVERVIEW</Text>
            <View style={styles.ringWrapper}>
              <StatRing
                progress={0.72}
                size={170}
                strokeWidth={14}
                color={Colors.gradients.primary}
                valueText="1,240"
                label="KCAL"
              />
            </View>
          </GlassCard>

          <View style={styles.sideStatsCol}>
            <GlassCard style={styles.sideCard} intensity={30}>
              <StatRing
                progress={0.45}
                size={80}
                strokeWidth={10}
                color={Colors.gradients.success}
                valueText="450"
              />
              <View style={styles.sideCardFooter}>
                 <Text style={[styles.sideLabel, { color: theme.textMuted }]}>BURNED</Text>
              </View>
            </GlassCard>

            <GlassCard style={styles.sideCard} intensity={30}>
              <StatRing
                progress={0.8}
                size={80}
                strokeWidth={10}
                color={Colors.gradients.water}
                valueText="2.5L"
              />
              <View style={styles.sideCardFooter}>
                <Text style={[styles.sideLabel, { color: theme.textMuted }]}>WATER</Text>
              </View>
            </GlassCard>
          </View>
        </AnimatedView>

        {/* Horizontal Info Cards */}
        <AnimatedView entering={FadeInUp.delay(300)} style={styles.horizontalRow}>
          <GlassCard style={styles.horizontalCard} intensity={25}>
            <View style={styles.rowContent}>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowHeader}>
                  <Droplets color={theme.accent} size={20} />
                  <Text style={[styles.rowTitle, { color: theme.text }]}>Hydration</Text>
                </View>
                <Text style={[styles.rowValue, { color: theme.textMuted }]}>Goal: 3.0L</Text>
              </View>
              <Image 
                source={require('@/assets/images/hydration_3d.png')} 
                style={styles.rowImage} 
              />
            </View>
          </GlassCard>

          <GlassCard style={styles.horizontalCard} intensity={25}>
            <View style={styles.rowContent}>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowHeader}>
                  <ActivityIcon color={theme.tint} size={20} />
                  <Text style={[styles.rowTitle, { color: theme.text }]}>Activity</Text>
                </View>
                <Text style={[styles.rowValue, { color: theme.textMuted }]}>6,420 Steps</Text>
              </View>
              <View style={[styles.iconPlaceholder, { backgroundColor: `${theme.tint}15` }]}>
                <ActivityIcon color={theme.tint} size={32} />
              </View>
            </View>
          </GlassCard>
        </AnimatedView>

        {/* Bottom Quick Links */}
        <AnimatedView entering={FadeInUp.delay(400)} style={styles.footerRow}>
           <TouchableOpacity 
             style={styles.footerBtn}
             onPress={() => router.push('/(tabs)/workouts')}
           >
              <GlassCard style={styles.footerCard} intensity={20}>
                <Flame size={24} color={theme.error} />
                <Text style={[styles.footerText, { color: theme.text }]}>Trainings</Text>
              </GlassCard>
           </TouchableOpacity>
           
           <TouchableOpacity 
             style={styles.footerBtn}
             onPress={() => router.push('/(tabs)/achievements' as any)}
            >
              <GlassCard style={styles.footerCard} intensity={20}>
                <Zap size={24} color={theme.tint} />
                <Text style={[styles.footerText, { color: theme.text }]}>Achievements</Text>
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
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  username: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -2,
    marginTop: -4,
  },
  streakPill: {
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  streakBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  streakText: {
    color: '#10B981',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },
  mainStatsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  largeCard: {
    flex: 1.3,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
  },
  cardLabel: {
    position: 'absolute',
    top: 24,
    left: 24,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  ringWrapper: {
    marginTop: 20,
  },
  sideStatsCol: {
    flex: 1,
    gap: 16,
  },
  sideCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 0,
    padding: 16,
  },
  sideCardFooter: {
    marginTop: 10,
    alignItems: 'center',
  },
  sideLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  horizontalRow: {
    gap: 16,
    marginBottom: 24,
  },
  horizontalCard: {
    marginVertical: 0,
    padding: 0,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 32,
  },
  rowImage: {
    width: 90,
    height: 70,
    resizeMode: 'contain',
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 16,
  },
  footerBtn: {
    flex: 1,
  },
  footerCard: {
    marginVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
});
