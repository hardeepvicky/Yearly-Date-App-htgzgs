
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Animated,
  PanResponder,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockUsers, currentUser } from '@/data/mockUsers';
import { User } from '@/types/User';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import {
  filterUsersByGender,
  sortUsersByDistance,
  filterUsersByRadius,
  filterUsersByCountry,
} from '@/utils/locationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;
const MAX_DISTANCE_KM = 50; // Maximum distance to show profiles

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const position = useRef(new Animated.ValueXY()).current;
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    initializeLocation();
  }, []);

  useEffect(() => {
    // Listen for country changes
    const loadCountry = async () => {
      try {
        const storedCountry = await AsyncStorage.getItem('selectedCountry');
        if (storedCountry !== null) {
          setSelectedCountry(storedCountry);
          // Reload users with new country filter
          if (userLocation) {
            loadUsersWithLocation(userLocation.latitude, userLocation.longitude, storedCountry);
          }
        }
      } catch (error) {
        console.error('Error loading country:', error);
      }
    };

    // Load country on mount and when screen is focused
    loadCountry();
    const interval = setInterval(loadCountry, 1000); // Check for changes every second
    return () => clearInterval(interval);
  }, [userLocation]);

  const initializeLocation = async () => {
    try {
      console.log('Requesting location permissions...');
      
      // Load selected country
      const storedCountry = await AsyncStorage.getItem('selectedCountry');
      if (storedCountry) {
        setSelectedCountry(storedCountry);
      }
      
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Location permission denied');
        Alert.alert(
          'Location Permission Required',
          'This app needs location access to show you nearby profiles. Using default location.',
          [{ text: 'OK' }]
        );
        // Use current user's mock location as fallback
        loadUsersWithLocation(
          currentUser.coordinates?.latitude || 40.7589,
          currentUser.coordinates?.longitude || -73.9851,
          storedCountry || ''
        );
        setLoading(false);
        return;
      }

      setLocationPermission(true);
      console.log('Location permission granted');

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      console.log('Current location:', location.coords);

      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      // Load and filter users based on location
      loadUsersWithLocation(latitude, longitude, storedCountry || '');
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Could not get your location. Using default location.',
        [{ text: 'OK' }]
      );
      // Use mock location as fallback
      const storedCountry = await AsyncStorage.getItem('selectedCountry');
      loadUsersWithLocation(
        currentUser.coordinates?.latitude || 40.7589,
        currentUser.coordinates?.longitude || -73.9851,
        storedCountry || ''
      );
    } finally {
      setLoading(false);
    }
  };

  const loadUsersWithLocation = (latitude: number, longitude: number, country: string = '') => {
    console.log('Loading users with location:', latitude, longitude, 'country:', country);
    
    // Filter users by gender (show opposite sex)
    let filteredUsers = filterUsersByGender(mockUsers, currentUser.gender);
    console.log('After gender filter:', filteredUsers.length, 'users');

    // If country is selected, filter by country
    if (country) {
      filteredUsers = filterUsersByCountry(filteredUsers, country);
      console.log('After country filter:', filteredUsers.length, 'users');
      
      // Also filter by nearby location within the country
      filteredUsers = filterUsersByRadius(
        filteredUsers,
        latitude,
        longitude,
        MAX_DISTANCE_KM
      );
      console.log('After radius filter (within country):', filteredUsers.length, 'users');
    }
    // If no country selected, no additional filtering - show all opposite sex users

    // Sort by distance
    filteredUsers = sortUsersByDistance(filteredUsers, latitude, longitude);
    console.log('Sorted by distance:', filteredUsers.length, 'users');

    setUsers(filteredUsers);
  };

  const currentUserProfile = users[currentIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // Only allow horizontal swipes, not taps
        if (Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Check if it's a tap (minimal movement)
        const isTap = Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5;
        
        if (isTap) {
          // Handle tap to cycle photos
          handlePhotoTap();
          return;
        }
        
        if (gesture.dx > SWIPE_THRESHOLD) {
          handleSwipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          handleSwipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handlePhotoTap = () => {
    if (currentUserProfile && currentUserProfile.photos.length > 1) {
      setPhotoIndex((prev) => {
        const nextIndex = prev + 1;
        // Loop back to first photo if at the end
        return nextIndex >= currentUserProfile.photos.length ? 0 : nextIndex;
      });
      console.log('Photo cycled to index:', photoIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    console.log('Liked:', currentUserProfile?.name);
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      nextCard();
      Alert.alert('Match! 💕', `You liked ${currentUserProfile?.name}!`);
    });
  };

  const handleSwipeLeft = () => {
    console.log('Passed:', currentUserProfile?.name);
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      nextCard();
    });
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % users.length);
    setPhotoIndex(0);
    position.setValue({ x: 0, y: 0 });
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Discover',
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
            }}
          />
        )}
        <View style={[commonStyles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[commonStyles.textSecondary, { marginTop: 16 }]}>
            Finding nearby profiles...
          </Text>
        </View>
      </>
    );
  }

  if (!currentUserProfile || users.length === 0) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Discover',
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.text,
            }}
          />
        )}
        <View style={[commonStyles.container, styles.emptyContainer]}>
          <IconSymbol name="location.fill" size={64} color={colors.textSecondary} />
          <Text style={[commonStyles.title, { marginTop: 16 }]}>
            No profiles found
          </Text>
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
            {selectedCountry
              ? `There are no profiles in ${selectedCountry} matching your criteria.\n`
              : 'There are no profiles matching your criteria.\n'}
            Try adjusting your filters in settings or check back later!
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              initializeLocation();
            }}
          >
            <Text style={styles.retryButtonText}>Refresh</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Discover',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
          }}
        />
      )}
      <View style={[commonStyles.container, styles.container]}>
        <View style={styles.cardContainer}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.card,
              {
                transform: [
                  { translateX: position.x },
                  { translateY: position.y },
                  { rotate },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: currentUserProfile.photos[photoIndex] }}
              style={styles.image}
              resizeMode="cover"
            />

            <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
              <Text style={styles.likeLabelText}>LIKE</Text>
            </Animated.View>

            <Animated.View style={[styles.nopeLabel, { opacity: nopeOpacity }]}>
              <Text style={styles.nopeLabelText}>NOPE</Text>
            </Animated.View>

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            >
              <View style={styles.photoIndicators}>
                {currentUserProfile.photos.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.photoIndicator,
                      index === photoIndex && styles.photoIndicatorActive,
                    ]}
                  />
                ))}
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>
                    {currentUserProfile.name}, {currentUserProfile.age}
                  </Text>
                  {currentUserProfile.distance !== undefined && (
                    <View style={styles.distanceContainer}>
                      <IconSymbol name="location.fill" size={16} color="#FFFFFF" />
                      <Text style={styles.distance}>
                        {currentUserProfile.distance < 1
                          ? '<1 km'
                          : `${currentUserProfile.distance} km`}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.location}>{currentUserProfile.location}</Text>
                <Text style={styles.bio}>{currentUserProfile.bio}</Text>
                <View style={styles.interestsContainer}>
                  {currentUserProfile.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.actionButton, styles.passButton]}
            onPress={handleSwipeLeft}
          >
            <IconSymbol name="xmark" size={32} color={colors.highlight} />
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={() => Alert.alert('Super Like! ⭐', 'This feature requires Premium')}
          >
            <IconSymbol name="star.fill" size={28} color={colors.accent} />
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.likeButton]}
            onPress={handleSwipeRight}
          >
            <IconSymbol name="heart.fill" size={32} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  photoIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 10,
  },
  photoIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  photoIndicatorActive: {
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    gap: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distance: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  location: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bio: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  interestText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  likeLabel: {
    position: 'absolute',
    top: 50,
    right: 40,
    borderWidth: 4,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 8,
    transform: [{ rotate: '20deg' }],
  },
  likeLabelText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  nopeLabel: {
    position: 'absolute',
    top: 50,
    left: 40,
    borderWidth: 4,
    borderColor: colors.highlight,
    borderRadius: 8,
    padding: 8,
    transform: [{ rotate: '-20deg' }],
  },
  nopeLabelText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.highlight,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'android' ? 120 : 100,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  passButton: {
    borderWidth: 2,
    borderColor: colors.highlight,
  },
  likeButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  superLikeButton: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
});
