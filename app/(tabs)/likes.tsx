
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemedColors } from '@/styles/themedColors';
import { mockUsers } from '@/data/mockUsers';
import { User } from '@/types/User';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data for liked users
const mockLikedByMe: User[] = [mockUsers[0], mockUsers[2], mockUsers[4], mockUsers[6]];
const mockLikedMe: User[] = [mockUsers[1], mockUsers[3], mockUsers[5], mockUsers[7]];

export default function LikesScreen() {
  const { isDarkMode } = useThemeContext();
  const colors = getThemedColors(isDarkMode);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'iLike' | 'likeMe'>('iLike');

  const styles = createStyles(colors);

  const currentList = activeTab === 'iLike' ? mockLikedByMe : mockLikedMe;

  const handleProfilePress = (user: User) => {
    console.log('Opening profile:', user.name);
    // Navigate to profile detail screen
    // For now, we'll show an alert
    router.push({
      pathname: '/profile-detail',
      params: { userId: user.id },
    });
  };

  const renderLikedUser = ({ item }: { item: User }) => (
    <Pressable
      style={styles.userCard}
      onPress={() => handleProfilePress(item)}
    >
      <Image
        source={{ uri: item.photos[0] }}
        style={styles.userPhoto}
        resizeMode="cover"
      />
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>
            {item.name}, {item.age}
          </Text>
          {item.distance !== undefined && (
            <View style={styles.distanceContainer}>
              <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
              <Text style={styles.distanceText}>
                {item.distance < 1 ? '<1 km' : `${item.distance} km`}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.userLocation} numberOfLines={1}>
          {item.location}
        </Text>
        <Text style={styles.userBio} numberOfLines={2}>
          {item.bio}
        </Text>
        <View style={styles.interestsContainer}>
          {item.interests.slice(0, 3).map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
          {item.interests.length > 3 && (
            <Text style={styles.moreInterests}>+{item.interests.length - 3}</Text>
          )}
        </View>
      </View>
      <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol
        name={activeTab === 'iLike' ? 'heart' : 'heart.fill'}
        size={64}
        color={colors.textSecondary}
      />
      <Text style={styles.emptyTitle}>
        {activeTab === 'iLike' ? 'No Likes Yet' : 'No One Liked You Yet'}
      </Text>
      <Text style={styles.emptyText}>
        {activeTab === 'iLike'
          ? 'Start swiping to find people you like!'
          : 'Keep swiping! Someone will like you soon.'}
      </Text>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Likes',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'iLike' && styles.activeTab,
              { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('iLike')}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.text },
                activeTab === 'iLike' && styles.activeTabText,
                activeTab === 'iLike' && { color: colors.primary },
              ]}
            >
              I Like
            </Text>
            {mockLikedByMe.length > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>{mockLikedByMe.length}</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            style={[
              styles.tab,
              activeTab === 'likeMe' && styles.activeTab,
              { borderBottomColor: colors.primary },
            ]}
            onPress={() => setActiveTab('likeMe')}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.text },
                activeTab === 'likeMe' && styles.activeTabText,
                activeTab === 'likeMe' && { color: colors.primary },
              ]}
            >
              Like Me
            </Text>
            {mockLikedMe.length > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>{mockLikedMe.length}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* List */}
        <FlatList
          data={currentList}
          renderItem={renderLikedUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            currentList.length === 0 && styles.emptyListContent,
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 50 : 0,
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomWidth: 3,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
    },
    activeTabText: {
      fontWeight: '700',
    },
    badge: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
    listContent: {
      padding: 16,
      paddingBottom: Platform.OS === 'android' ? 120 : 100,
    },
    emptyListContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userCard: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
      alignItems: 'center',
      gap: 12,
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
      elevation: 2,
    },
    userPhoto: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: colors.border,
    },
    userInfo: {
      flex: 1,
      gap: 4,
    },
    userHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    distanceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    distanceText: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    userLocation: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    userBio: {
      fontSize: 13,
      color: colors.text,
      lineHeight: 18,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 4,
      alignItems: 'center',
    },
    interestTag: {
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    interestText: {
      fontSize: 11,
      color: colors.text,
      fontWeight: '500',
    },
    moreInterests: {
      fontSize: 11,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  });
