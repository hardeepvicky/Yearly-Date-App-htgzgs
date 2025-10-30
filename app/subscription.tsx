
import React from 'react';
import { IconSymbol } from '@/components/IconSymbol';
import { Stack, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';

export default function SubscriptionScreen() {
  const router = useRouter();
  const { isDarkMode } = useThemeContext();
  const colors = getThemedColors(isDarkMode);

  const handleSubscribe = () => {
    Alert.alert(
      'Subscribe',
      'Subscribe to Premium for $5/year?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: () => {
            console.log('Subscription initiated');
            Alert.alert('Success', 'Welcome to Premium! 🎉');
            router.back();
          },
        },
      ]
    );
  };

  const styles = createStyles(colors);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Premium Subscription',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          presentation: 'card',
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol name="star.fill" size={80} color={colors.accent} />
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Text style={styles.subtitle}>Unlock all features and find your perfect match!</Text>
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Yearly Subscription</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceAmount}>$5</Text>
            <Text style={styles.pricePeriod}>/year</Text>
          </View>
          <Text style={styles.priceDescription}>
            Less than $0.42 per month!
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Premium Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="heart.fill" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Unlimited Likes</Text>
              <Text style={styles.featureDescription}>
                Like as many profiles as you want without any restrictions
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="eye.fill" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>See Who Likes You</Text>
              <Text style={styles.featureDescription}>
                View everyone who has liked your profile instantly
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="video.fill" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Video Chat Access</Text>
              <Text style={styles.featureDescription}>
                Connect face-to-face with your matches through video calls
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="sparkles" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Priority Matching</Text>
              <Text style={styles.featureDescription}>
                Get shown to more people and increase your match rate
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="arrow.uturn.backward" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Rewind Swipes</Text>
              <Text style={styles.featureDescription}>
                Undo accidental left swipes and get a second chance
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="xmark.circle.fill" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Ad-Free Experience</Text>
              <Text style={styles.featureDescription}>
                Enjoy the app without any interruptions or advertisements
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.guaranteeBox}>
          <IconSymbol name="checkmark.shield.fill" size={32} color={colors.success} />
          <Text style={styles.guaranteeText}>
            Cancel anytime. No hidden fees. Secure payment.
          </Text>
        </View>

        <Pressable style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>Subscribe Now - $5/year</Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Maybe Later</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription automatically renews unless cancelled at least 24 hours before
          the end of the current period.
        </Text>
      </ScrollView>
    </>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: Platform.OS === 'android' ? 100 : 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  priceCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 8px 24px rgba(233, 30, 99, 0.2)',
    elevation: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.primary,
  },
  pricePeriod: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.success,
  },
  guaranteeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 20,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    boxShadow: '0px 4px 16px rgba(233, 30, 99, 0.3)',
    elevation: 4,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 8,
  },
});
