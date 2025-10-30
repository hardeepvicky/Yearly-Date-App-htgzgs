
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const { isDarkMode } = useThemeContext();
  const colors = getThemedColors(isDarkMode);
  const styles = createStyles(colors);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ padding: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol name="lock.fill" size={48} color={colors.primary} />
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>Last Updated: January 2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            We collect information you provide directly to us, including:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Profile information (name, age, photos, bio)</Text>
            <Text style={styles.bulletItem}>• Location data for matching purposes</Text>
            <Text style={styles.bulletItem}>• Messages and interactions with other users</Text>
            <Text style={styles.bulletItem}>• Device information and usage data</Text>
            <Text style={styles.bulletItem}>• Payment information for subscriptions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            We use the information we collect to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Provide and improve our dating services</Text>
            <Text style={styles.bulletItem}>• Match you with compatible users</Text>
            <Text style={styles.bulletItem}>• Enable communication between users</Text>
            <Text style={styles.bulletItem}>• Process payments and subscriptions</Text>
            <Text style={styles.bulletItem}>• Ensure safety and prevent fraud</Text>
            <Text style={styles.bulletItem}>• Send notifications and updates</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.paragraph}>
            We share your information only in the following circumstances:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• With other users as part of your profile</Text>
            <Text style={styles.bulletItem}>• With service providers who assist our operations</Text>
            <Text style={styles.bulletItem}>• When required by law or legal process</Text>
            <Text style={styles.bulletItem}>• To protect rights, safety, and security</Text>
          </View>
          <Text style={styles.paragraph}>
            We do not sell your personal information to third parties.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Location Data</Text>
          <Text style={styles.paragraph}>
            We collect and use your location data to show you potential matches nearby. 
            You can control location permissions through your device settings. Disabling 
            location services may limit app functionality.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your information, 
            including encryption, secure servers, and regular security audits. However, 
            no method of transmission over the internet is 100% secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Your Rights and Choices</Text>
          <Text style={styles.paragraph}>
            You have the right to:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Access and update your personal information</Text>
            <Text style={styles.bulletItem}>• Delete your account and associated data</Text>
            <Text style={styles.bulletItem}>• Opt-out of marketing communications</Text>
            <Text style={styles.bulletItem}>• Control location and notification permissions</Text>
            <Text style={styles.bulletItem}>• Request a copy of your data</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your information for as long as your account is active or as needed 
            to provide services. When you delete your account, we will delete or anonymize 
            your personal information within 30 days, except where required by law.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Children&apos;s Privacy</Text>
          <Text style={styles.paragraph}>
            Our service is not intended for users under 18 years of age. We do not 
            knowingly collect information from children. If we discover that a child 
            has provided us with personal information, we will delete it immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. International Data Transfers</Text>
          <Text style={styles.paragraph}>
            Your information may be transferred to and processed in countries other than 
            your own. We ensure appropriate safeguards are in place to protect your data 
            in accordance with this privacy policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this privacy policy from time to time. We will notify you of 
            any material changes by posting the new policy on this page and updating the 
            &quot;Last Updated&quot; date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions about this privacy policy or our data practices, 
            please contact us:
          </Text>
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <IconSymbol name="building.2" size={20} color={colors.primary} />
              <Text style={styles.contactText}>icybervalley</Text>
            </View>
            <View style={styles.contactRow}>
              <IconSymbol name="globe" size={20} color={colors.primary} />
              <Text style={styles.contactText}>www.icybervalley.com</Text>
            </View>
            <View style={styles.contactRow}>
              <IconSymbol name="envelope" size={20} color={colors.primary} />
              <Text style={styles.contactText}>hardeepvicky1@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using our app, you agree to this privacy policy and our terms of service.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
      paddingTop: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    paragraph: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 12,
    },
    bulletList: {
      marginLeft: 8,
      marginTop: 8,
    },
    bulletItem: {
      fontSize: 15,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 6,
    },
    contactCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginTop: 12,
      gap: 12,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    contactText: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    footer: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginTop: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    footerText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
      fontStyle: 'italic',
    },
  });
