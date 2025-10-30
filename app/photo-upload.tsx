
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 60) / 3;
const MAX_PHOTOS = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

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
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 30,
    },
    photoSlot: {
      width: PHOTO_SIZE,
      height: PHOTO_SIZE,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    photoSlotFilled: {
      borderStyle: 'solid',
      borderColor: colors.primary,
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    addPhotoButton: {
      alignItems: 'center',
    },
    addPhotoText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 8,
    },
    photoActions: {
      position: 'absolute',
      top: 8,
      right: 8,
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 16,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileBadge: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    profileBadgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    infoBox: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
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

interface PhotoItem {
  uri: string;
  isProfile: boolean;
}

export default function PhotoUploadScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant photo library access to upload photos'
      );
    }
  };

  const pickImage = async () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Limit Reached', `You can upload a maximum of ${MAX_PHOTOS} photos`);
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];

        // Check file size
        if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE) {
          Alert.alert(
            'File Too Large',
            'Please select an image smaller than 10MB'
          );
          return;
        }

        const newPhoto: PhotoItem = {
          uri: asset.uri,
          isProfile: photos.length === 0, // First photo is profile by default
        };

        setPhotos([...photos, newPhoto]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removePhoto = (index: number) => {
    Alert.alert('Remove Photo', 'Are you sure you want to remove this photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          const newPhotos = photos.filter((_, i) => i !== index);
          // If removed photo was profile, make first photo profile
          if (photos[index].isProfile && newPhotos.length > 0) {
            newPhotos[0].isProfile = true;
          }
          setPhotos(newPhotos);
        },
      },
    ]);
  };

  const setAsProfile = (index: number) => {
    router.push({
      pathname: '/crop-photo',
      params: { photoUri: photos[index].uri, photoIndex: index.toString() },
    });
  };

  const handleCropComplete = (croppedUri: string, index: number) => {
    const newPhotos = photos.map((photo, i) => ({
      ...photo,
      isProfile: i === index,
      uri: i === index ? croppedUri : photo.uri,
    }));
    setPhotos(newPhotos);
  };

  const handleContinue = async () => {
    if (photos.length === 0) {
      Alert.alert('No Photos', 'Please upload at least one photo to continue');
      return;
    }

    setLoading(true);
    try {
      // Get user info
      const storedInfo = await AsyncStorage.getItem('tempUserInfo');
      if (storedInfo) {
        const userInfo = JSON.parse(storedInfo);

        // Create complete user profile
        const completeProfile = {
          ...userInfo,
          photos: photos.map((p) => p.uri),
          profilePhoto: photos.find((p) => p.isProfile)?.uri || photos[0].uri,
        };

        // Save complete profile
        await AsyncStorage.setItem('userProfile', JSON.stringify(completeProfile));
        await AsyncStorage.removeItem('tempUserInfo');

        // Navigate to main app
        Alert.alert('Success', 'Your profile has been created!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/(home)/'),
          },
        ]);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Upload Photos',
          headerBackVisible: false,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload Your Photos</Text>
          <Text style={styles.subtitle}>
            Add up to {MAX_PHOTOS} photos (max 10MB each)
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            • Tap the + button to add photos{'\n'}
            • Tap the star icon to set a photo as your profile picture{'\n'}
            • Tap the X icon to remove a photo{'\n'}
            • Profile photos will be cropped before setting
          </Text>
        </View>

        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={[styles.photoSlot, styles.photoSlotFilled]}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
              <View style={styles.photoActions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => setAsProfile(index)}
                >
                  <IconSymbol
                    name={photo.isProfile ? 'star.fill' : 'star'}
                    size={16}
                    color="#FFFFFF"
                  />
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => removePhoto(index)}
                >
                  <IconSymbol name="xmark" size={16} color="#FFFFFF" />
                </Pressable>
              </View>
              {photo.isProfile && (
                <View style={styles.profileBadge}>
                  <Text style={styles.profileBadgeText}>PROFILE</Text>
                </View>
              )}
            </View>
          ))}

          {photos.length < MAX_PHOTOS && (
            <Pressable style={styles.photoSlot} onPress={pickImage}>
              <View style={styles.addPhotoButton}>
                <IconSymbol name="plus" size={32} color={colors.textSecondary} />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </View>
            </Pressable>
          )}
        </View>

        <Pressable
          style={[
            styles.continueButton,
            (photos.length === 0 || loading) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={photos.length === 0 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>Complete Profile</Text>
          )}
        </Pressable>
      </ScrollView>
    </>
  );
}
