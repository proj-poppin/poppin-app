import {useState, useCallback, useEffect} from 'react';

interface UseGetDistanceFromLatLonInKm {
  distance: number | null; // 거리 값이 null이거나 숫자일 수 있음을 명시
  getDistance: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => number | null; // getDistance 함수의 타입 정의
}

function useGetDistanceFromLatLonInKm(): UseGetDistanceFromLatLonInKm {
  const [distance, setDistance] = useState<number | null>(null);

  const toRadians = useCallback((degrees: number) => {
    return degrees * (Math.PI / 180);
  }, []);

  const latLonToKm = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // 지구의 반지름 (km)
      const dLon = toRadians(lon2 - lon1);
      const radLat1 = toRadians(lat1);
      const radLat2 = toRadians(lat2);

      const distanceInKm =
        Math.acos(
          Math.sin(radLat1) * Math.sin(radLat2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(dLon),
        ) * R;

      return distanceInKm;
    },
    [toRadians],
  );

  const getDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const distanceInKm = latLonToKm(lat1, lon1, lat2, lon2);
      setDistance(distanceInKm);
      return distanceInKm;
    },
    [latLonToKm],
  );

  useEffect(() => {
    if (distance !== null) {
      console.log(`거리: ${distance} km`);
    }
  }, [distance]);

  return {distance, getDistance};
}

export default useGetDistanceFromLatLonInKm;
