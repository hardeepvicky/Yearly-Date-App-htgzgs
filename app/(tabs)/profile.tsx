
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push('/subscription');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings feature coming soon!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Profile',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerRight: () => (
              <Pressable onPress={handleSettings} style={{ padding: 8 }}>
                <IconSymbol name="gear" size={24} color={colors.text} />
              </Pressable>
            ),
          }}
        />
      )}
      <ScrollView
        style={[commonStyles.container, styles.container]}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS === 'android' && styles.scrollContentAndroid,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.age}>32 years old</Text>
          <Pressable style={styles.editButton} onPress={handleEditProfile}>
            <IconSymbol name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.premiumCard}>
          <View style={styles.premiumHeader}>
            <IconSymbol name="star.fill" size={32} color={colors.accent} />
            <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
          </View>
          <Text style={styles.premiumDescription}>
            Get unlimited likes, see who likes you, and unlock exclusive features!
          </Text>
          <View style={styles.premiumFeatures}>
            <View style={styles.featureRow}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Unlimited Likes</Text>
            </View>
            <View style={styles.featureRow}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
              <Text style={styles.featureText}>See Who Likes You</Text>
            </View>
            <View style={styles.featureRow}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Video Chat Access</Text>
            </View>
            <View style={styles.featureRow}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
              <Text style={styles.featureText}>Ad-Free Experience</Text>
            </View>
          </View>
          <Pressable style={buttonStyles.primaryButton} onPress={handleSubscribe}>
            <Text style={buttonStyles.buttonText}>Subscribe Now - $99.99/year</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Pressable style={styles.menuItem} onPress={handleSettings}>
            <IconSymbol name="gear" size={24} color={colors.text} />
            <Text style={styles.menuText}>Settings</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={() => Alert.alert('Help', 'Help & Support coming soon!')}
          >
            <IconSymbol name="questionmark.circle" size={24} color={colors.text} />
            <Text style={styles.menuText}>Help & Support</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={() => Alert.alert('Privacy', 'Privacy Policy coming soon!')}
          >
            <IconSymbol name="lock.fill" size={24} color={colors.text} />
            <Text style={styles.menuText}>Privacy Policy</Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentAndroid: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  premiumCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  premiumDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 22,
  },
  premiumFeatures: {
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.highlight,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.highlight,
  },
});
