
import { User, Match } from '@/types/User';

// Mock users with coordinates (New York area)
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    gender: 'female',
    bio: 'Love hiking, coffee, and good conversations. Looking for someone who enjoys outdoor adventures! 🏔️',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
    ],
    location: 'New York, NY',
    interests: ['Hiking', 'Coffee', 'Travel', 'Photography'],
    distance: 2,
    coordinates: {
      latitude: 40.7580,
      longitude: -73.9855,
    },
    country: 'United States',
  },
  {
    id: '2',
    name: 'Emma',
    age: 26,
    gender: 'female',
    bio: 'Yoga instructor and foodie. Always up for trying new restaurants! 🧘‍♀️🍜',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
    ],
    location: 'Brooklyn, NY',
    interests: ['Yoga', 'Cooking', 'Music', 'Art'],
    distance: 5,
    coordinates: {
      latitude: 40.6782,
      longitude: -73.9442,
    },
    country: 'United States',
  },
  {
    id: '3',
    name: 'Jessica',
    age: 30,
    gender: 'female',
    bio: 'Marketing professional who loves dogs and weekend getaways. Let&apos;s explore the city together! 🐕',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800',
    ],
    location: 'Manhattan, NY',
    interests: ['Dogs', 'Travel', 'Wine', 'Reading'],
    distance: 3,
    coordinates: {
      latitude: 40.7831,
      longitude: -73.9712,
    },
    country: 'United States',
  },
  {
    id: '4',
    name: 'Olivia',
    age: 27,
    gender: 'female',
    bio: 'Artist and creative soul. Looking for someone who appreciates art and spontaneous adventures! 🎨',
    photos: [
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    ],
    location: 'Queens, NY',
    interests: ['Art', 'Music', 'Dancing', 'Museums'],
    distance: 7,
    coordinates: {
      latitude: 40.7282,
      longitude: -73.7949,
    },
    country: 'Canada',
  },
  {
    id: '5',
    name: 'Sophia',
    age: 29,
    gender: 'female',
    bio: 'Tech enthusiast and fitness lover. Swipe right if you can keep up! 💪',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800',
    ],
    location: 'Manhattan, NY',
    interests: ['Fitness', 'Technology', 'Running', 'Startups'],
    distance: 4,
    coordinates: {
      latitude: 40.7489,
      longitude: -73.9680,
    },
    country: 'United States',
  },
  {
    id: '6',
    name: 'Mia',
    age: 25,
    gender: 'female',
    bio: 'Fashion designer with a passion for vintage finds and rooftop bars! ✨',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=800',
    ],
    location: 'SoHo, NY',
    interests: ['Fashion', 'Design', 'Shopping', 'Cocktails'],
    distance: 1,
    coordinates: {
      latitude: 40.7233,
      longitude: -74.0030,
    },
    country: 'United Kingdom',
  },
  {
    id: '7',
    name: 'Ava',
    age: 31,
    gender: 'female',
    bio: 'Lawyer by day, salsa dancer by night. Looking for my dance partner! 💃',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800',
    ],
    location: 'Upper East Side, NY',
    interests: ['Dancing', 'Law', 'Wine', 'Travel'],
    distance: 6,
    coordinates: {
      latitude: 40.7736,
      longitude: -73.9566,
    },
    country: 'United States',
  },
  {
    id: '8',
    name: 'Isabella',
    age: 24,
    gender: 'female',
    bio: 'Photographer capturing life&apos;s beautiful moments. Let&apos;s create memories together! 📸',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800',
    ],
    location: 'Williamsburg, NY',
    interests: ['Photography', 'Art', 'Coffee', 'Indie Music'],
    distance: 8,
    coordinates: {
      latitude: 40.7081,
      longitude: -73.9571,
    },
    country: 'United States',
  },
  {
    id: '9',
    name: 'Charlotte',
    age: 28,
    gender: 'female',
    bio: 'Nurse with a big heart. Love helping others and exploring new places! ❤️',
    photos: [
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800',
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800',
    ],
    location: 'Chelsea, NY',
    interests: ['Healthcare', 'Volunteering', 'Hiking', 'Cooking'],
    distance: 3,
    coordinates: {
      latitude: 40.7465,
      longitude: -74.0014,
    },
    country: 'Australia',
  },
  {
    id: '10',
    name: 'Amelia',
    age: 26,
    gender: 'female',
    bio: 'Writer and bookworm. Coffee dates and deep conversations are my thing! ☕📚',
    photos: [
      'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=800',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800',
    ],
    location: 'Greenwich Village, NY',
    interests: ['Writing', 'Reading', 'Coffee', 'Poetry'],
    distance: 2,
    coordinates: {
      latitude: 40.7336,
      longitude: -74.0027,
    },
    country: 'United States',
  },
];

export const mockMatches: Match[] = [
  {
    id: 'm1',
    user: mockUsers[0],
    matchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastMessage: 'Hey! How are you?',
    unreadCount: 2,
  },
  {
    id: 'm2',
    user: mockUsers[1],
    matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastMessage: 'That sounds great!',
    unreadCount: 0,
  },
  {
    id: 'm3',
    user: mockUsers[2],
    matchedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    lastMessage: 'See you then!',
    unreadCount: 1,
  },
];

// Mock current user (male user for testing)
export const currentUser: User = {
  id: 'current-user',
  name: 'John',
  age: 30,
  gender: 'male',
  bio: 'Looking for meaningful connections',
  photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'],
  location: 'New York, NY',
  interests: ['Travel', 'Music', 'Sports'],
  coordinates: {
    latitude: 40.7589,
    longitude: -73.9851,
  },
};
