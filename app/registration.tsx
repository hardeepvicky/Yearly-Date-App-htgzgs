
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logoContainer: {
      marginBottom: 60,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      width: '100%',
      maxWidth: 300,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      elevation: 3,
    },
    googleButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000000',
      marginLeft: 12,
    },
    termsText: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 40,
      paddingHorizontal: 20,
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  });

export default function RegistrationScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Google OAuth configuration
  // To set up Google Sign-In:
  // 1. Go to https://console.cloud.google.com/
  // 2. Create a new project or select an existing one
  // 3. Enable Google+ API
  // 4. Create OAuth 2.0 credentials for Android, iOS, and Web
  // 5. Replace the client IDs below with your actual client IDs
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication?.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (accessToken: string | undefined) => {
    if (!accessToken) {
      Alert.alert('Error', 'Failed to get access token');
      return;
    }

    setLoading(true);
    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userInfo = await userInfoResponse.json();
      console.log('Google User Info:', userInfo);

      // Store user info temporarily
      await AsyncStorage.setItem('tempUserInfo', JSON.stringify(userInfo));

      // Check what information is missing
      const missingInfo = [];
      if (!userInfo.name) missingInfo.push('name');
      if (!userInfo.birthday) missingInfo.push('dateOfBirth');
      if (!userInfo.gender) missingInfo.push('gender');
      if (!userInfo.picture) missingInfo.push('photo');

      // Navigate to complete profile or photo upload
      if (missingInfo.length > 0) {
        router.push('/complete-profile');
      } else {
        router.push('/photo-upload');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Failed to fetch user information from Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Google Sign In Error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <IconSymbol name="heart.fill" size={80} color={colors.primary} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Find your perfect match with our dating app
          </Text>
        </View>

        <Pressable
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={!request || loading}
        >
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <>
              <IconSymbol name="globe" size={24} color="#000000" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </>
  );
}
