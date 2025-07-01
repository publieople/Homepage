import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "浏览器不支持地理位置。", loading: false }));
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      let errorMessage = "无法获取当前位置。";
      if (err.code === err.PERMISSION_DENIED) {
        errorMessage = "您已拒绝位置权限。";
      }
      setState((s) => ({ ...s, error: errorMessage, loading: false }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return state;
};
