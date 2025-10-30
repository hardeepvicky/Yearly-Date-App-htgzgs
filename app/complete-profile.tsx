
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

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
    },
    section: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dateButton: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateButtonText: {
      fontSize: 16,
      color: colors.text,
    },
    pickerContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    picker: {
      color: colors.text,
    },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    continueButtonDisabled: {
      opacity: 0.5,
    },
  });

export default function CompleteProfileScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const storedInfo = await AsyncStorage.getItem('tempUserInfo');
      if (storedInfo) {
        const info = JSON.parse(storedInfo);
        setUserInfo(info);
        if (info.name) setName(info.name);
        if (info.gender) setGender(info.gender);
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isFormValid = () => {
    return name.trim() !== '' && dateOfBirth !== null && gender !== '';
  };

  const handleContinue = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      // Calculate age from date of birth
      const today = new Date();
      const birthDate = dateOfBirth!;
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        Alert.alert('Error', 'You must be at least 18 years old to use this app');
        return;
      }

      // Update user info
      const updatedInfo = {
        ...userInfo,
        name,
        dateOfBirth: dateOfBirth.toISOString(),
        gender,
        age,
      };

      await AsyncStorage.setItem('tempUserInfo', JSON.stringify(updatedInfo));

      // Navigate to photo upload
      router.push('/photo-upload');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile information');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Complete Your Profile',
          headerBackVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us get to know you better
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date of Birth *</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(dateOfBirth)}</Text>
            <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth || new Date(2000, 0, 1)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1940, 0, 1)}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Gender *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <Pressable
          style={[
            styles.continueButton,
            !isFormValid() && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!isFormValid()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
