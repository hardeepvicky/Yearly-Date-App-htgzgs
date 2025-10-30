
# Google Sign-In Setup Guide

This app uses Google OAuth for authentication. To enable Google Sign-In, you need to set up OAuth credentials in the Google Cloud Console.

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 3. Create OAuth 2.0 Credentials

#### For Android:

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Android" as the application type
4. Enter your package name: `com.anonymous.Natively`
5. Get your SHA-1 certificate fingerprint:
   - For debug: Run `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`
   - Copy the SHA-1 fingerprint
6. Enter the SHA-1 fingerprint
7. Click "Create"
8. Copy the Client ID

#### For iOS:

1. Click "Create Credentials" > "OAuth client ID"
2. Select "iOS" as the application type
3. Enter your bundle ID: `com.anonymous.Natively`
4. Click "Create"
5. Copy the Client ID

#### For Web:

1. Click "Create Credentials" > "OAuth client ID"
2. Select "Web application" as the application type
3. Add authorized redirect URIs:
   - `https://auth.expo.io/@your-username/Natively`
   - `http://localhost:19006`
4. Click "Create"
5. Copy the Client ID

### 4. Update the App Configuration

Open `app/registration.tsx` and replace the placeholder client IDs with your actual client IDs:

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

### 5. Test the Integration

1. Run the app: `npm run dev`
2. Click "Continue with Google"
3. Sign in with your Google account
4. Complete your profile information
5. Upload photos

## Features Implemented

- **Google OAuth Login**: Secure authentication using Google accounts
- **Profile Completion**: Collects missing information (name, date of birth, gender)
- **Photo Upload**: Upload up to 10 photos (max 10MB each)
- **Photo Editing**: Crop, rotate, and flip photos before setting as profile picture
- **Profile Picture Selection**: Set any uploaded photo as your profile picture

## Notes

- The app requires users to be at least 18 years old
- All user data is stored locally using AsyncStorage
- For production, you should implement a backend to store user data securely
- Consider enabling Supabase for backend functionality

## Troubleshooting

### Google Sign-In not working:

- Verify that all client IDs are correctly configured
- Check that the Google+ API is enabled
- Ensure your app's package name/bundle ID matches the one in Google Cloud Console
- For Android, verify the SHA-1 fingerprint is correct

### Photo upload issues:

- Check that camera and photo library permissions are granted
- Verify that the image file size is under 10MB
- Ensure the app has proper permissions in app.json

## Backend Integration (Optional)

To store user data and photos permanently, you can:

1. Enable Supabase by clicking the Supabase button in the Natively interface
2. Create a Supabase project
3. Set up tables for users and photos
4. Update the registration flow to save data to Supabase
5. Implement photo storage using Supabase Storage

For more information, visit the [Supabase documentation](https://supabase.com/docs).
