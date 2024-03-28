import {useState, useCallback} from 'react';

interface UseGetDistanceFromLatLonInKm {
  distance: number | null; // 거리 값이 null이거나 숫자일 수 있음을 명시
  getDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => void; // getDistance 함수의 타입 정의
}

function useGetDistanceFromLatLonInKm(): UseGetDistanceFromLatLonInKm {
  const [distance, setDistance] = useState<number | null>(null);

  const deg2rad = useCallback((deg: number) => {
    return deg * (Math.PI / 180);
  }, []);

  const getDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // 지구의 반지름 (km)
      const dLat = deg2rad(lat2 - lat1); // 위도 차이를 라디안으로 변환
      const dLon = deg2rad(lon2 - lon1); // 경도 차이를 라디안으로 변환
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // 거리 계산
      setDistance(d);
    },
    [deg2rad],
  );

  return {distance, getDistance};
}

export default useGetDistanceFromLatLonInKm;
