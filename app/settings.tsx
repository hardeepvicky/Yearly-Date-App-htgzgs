
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'India',
  'China',
  'Japan',
  'Brazil',
  'Mexico',
  'Other',
];

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
      paddingLeft: 4,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    settingItemPressed: {
      opacity: 0.7,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      marginRight: 12,
    },
    settingTextContainer: {
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    pickerContainer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 12,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    picker: {
      color: colors.text,
      backgroundColor: colors.card,
    },
    deleteButton: {
      backgroundColor: '#ff3b30',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    deleteButtonPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    chevron: {
      marginLeft: 8,
    },
  });

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeContext();
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const router = useRouter();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);

  const handleThemeToggle = (value: boolean) => {
    toggleTheme();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirm Delete',
              'This will permanently delete your account and all your data. Are you absolutely sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes, Delete',
                  style: 'destructive',
                  onPress: () => {
                    console.log('Account deleted');
                    Alert.alert('Success', 'Your account has been deleted.');
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleBlockedUsers = () => {
    router.push('/blocked-users');
  };

  const handleSubscription = () => {
    router.push('/subscription');
  };

  const handleHelpSupport = () => {
    router.push('/help-support');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Appearance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <IconSymbol
                  name={theme === 'dark' ? 'dark-mode' : 'light-mode'}
                  size={24}
                  color={colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    {theme === 'dark' ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={theme === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCountry}
                onValueChange={(itemValue) => setSelectedCountry(itemValue)}
                style={styles.picker}
              >
                {COUNTRIES.map((country) => (
                  <Picker.Item key={country} label={country} value={country} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Account Management */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                pressed && styles.settingItemPressed,
              ]}
              onPress={handleBlockedUsers}
            >
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="block"
                  size={24}
                  color={colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Blocked Users</Text>
                  <Text style={styles.settingDescription}>
                    Manage blocked users
                  </Text>
                </View>
              </View>
              <IconSymbol
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
                style={styles.chevron}
              />
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                pressed && styles.settingItemPressed,
              ]}
              onPress={handleSubscription}
            >
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="card-membership"
                  size={24}
                  color={colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Subscription</Text>
                  <Text style={styles.settingDescription}>
                    Manage your subscription
                  </Text>
                </View>
              </View>
              <IconSymbol
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
                style={styles.chevron}
              />
            </Pressable>
          </View>

          {/* Help & Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>

            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                pressed && styles.settingItemPressed,
              ]}
              onPress={handleHelpSupport}
            >
              <View style={styles.settingLeft}>
                <IconSymbol
                  name="help"
                  size={24}
                  color={colors.primary}
                  style={styles.settingIcon}
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Help & Support</Text>
                  <Text style={styles.settingDescription}>
                    Get help and contact support
                  </Text>
                </View>
              </View>
              <IconSymbol
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
                style={styles.chevron}
              />
            </Pressable>
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
