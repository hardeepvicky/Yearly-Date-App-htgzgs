
/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Filter users based on gender preference
 * Male users see female users, female users see male users
 */
export function filterUsersByGender(
  users: any[],
  currentUserGender: 'male' | 'female'
): any[] {
  const targetGender = currentUserGender === 'male' ? 'female' : 'male';
  return users.filter((user) => user.gender === targetGender);
}

/**
 * Sort users by distance from current location
 */
export function sortUsersByDistance(
  users: any[],
  currentLat: number,
  currentLon: number
): any[] {
  return users
    .map((user) => {
      if (user.coordinates) {
        const distance = calculateDistance(
          currentLat,
          currentLon,
          user.coordinates.latitude,
          user.coordinates.longitude
        );
        return { ...user, distance };
      }
      return user;
    })
    .sort((a, b) => (a.distance || 999) - (b.distance || 999));
}

/**
 * Filter users within a certain radius (in kilometers)
 */
export function filterUsersByRadius(
  users: any[],
  currentLat: number,
  currentLon: number,
  radiusKm: number
): any[] {
  return users.filter((user) => {
    if (!user.coordinates) return false;
    const distance = calculateDistance(
      currentLat,
      currentLon,
      user.coordinates.latitude,
      user.coordinates.longitude
    );
    return distance <= radiusKm;
  });
}
