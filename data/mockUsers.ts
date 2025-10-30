
import { User, Match } from '@/types/User';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: 'Love hiking, coffee, and good conversations. Looking for someone who enjoys outdoor adventures! 🏔️',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
    ],
    location: 'New York, NY',
    interests: ['Hiking', 'Coffee', 'Travel', 'Photography'],
    distance: 2,
  },
  {
    id: '2',
    name: 'Emma',
    age: 26,
    bio: 'Yoga instructor and foodie. Always up for trying new restaurants! 🧘‍♀️🍜',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
    ],
    location: 'Brooklyn, NY',
    interests: ['Yoga', 'Cooking', 'Music', 'Art'],
    distance: 5,
  },
  {
    id: '3',
    name: 'Jessica',
    age: 30,
    bio: 'Marketing professional who loves dogs and weekend getaways. Let&apos;s explore the city together! 🐕',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800',
    ],
    location: 'Manhattan, NY',
    interests: ['Dogs', 'Travel', 'Wine', 'Reading'],
    distance: 3,
  },
  {
    id: '4',
    name: 'Olivia',
    age: 27,
    bio: 'Artist and creative soul. Looking for someone who appreciates art and spontaneous adventures! 🎨',
    photos: [
      'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    ],
    location: 'Queens, NY',
    interests: ['Art', 'Music', 'Dancing', 'Museums'],
    distance: 7,
  },
  {
    id: '5',
    name: 'Sophia',
    age: 29,
    bio: 'Tech enthusiast and fitness lover. Swipe right if you can keep up! 💪',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800',
    ],
    location: 'Manhattan, NY',
    interests: ['Fitness', 'Technology', 'Running', 'Startups'],
    distance: 4,
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
