import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions, Platform, TextInput, Alert, Modal } from 'react-native';
import { Text } from '@/components/Themed';
import { GlassCard } from '@/components/GlassCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Award, 
  Shield, 
  Bell,
  User as UserIcon,
  Crown,
  CreditCard,
  HelpCircle,
  Share2,
  Zap,
  Flame,
  Star,
  Edit2,
  Check,
  X
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const isLight = colorScheme === 'light';

  const [userName, setUserName] = useState('Aditya Sharma');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  
  // Bio & Settings State
  const [isBioVisible, setIsBioVisible] = useState(false);
  const [isSubVisible, setIsSubVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [bioData, setBioData] = useState({
    weight: '75',
    height: '182',
    goal: 'Muscle Gain',
    bio: 'Pushing the limits of neural-fit synchronization. Focused on hybrid strength and cardiovascular optimization.'
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Terminate your current session?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/(auth)/login') }
    ]);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      setIsEditing(false);
    }
  };

  const showItemDetail = (title: string) => {
    if (title === 'Achievements & Milestones') {
      router.push('/(tabs)/achievements');
      return;
    }
    
    if (title === 'Bio Information') {
      setIsBioVisible(true);
      return;
    }

    if (title === 'Subscription & Billing') {
      setIsSubVisible(true);
      return;
    }

    if (['Smart Notifications', 'Privacy Neural Link', 'Advanced Protocol'].includes(title)) {
      setActiveCategory(title);
      setIsSettingsVisible(true);
      return;
    }
    
    Alert.alert(
      title,
      `Neural Link established. This feature is being calibrated for your elite profile.`,
      [{ text: 'Acknowledged' }]
    );
  };

  const ProfileItem = ({ icon: Icon, title, color, onPress, isLast }: any) => (
    <TouchableOpacity 
      onPress={() => (onPress ? onPress() : showItemDetail(title))} 
      activeOpacity={0.7}
      style={[styles.itemContainer, !isLast && { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }]}
    >
      <View style={[styles.iconBox, { backgroundColor: `${color || theme.tint}15` }]}>
        <Icon size={20} color={color || theme.tint} />
      </View>
      <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
      <ChevronRight size={18} color={theme.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isLight ? ['#F8FAFC', '#E2E8F0', '#F8FAFC'] : ['#09090B', '#1E1B4B', '#09090B']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Bio Modal Implementation */}
      <Modal
        visible={isBioVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsBioVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsBioVisible(false)}
        >
          <AnimatedView entering={FadeInUp.springify()} style={styles.modalWrapper}>
            <GlassCard style={styles.modalCard} intensity={50}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Bio-Neural Information</Text>
                <TouchableOpacity onPress={() => setIsBioVisible(false)}>
                  <X size={20} color={theme.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={styles.bioGrid}>
                <View style={styles.bioInputGroup}>
                  <Text style={styles.bioLabel}>CURRENT WEIGHT</Text>
                  <TextInput 
                    style={[styles.bioInput, { color: theme.text }]} 
                    value={bioData.weight} 
                    onChangeText={(t) => setBioData({...bioData, weight: t})}
                    keyboardType="numeric"
                  />
                  <Text style={styles.bioSublabel}>KILOGRAMS</Text>
                </View>
                <View style={styles.bioInputGroup}>
                  <Text style={styles.bioLabel}>HEIGHT SPEC</Text>
                  <TextInput 
                    style={[styles.bioInput, { color: theme.text }]} 
                    value={bioData.height}
                    onChangeText={(t) => setBioData({...bioData, height: t})}
                  />
                  <Text style={styles.bioSublabel}>CENTIMETERS</Text>
                </View>
              </View>

              <View style={styles.bioFullInput}>
                <Text style={styles.bioLabel}>PRIMARY OBJECTIVE</Text>
                <TextInput 
                  style={[styles.bioInput, { color: theme.text }]} 
                  value={bioData.goal}
                  onChangeText={(t) => setBioData({...bioData, goal: t})}
                />
              </View>

              <View style={styles.bioFullInput}>
                <Text style={styles.bioLabel}>NEURAL BIO</Text>
                <TextInput 
                  style={[styles.bioArea, { color: theme.text }]} 
                  value={bioData.bio}
                  multiline
                  numberOfLines={3}
                  onChangeText={(t) => setBioData({...bioData, bio: t})}
                />
              </View>

              <TouchableOpacity 
                style={[styles.saveBioBtn, { backgroundColor: theme.tint }]}
                onPress={() => setIsBioVisible(false)}
              >
                <Text style={styles.saveBioText}>SYNC INFORMATION</Text>
              </TouchableOpacity>
            </GlassCard>
          </AnimatedView>
        </TouchableOpacity>
      </Modal>
      
      {/* Subscription Modal Implementation */}
      <Modal
        visible={isSubVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSubVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsSubVisible(false)}
        >
          <AnimatedView entering={FadeInUp.springify()} style={styles.modalWrapper}>
            <GlassCard style={styles.modalCard} intensity={50}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Elite Subscription</Text>
                <TouchableOpacity onPress={() => setIsSubVisible(false)}>
                  <X size={20} color={theme.textMuted} />
                </TouchableOpacity>
              </View>

              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.planBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Crown size={24} color="#FFF" />
                <View>
                  <Text style={styles.planTitle}>ELITE PRO PLAN</Text>
                  <Text style={styles.planSub}>Next Billing: April 24, 2026</Text>
                </View>
              </LinearGradient>

              <View style={styles.featureList}>
                <Text style={styles.featureHeader}>UNLOCKED FEATURES</Text>
                <View style={styles.featureItem}>
                  <Check size={16} color="#10B981" />
                  <Text style={[styles.featureText, { color: theme.text }]}>Real-time Macro Neural Analysis</Text>
                </View>
                <View style={styles.featureItem}>
                  <Check size={16} color="#10B981" />
                  <Text style={[styles.featureText, { color: theme.text }]}>Exclusive 4K Training Workflows</Text>
                </View>
                <View style={styles.featureItem}>
                  <Check size={16} color="#10B981" />
                  <Text style={[styles.featureText, { color: theme.text }]}>Unlimited Photo AI Scanning</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.manageBtn, { borderColor: theme.tint }]}
                onPress={() => setIsSubVisible(false)}
              >
                <CreditCard size={18} color={theme.tint} />
                <Text style={[styles.manageText, { color: theme.tint }]}>MANAGE PAYMENT METHODS</Text>
              </TouchableOpacity>
            </GlassCard>
          </AnimatedView>
        </TouchableOpacity>
      </Modal>

      {/* System Preferences Modal Implementation */}
      <Modal
        visible={isSettingsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsSettingsVisible(false)}
        >
          <AnimatedView entering={FadeInUp.springify()} style={styles.modalWrapper}>
            <GlassCard style={styles.modalCard} intensity={50}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>{activeCategory}</Text>
                  <Text style={styles.modalSub}>NEURAL PROTOCOL ACTIVE</Text>
                </View>
                <TouchableOpacity onPress={() => setIsSettingsVisible(false)}>
                  <X size={20} color={theme.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={styles.settingsList}>
                {activeCategory === 'Smart Notifications' && (
                  <>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>Workout Reminders</Text>
                        <Text style={styles.settingDesc}>Get pings for scheduled training</Text>
                      </View>
                      <View style={[styles.toggleActive, { backgroundColor: '#10B981' }]} />
                    </View>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>Meal Tracking Alerts</Text>
                        <Text style={styles.settingDesc}>Nudges to log your macro intake</Text>
                      </View>
                      <View style={[styles.toggleActive, { backgroundColor: '#10B981' }]} />
                    </View>
                  </>
                )}

                {activeCategory === 'Privacy Neural Link' && (
                  <>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>Biometric Encryption</Text>
                        <Text style={styles.settingDesc}>Secure facial/fingerprint lock</Text>
                      </View>
                      <View style={[styles.toggleActive, { backgroundColor: '#10B981' }]} />
                    </View>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>Anonymous Neural Sync</Text>
                        <Text style={styles.settingDesc}>Sync data without ID tracking</Text>
                      </View>
                      <View style={[styles.toggleInactive, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                    </View>
                  </>
                )}

                {activeCategory === 'Advanced Protocol' && (
                  <>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>Haptic Engagement</Text>
                        <Text style={styles.settingDesc}>Tactile feedback for interactions</Text>
                      </View>
                      <View style={[styles.toggleActive, { backgroundColor: '#10B981' }]} />
                    </View>
                    <View style={styles.settingRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.settingText, { color: theme.text }]}>High-Performance Video</Text>
                        <Text style={styles.settingDesc}>Enable 4K 60FPS workout renders</Text>
                      </View>
                      <View style={[styles.toggleActive, { backgroundColor: '#10B981' }]} />
                    </View>
                  </>
                )}
              </View>

              <TouchableOpacity 
                style={[styles.saveBioBtn, { backgroundColor: theme.tint, marginTop: 40 }]}
                onPress={() => setIsSettingsVisible(false)}
              >
                <Text style={styles.saveBioText}>UPDATE PREFERENCES</Text>
              </TouchableOpacity>
            </GlassCard>
          </AnimatedView>
        </TouchableOpacity>
      </Modal>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedView entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.avatarWrapper}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.avatarInner, { backgroundColor: isLight ? '#FFF' : '#09090B' }]}>
                <UserIcon size={48} color={theme.tint} />
              </View>
            </LinearGradient>
            <View style={[styles.onlineBadge, { backgroundColor: '#10B981', borderColor: isLight ? '#FFF' : '#09090B' }]} />
          </View>
          
          <View style={styles.userInfo}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={[styles.nameInput, { color: theme.text, backgroundColor: 'rgba(255,255,255,0.05)' }]}
                  value={tempName}
                  onChangeText={setTempName}
                  autoFocus
                  placeholderTextColor={theme.textMuted}
                />
                <TouchableOpacity onPress={handleSaveName} style={styles.saveBtn}>
                  <Check size={20} color="#10B981" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.cancelBtn}>
                  <X size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.nameRow}>
                <Text style={[styles.userName, { color: theme.text }]}>{userName}</Text>
                <TouchableOpacity onPress={() => { setTempName(userName); setIsEditing(true); }} style={styles.editIconBtn}>
                  <Edit2 size={16} color={theme.textMuted} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={[styles.memberBadge, { backgroundColor: `${theme.tint}15` }]}>
              <Crown size={14} color={theme.tint} />
              <Text style={[styles.memberText, { color: theme.tint }]}>ELITE PRO MEMBER</Text>
            </TouchableOpacity>
          </View>
        </AnimatedView>

        {/* Global Statistics Card */}
        <AnimatedView entering={FadeInDown.delay(200)}>
          <GlassCard style={styles.statsCard} intensity={40}>
            <View style={styles.statBox}>
              <Flame size={20} color={Colors.gradients.flame[0]} />
              <Text style={[styles.statValue, { color: theme.text }]}>124</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>STREAK</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Star size={20} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.statValue, { color: theme.text }]}>8.4k</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>XP</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Zap size={20} color={theme.tint} fill={theme.tint} />
              <Text style={[styles.statValue, { color: theme.text }]}>42</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>LEVEL</Text>
            </View>
          </GlassCard>
        </AnimatedView>

        {/* Action Menus */}
        <View style={styles.menuSections}>
          <AnimatedView entering={FadeInUp.delay(300)}>
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>ACCOUNT ECOSYSTEM</Text>
            <GlassCard style={styles.menuGroup} intensity={25}>
              <ProfileItem icon={UserIcon} title="Bio Information" />
              <ProfileItem icon={CreditCard} title="Subscription & Billing" />
              <ProfileItem icon={Award} title="Achievements & Milestones" isLast />
            </GlassCard>
          </AnimatedView>

          <AnimatedView entering={FadeInUp.delay(400)}>
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>SYSTEM PREFERENCES</Text>
            <GlassCard style={styles.menuGroup} intensity={25}>
              <ProfileItem icon={Bell} title="Smart Notifications" />
              <ProfileItem icon={Shield} title="Privacy Neural Link" />
              <ProfileItem icon={Settings} title="Advanced Protocol" isLast />
            </GlassCard>
          </AnimatedView>

          <AnimatedView entering={FadeInUp.delay(500)}>
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>RESOURCES</Text>
            <GlassCard style={styles.menuGroup} intensity={20}>
              <ProfileItem icon={HelpCircle} title="Support Matrix" />
              <ProfileItem icon={Share2} title="Link with Friends" isLast />
            </GlassCard>
          </AnimatedView>

          <AnimatedView entering={FadeInUp.delay(600)}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.8}>
              <GlassCard style={styles.logoutCard} intensity={15}>
                <LogOut size={22} color="#EF4444" />
                <Text style={styles.logoutText}>TERMINATE SESSION</Text>
              </GlassCard>
            </TouchableOpacity>
          </AnimatedView>
        </View>

        <Text style={[styles.versionText, { color: theme.textMuted }]}>NEURALFIT V1.2.0 • REL_240401</Text>
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  avatarWrapper: { position: 'relative' },
  avatarGradient: { width: 100, height: 100, borderRadius: 36, padding: 3 },
  avatarInner: { width: '100%', height: '100%', borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  onlineBadge: { position: 'absolute', bottom: -2, right: -2, width: 24, height: 24, borderRadius: 12, borderWidth: 4 },
  userInfo: { marginLeft: 24, gap: 8, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  userName: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  editIconBtn: { padding: 4 },
  editContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nameInput: { 
    flex: 1, 
    fontSize: 18, 
    fontWeight: '700', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  saveBtn: { padding: 8 },
  cancelBtn: { padding: 8 },
  memberBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start' },
  memberText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  statsCard: { flexDirection: 'row', padding: 24, marginBottom: 40, marginVertical: 0, justifyContent: 'space-between', borderRadius: 32 },
  statBox: { flex: 1, alignItems: 'center', gap: 6 },
  statValue: { fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  statLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  statDivider: { width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'center' },
  menuSections: { gap: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 16, marginTop: 8, opacity: 0.6 },
  menuGroup: { padding: 4, marginBottom: 32, marginVertical: 0, borderRadius: 24 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 18 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { flex: 1, marginLeft: 16, fontSize: 16, fontWeight: '700', letterSpacing: -0.3 },
  logoutBtn: { marginTop: 16 },
  logoutCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, marginVertical: 0, borderRadius: 24 },
  logoutText: { color: '#EF4444', fontSize: 14, fontWeight: '900', letterSpacing: 1.5 },
  versionText: { textAlign: 'center', fontSize: 11, marginTop: 40, fontWeight: '700', letterSpacing: 1, opacity: 0.4 },
  
  // Modal & Bio Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 450,
  },
  modalCard: {
    padding: 32,
    borderRadius: 32,
    marginVertical: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  bioGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  bioInputGroup: {
    flex: 1,
    gap: 4,
  },
  bioLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#94A3B8',
    marginBottom: 4,
  },
  bioInput: {
    fontSize: 20,
    fontWeight: '900',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  bioSublabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    marginTop: 4,
  },
  bioFullInput: {
    marginBottom: 24,
    gap: 4,
  },
  bioArea: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveBioBtn: {
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  saveBioText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  
  // Subscription Specific Styles
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
  },
  planTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  planSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  featureList: {
    gap: 16,
    marginBottom: 32,
  },
  featureHeader: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#94A3B8',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  manageText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modalSub: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#34D399',
    marginTop: 2,
  },
  settingsList: {
    gap: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  toggleActive: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  toggleInactive: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
