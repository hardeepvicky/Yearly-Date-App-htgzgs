
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'heart.fill',
      label: 'Discover',
    },
    {
      name: 'likes',
      route: '/(tabs)/likes',
      icon: 'heart.circle.fill',
      label: 'Likes',
    },
    {
      name: 'matches',
      route: '/(tabs)/matches',
      icon: 'message.fill',
      label: 'Matches',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="heart.fill" drawable="ic_home" />
          <Label>Discover</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="likes">
          <Icon sf="heart.circle.fill" drawable="ic_likes" />
          <Label>Likes</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="matches">
          <Icon sf="message.fill" drawable="ic_matches" />
          <Label>Matches</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="likes" />
        <Stack.Screen name="matches" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
