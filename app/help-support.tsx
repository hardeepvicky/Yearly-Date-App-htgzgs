
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Stack, useRouter } from 'expo-router';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    companyName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 15,
    },
    infoCard: {
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
    infoLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    actionButtonPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
    actionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    actionIcon: {
      marginRight: 12,
    },
    actionTextContainer: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 2,
    },
    actionSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    chevron: {
      marginLeft: 8,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 20,
    },
    footerText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    version: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 8,
    },
  });

export default function HelpSupportScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();

  const handleOpenWebsite = async () => {
    const url = 'https://www.icybervalley.com';
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open website');
    }
  };

  const handleEmailDeveloper = async () => {
    const email = 'hardeepvicky1@gmail.com';
    const subject = 'Support Request - Dating App';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open email client');
    }
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Choose how you would like to contact us:',
      [
        {
          text: 'Email',
          onPress: handleEmailDeveloper,
        },
        {
          text: 'Visit Website',
          onPress: handleOpenWebsite,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Help & Support',
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
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.companyName}>icybervalley</Text>
            <Text style={styles.tagline}>
              Connecting hearts, creating stories
            </Text>
          </View>

          {/* Company Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Company Name</Text>
              <Text style={styles.infoValue}>icybervalley</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>www.icybervalley.com</Text>
            </View>
          </View>

          {/* Developer Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developer Information</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>Hardeep Singh</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>hardeepvicky1@gmail.com</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get Help</Text>

            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={handleOpenWebsite}
            >
              <View style={styles.actionContent}>
                <IconSymbol
                  name="language"
                  size={24}
                  color={colors.primary}
                  style={styles.actionIcon}
                />
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Visit Website</Text>
                  <Text style={styles.actionSubtitle}>
                    www.icybervalley.com
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
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={handleEmailDeveloper}
            >
              <View style={styles.actionContent}>
                <IconSymbol
                  name="email"
                  size={24}
                  color={colors.primary}
                  style={styles.actionIcon}
                />
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Email Developer</Text>
                  <Text style={styles.actionSubtitle}>
                    hardeepvicky1@gmail.com
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
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}
              onPress={handleContactSupport}
            >
              <View style={styles.actionContent}>
                <IconSymbol
                  name="support-agent"
                  size={24}
                  color={colors.primary}
                  style={styles.actionIcon}
                />
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Contact Support</Text>
                  <Text style={styles.actionSubtitle}>
                    Get help with your account
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

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for using our app!{'\n'}
              We're here to help you find meaningful connections.
            </Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
