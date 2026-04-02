import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Dimensions } from 'react-native';
import { Text } from '@/components/Themed';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Activity, Zap, Target, CheckCircle } from 'lucide-react-native';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const theme = Colors[colorScheme];
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Activity size={64} color={theme.tint} />,
      title: 'Welcome to NeuralFit',
      description: 'Your AI-powered fitness companion. Let\'s get you started!',
    },
    {
      icon: <Zap size={64} color={theme.success} />,
      title: 'Personalized Workouts',
      description: 'Get ML-generated workouts tailored to your fitness level and goals.',
    },
    {
      icon: <Target size={64} color="#f59e0b" />,
      title: 'Track Your Progress',
      description: 'Monitor calories, steps, workouts, and reach your fitness goals.',
    },
    {
      icon: <CheckCircle size={64} color={theme.tint} />,
      title: 'Ready to Begin?',
      description: 'Customize your profile and start your fitness journey today!',
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View entering={FadeIn} style={styles.header}>
        <Text style={[styles.stepCounter, { color: theme.tabIconDefault }]}>
          {step + 1} / {steps.length}
        </Text>
        {step > 0 && (
          <Pressable onPress={() => setStep(step - 1)}>
            <Text style={[styles.skipButton, { color: theme.tint }]}>Back</Text>
          </Pressable>
        )}
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.iconContainer}>
          {currentStep.icon}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{currentStep.title}</Text>
          <Text style={[styles.description, { color: theme.tabIconDefault }]}>
            {currentStep.description}
          </Text>
        </Animated.View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {steps.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setStep(index)}
              style={[
                styles.dot,
                {
                  backgroundColor: index === step ? theme.tint : theme.border,
                  width: index === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {step < steps.length - 1 && (
          <Pressable onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.tabIconDefault }]}>Skip</Text>
          </Pressable>
        )}
        <PrimaryButton
          title={step === steps.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  stepCounter: {
    fontSize: 14,
    fontWeight: '600',
  },
  skipButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    paddingBottom: 40,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
