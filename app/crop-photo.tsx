
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { IconSymbol } from '@/components/IconSymbol';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const { width, height } = Dimensions.get('window');

const createStyles = (colors: ReturnType<typeof getThemedColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    image: {
      width: width - 40,
      height: width - 40,
      borderRadius: 12,
    },
    controls: {
      padding: 20,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    controlButton: {
      alignItems: 'center',
      padding: 12,
    },
    controlButtonText: {
      fontSize: 12,
      color: colors.text,
      marginTop: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 16,
    },
  });

export default function CropPhotoScreen() {
  const { theme } = useThemeContext();
  const colors = getThemedColors(theme);
  const styles = createStyles(colors);
  const router = useRouter();
  const params = useLocalSearchParams();

  const photoUri = params.photoUri as string;
  const photoIndex = parseInt(params.photoIndex as string);

  const [currentUri, setCurrentUri] = useState(photoUri);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleRotate = async () => {
    setLoading(true);
    try {
      const newRotation = (rotation + 90) % 360;
      const manipResult = await manipulateAsync(
        currentUri,
        [{ rotate: 90 }],
        { compress: 0.8, format: SaveFormat.JPEG }
      );
      setCurrentUri(manipResult.uri);
      setRotation(newRotation);
    } catch (error) {
      console.error('Error rotating image:', error);
      Alert.alert('Error', 'Failed to rotate image');
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = async (direction: 'horizontal' | 'vertical') => {
    setLoading(true);
    try {
      const manipResult = await manipulateAsync(
        currentUri,
        [{ flip: direction === 'horizontal' ? 'horizontal' : 'vertical' }],
        { compress: 0.8, format: SaveFormat.JPEG }
      );
      setCurrentUri(manipResult.uri);
    } catch (error) {
      console.error('Error flipping image:', error);
      Alert.alert('Error', 'Failed to flip image');
    } finally {
      setLoading(false);
    }
  };

  const handleCrop = async () => {
    setLoading(true);
    try {
      // Get image dimensions using a Promise wrapper
      const getImageSize = (uri: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
          Image.getSize(
            uri,
            (width, height) => resolve({ width, height }),
            (error) => reject(error)
          );
        });
      };

      const imageInfo = await getImageSize(currentUri);
      
      // Calculate crop dimensions for square crop
      const size = Math.min(imageInfo.width, imageInfo.height);
      const originX = (imageInfo.width - size) / 2;
      const originY = (imageInfo.height - size) / 2;

      const manipResult = await manipulateAsync(
        currentUri,
        [
          {
            crop: {
              originX,
              originY,
              width: size,
              height: size,
            },
          },
        ],
        { compress: 0.8, format: SaveFormat.JPEG }
      );
      setCurrentUri(manipResult.uri);
    } catch (error) {
      console.error('Error cropping image:', error);
      Alert.alert('Error', 'Failed to crop image');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Navigate back with the cropped image URI
    router.back();
    // In a real app, you would pass the cropped URI back to the photo upload screen
    // This could be done via a callback or state management solution
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Edit Photo',
          headerBackVisible: true,
        }}
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Image source={{ uri: currentUri }} style={styles.image} resizeMode="cover" />
          )}
        </View>

        <View style={styles.controls}>
          <Text style={styles.infoText}>
            Adjust your photo before setting it as profile picture
          </Text>

          <View style={styles.controlsRow}>
            <Pressable style={styles.controlButton} onPress={handleRotate} disabled={loading}>
              <IconSymbol name="arrow.clockwise" size={24} color={colors.text} />
              <Text style={styles.controlButtonText}>Rotate</Text>
            </Pressable>

            <Pressable
              style={styles.controlButton}
              onPress={() => handleFlip('horizontal')}
              disabled={loading}
            >
              <IconSymbol name="arrow.left.and.right" size={24} color={colors.text} />
              <Text style={styles.controlButtonText}>Flip H</Text>
            </Pressable>

            <Pressable
              style={styles.controlButton}
              onPress={() => handleFlip('vertical')}
              disabled={loading}
            >
              <IconSymbol name="arrow.up.and.down" size={24} color={colors.text} />
              <Text style={styles.controlButtonText}>Flip V</Text>
            </Pressable>

            <Pressable style={styles.controlButton} onPress={handleCrop} disabled={loading}>
              <IconSymbol name="crop" size={24} color={colors.text} />
              <Text style={styles.controlButtonText}>Crop</Text>
            </Pressable>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Set as Profile</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
