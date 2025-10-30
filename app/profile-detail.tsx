
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { mockUsers } from '@/data/mockUsers';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileDetailScreen() {
  const { isDarkMode } = useThemeContext();
  const colors = getThemedColors(isDarkMode);
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [photoIndex, setPhotoIndex] = useState(0);

  const styles = createStyles(colors);

  // Find user by ID
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Profile',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerLeft: () => (
              <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
                <IconSymbol name="chevron.left" size={24} color={colors.text} />
              </Pressable>
            ),
          }}
        />
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.errorText}>User not found</Text>
        </View>
      </>
    );
  }

  const handlePhotoTap = () => {
    // Cycle to next photo, or back to first if at the end
    setPhotoIndex((prev) => (prev + 1) % user.photos.length);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: user.name,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Photo Section */}
        <View style={styles.photoContainer}>
          <Pressable onPress={handlePhotoTap} style={styles.photoTouchable}>
            <Image
              source={{ uri: user.photos[photoIndex] }}
              style={styles.photo}
              resizeMode="cover"
            />
            
            {/* Photo Indicators */}
            {user.photos.length > 1 && (
              <View style={styles.photoIndicators}>
                {user.photos.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.photoIndicator,
                      index === photoIndex && styles.photoIndicatorActive,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.photoGradient}
            >
              <View style={styles.photoInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.photoName}>
                    {user.name}, {user.age}
                  </Text>
                  {user.distance !== undefined && (
                    <View style={styles.distanceContainer}>
                      <IconSymbol name="location.fill" size={14} color="#FFFFFF" />
                      <Text style={styles.distanceText}>
                        {user.distance < 1 ? '<1 km' : `${user.distance} km`}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.photoLocation}>{user.location}</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Bio */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="text.quote" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            <Text style={styles.bioText}>{user.bio}</Text>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="star.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Interests</Text>
            </View>
            <View style={styles.interestsContainer}>
              {user.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="location.fill" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            <Text style={styles.locationText}>{user.location}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.actionButton, styles.passButton]}
            onPress={() => {
              console.log('Passed on', user.name);
              router.back();
            }}
          >
            <IconSymbol name="xmark" size={28} color={colors.highlight} />
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => {
              console.log('Liked', user.name);
              router.back();
            }}
          >
            <IconSymbol name="heart.fill" size={28} color={colors.primary} />
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.messageButton]}
            onPress={() => {
              console.log('Message', user.name);
              router.push(`/chat/${user.id}`);
            }}
          >
            <IconSymbol name="message.fill" size={24} color={colors.accent} />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 120,
    },
    photoContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.6,
      backgroundColor: colors.border,
    },
    photoTouchable: {
      width: '100%',
      height: '100%',
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    photoIndicators: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 60 : 20,
      left: 16,
      right: 16,
      flexDirection: 'row',
      gap: 4,
    },
    photoIndicator: {
      flex: 1,
      height: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 2,
    },
    photoIndicatorActive: {
      backgroundColor: '#FFFFFF',
    },
    photoGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      justifyContent: 'flex-end',
      padding: 20,
    },
    photoInfo: {
      gap: 4,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    photoName: {
      fontSize: 32,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    distanceText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    photoLocation: {
      fontSize: 18,
      color: '#FFFFFF',
      opacity: 0.9,
    },
    infoSection: {
      padding: 20,
      gap: 24,
    },
    section: {
      gap: 12,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    bioText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    interestTag: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    interestText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '600',
    },
    locationText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    actionButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      elevation: 4,
    },
    passButton: {
      borderWidth: 2,
      borderColor: colors.highlight,
    },
    likeButton: {
      borderWidth: 2,
      borderColor: colors.primary,
      width: 72,
      height: 72,
      borderRadius: 36,
    },
    messageButton: {
      borderWidth: 2,
      borderColor: colors.accent,
    },
    errorText: {
      fontSize: 18,
      color: colors.textSecondary,
    },
  });
