
import React, { useState } from 'react';
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
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { Picker } from '@react-native-picker/picker';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';

const COUNTRIES = [
  { label: 'Select Country', value: '' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Spain', value: 'ES' },
  { label: 'Italy', value: 'IT' },
  { label: 'Japan', value: 'JP' },
  { label: 'China', value: 'CN' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Mexico', value: 'MX' },
  { label: 'South Korea', value: 'KR' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Norway', value: 'NO' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Finland', value: 'FI' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'Austria', value: 'AT' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Poland', value: 'PL' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Greece', value: 'GR' },
  { label: 'Turkey', value: 'TR' },
  { label: 'Russia', value: 'RU' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Chile', value: 'CL' },
  { label: 'Colombia', value: 'CO' },
  { label: 'Peru', value: 'PE' },
  { label: 'Thailand', value: 'TH' },
  { label: 'Vietnam', value: 'VN' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Philippines', value: 'PH' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Ireland', value: 'IE' },
  { label: 'Czech Republic', value: 'CZ' },
  { label: 'Hungary', value: 'HU' },
  { label: 'Romania', value: 'RO' },
  { label: 'Ukraine', value: 'UA' },
  { label: 'Israel', value: 'IL' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'Egypt', value: 'EG' },
  { label: 'Nigeria', value: 'NG' },
  { label: 'Kenya', value: 'KE' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, isDarkMode, setThemeMode } = useThemeContext();
  const colors = getThemedColors(isDarkMode);
  
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleThemeToggle = (value: boolean) => {
    setThemeMode(value ? 'dark' : 'light');
    console.log('Theme toggled to:', value ? 'dark' : 'light');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.',
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
              'Confirm Deletion',
              'Please type DELETE to confirm account deletion',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Confirm',
                  style: 'destructive',
                  onPress: () => {
                    console.log('Account deletion confirmed');
                    Alert.alert(
                      'Account Deleted',
                      'Your account has been permanently deleted. You will now be logged out.',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            router.replace('/(tabs)/(home)/');
                          },
                        },
                      ]
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleCountrySelect = () => {
    if (selectedCountry) {
      const country = COUNTRIES.find(c => c.value === selectedCountry);
      Alert.alert('Country Selected', `You selected: ${country?.label}`);
    }
  };

  const styles = createStyles(colors);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ padding: 8, marginLeft: Platform.OS === 'ios' ? 0 : 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol 
                  name={isDarkMode ? 'moon.fill' : 'sun.max.fill'} 
                  size={24} 
                  color={colors.primary} 
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    {themeMode === 'system' ? 'Following system' : isDarkMode ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : isDarkMode ? colors.primary : '#f4f3f4'}
                ios_backgroundColor={colors.border}
              />
            </View>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingColumn}>
              <View style={styles.settingHeader}>
                <IconSymbol name="globe" size={24} color={colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Country</Text>
                  <Text style={styles.settingDescription}>
                    Select your country
                  </Text>
                </View>
              </View>
              
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={(itemValue) => {
                    setSelectedCountry(itemValue);
                    console.log('Country selected:', itemValue);
                  }}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor={colors.text}
                >
                  {COUNTRIES.map((country) => (
                    <Picker.Item
                      key={country.value}
                      label={country.label}
                      value={country.value}
                      color={colors.text}
                    />
                  ))}
                </Picker>
              </View>

              {selectedCountry !== '' && (
                <Text style={styles.selectedCountryText}>
                  Selected: {COUNTRIES.find(c => c.value === selectedCountry)?.label}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          
          <Pressable
            style={styles.settingCard}
            onPress={() => Alert.alert('Privacy Settings', 'Privacy settings coming soon!')}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="lock.fill" size={24} color={colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Privacy Settings</Text>
                  <Text style={styles.settingDescription}>
                    Manage your privacy preferences
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </Pressable>

          <Pressable
            style={styles.settingCard}
            onPress={() => Alert.alert('Blocked Users', 'Blocked users list coming soon!')}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="hand.raised.fill" size={24} color={colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Blocked Users</Text>
                  <Text style={styles.settingDescription}>
                    Manage blocked accounts
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </Pressable>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <Pressable
            style={styles.settingCard}
            onPress={() => Alert.alert('Notifications', 'Notification settings coming soon!')}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="bell.fill" size={24} color={colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Manage notification preferences
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </Pressable>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Pressable
            style={styles.settingCard}
            onPress={() => Alert.alert('Account Info', 'Account information coming soon!')}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="person.circle.fill" size={24} color={colors.primary} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Account Information</Text>
                  <Text style={styles.settingDescription}>
                    View and edit your account details
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </Pressable>

          <Pressable
            style={styles.settingCard}
            onPress={() => Alert.alert('Subscription', 'Subscription management coming soon!')}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="star.fill" size={24} color={colors.accent} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Subscription</Text>
                  <Text style={styles.settingDescription}>
                    Manage your premium subscription
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </Pressable>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.dangerSectionTitle}>Danger Zone</Text>
          
          <Pressable
            style={styles.deleteCard}
            onPress={handleDeleteAccount}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <IconSymbol name="trash.fill" size={24} color={colors.danger} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.deleteTitle}>Delete Account</Text>
                  <Text style={styles.deleteDescription}>
                    Permanently delete your account and all data
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.danger} />
            </View>
          </Pressable>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Dating App v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 All rights reserved</Text>
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 100 : 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  dangerSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.danger,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  deleteCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    boxShadow: '0px 2px 8px rgba(255, 0, 0, 0.1)',
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingColumn: {
    flexDirection: 'column',
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
    marginBottom: 2,
  },
  deleteDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  pickerContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
    width: '100%',
    color: colors.text,
  },
  pickerItem: {
    fontSize: 16,
    color: colors.text,
  },
  selectedCountryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  appInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
});
