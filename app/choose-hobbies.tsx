
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HOBBIES = [
  'Hiking',
  'Coffee',
  'Travel',
  'Photography',
  'Yoga',
  'Cooking',
  'Music',
  'Art',
  'Dogs',
  'Wine',
  'Reading',
  'Dancing',
  'Fitness',
  'Technology',
  'Running',
  'Startups',
  'Fashion',
  'Design',
  'Shopping',
  'Cocktails',
  'Law',
  'Writing',
  'Poetry',
  'Movies',
  'Gaming',
  'Sports',
  'Cycling',
  'Swimming',
  'Meditation',
  'Volunteering',
  'Painting',
  'Singing',
  'Guitar',
  'Piano',
  'Camping',
  'Fishing',
  'Surfing',
  'Skiing',
  'Snowboarding',
  'Rock Climbing',
];

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
    },
    header: {
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    infoBox: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    hobbiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 30,
    },
    hobbyChip: {
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.border,
    },
    hobbyChipSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    hobbyText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    hobbyTextSelected: {
      color: '#FFFFFF',
    },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    continueButtonDisabled: {
      opacity: 0.5,
    },
    skipButton: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 40,
    },
    skipButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
  });

export default function ChooseHobbiesScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      if (selectedHobbies.length >= 10) {
        Alert.alert('Limit Reached', 'You can select up to 10 hobbies');
        return;
      }
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleContinue = async () => {
    if (selectedHobbies.length === 0) {
      Alert.alert('No Hobbies Selected', 'Please select at least one hobby to continue');
      return;
    }

    setLoading(true);
    try {
      // Get user profile
      const storedProfile = await AsyncStorage.getItem('userProfile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);

        // Update profile with hobbies
        const updatedProfile = {
          ...profile,
          hobbies: selectedHobbies,
        };

        // Save updated profile
        await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));

        // Navigate to main app
        Alert.alert('Success', 'Your hobbies have been saved!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/(home)/'),
          },
        ]);
      }
    } catch (error) {
      console.error('Error saving hobbies:', error);
      Alert.alert('Error', 'Failed to save hobbies');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Hobbies?',
      'You can always add hobbies later from your settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip',
          onPress: () => router.replace('/(tabs)/(home)/'),
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Choose Your Hobbies',
          headerBackVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Hobbies</Text>
          <Text style={styles.subtitle}>
            Select hobbies that interest you. This helps us find better matches for you!
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Select up to 10 hobbies that best represent your interests
          </Text>
        </View>

        <View style={styles.hobbiesGrid}>
          {HOBBIES.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <Pressable
                key={hobby}
                style={[
                  styles.hobbyChip,
                  isSelected && styles.hobbyChipSelected,
                ]}
                onPress={() => toggleHobby(hobby)}
              >
                <Text
                  style={[
                    styles.hobbyText,
                    isSelected && styles.hobbyTextSelected,
                  ]}
                >
                  {hobby}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[
            styles.continueButton,
            (selectedHobbies.length === 0 || loading) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedHobbies.length === 0 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>
              Continue ({selectedHobbies.length} selected)
            </Text>
          )}
        </Pressable>

        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
