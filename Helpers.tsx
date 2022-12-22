/**
 * Get location points in specific bounds to use in mock examples
 */
export const randomLocationValuesFromBounds = (
  pointsTotal: number = 1,
  northEast: { lat: number; lng: number } = {
    lat: 42.2870876,
    lng: 3.2725862,
  },
  southWest: { lat: number; lng: number } = {
    lat: 37.2709008,
    lng: -6.9571999,
  }
) => {
  const lngSpan = northEast.lng - southWest.lng;
  const latSpan = northEast.lat - southWest.lat;

  const allPoints = [];

  if (pointsTotal === 1) {
    return [
      {
        lat: southWest.lat + latSpan * Math.random(),
        lng: southWest.lng + lngSpan * Math.random(),
      },
    ];
  }
  // generate random points and add to array 'allPoints'
  for (let i = 0; i < pointsTotal; i++) {
    allPoints.push({
      lat: southWest.lat + latSpan * Math.random(),
      lng: southWest.lng + lngSpan * Math.random(),
    });
  }
  return allPoints;
};

export function getRandomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min) + min);
}
