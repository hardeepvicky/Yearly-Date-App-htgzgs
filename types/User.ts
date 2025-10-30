
export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: string;
  interests: string[];
  distance?: number;
  isBlocked?: boolean;
  gender: 'male' | 'female';
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'premium';
  startDate: Date;
  endDate: Date;
  price: number;
  active: boolean;
}

export interface BlockedUser {
  id: string;
  name: string;
  photo: string;
  blockedAt: Date;
  reason?: string;
}
