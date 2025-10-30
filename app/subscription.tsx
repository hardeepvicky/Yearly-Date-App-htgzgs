
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';

export default function SubscriptionScreen() {
  const router = useRouter();

  const handleSubscribe = () => {
    Alert.alert(
      'Subscribe to Premium',
      'You are about to subscribe to the yearly plan for $5.00/year. This is a demo - payment integration would be handled through your payment provider.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            console.log('Subscription initiated: yearly plan - $5.00');
            Alert.alert('Success! 🎉', 'Welcome to Premium!', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Premium Subscription',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          presentation: 'modal',
        }}
      />
      <ScrollView
        style={[commonStyles.container, styles.container]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol name="star.fill" size={64} color={colors.accent} />
          <Text style={styles.title}>Unlock Premium Features</Text>
          <Text style={styles.subtitle}>
            Get the most out of your dating experience
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="heart.fill" size={28} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Unlimited Likes</Text>
              <Text style={styles.featureDescription}>
                Like as many profiles as you want without restrictions
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="eye.fill" size={28} color={colors.secondary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>See Who Likes You</Text>
              <Text style={styles.featureDescription}>
                Know who&apos;s interested before you swipe
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="video.fill" size={28} color={colors.accent} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Video Chat</Text>
              <Text style={styles.featureDescription}>
                Connect face-to-face with your matches
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="location.fill" size={28} color={colors.highlight} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Advanced Filters</Text>
              <Text style={styles.featureDescription}>
                Find exactly what you&apos;re looking for
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="bolt.fill" size={28} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Priority Likes</Text>
              <Text style={styles.featureDescription}>
                Your profile gets shown first to others
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="xmark.circle.fill" size={28} color={colors.textSecondary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Ad-Free Experience</Text>
              <Text style={styles.featureDescription}>
                Enjoy uninterrupted browsing
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.plansContainer}>
          <Text style={styles.plansTitle}>Premium Plan</Text>

          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>Yearly Plan</Text>
                <Text style={styles.planSavings}>Best Value!</Text>
              </View>
              <View style={styles.planPriceContainer}>
                <Text style={styles.planPrice}>$5.00</Text>
                <Text style={styles.planPeriod}>/year</Text>
              </View>
            </View>
            <Text style={styles.planDetails}>Just $0.42 per month</Text>
            <View style={styles.selectedBadge}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
            </View>
          </View>
        </View>

        <Pressable style={buttonStyles.primaryButton} onPress={handleSubscribe}>
          <Text style={buttonStyles.buttonText}>
            Subscribe - $5.00/year
          </Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          Subscription automatically renews unless auto-renew is turned off at least 24 hours
          before the end of the current period. Cancel anytime in your account settings.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
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
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  plansContainer: {
    marginBottom: 24,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    position: 'relative',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  planSavings: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  planPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  planPeriod: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  planDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 16,
  },
});
