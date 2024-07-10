import {useState, useEffect, useCallback} from 'react';
import getPreferenceSettingOnce, {
  PreferenceSettingResponse,
} from '../apis/preferenceSetting/preferenceSettingOnce.ts';

const useGetPreferenceSettingOnce = () => {
  const [preferenceSetting, setPreferenceSetting] =
    useState<PreferenceSettingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferenceSetting = useCallback(async () => {
    setLoading(true);
    const response = await getPreferenceSettingOnce();
    if (response.success) {
      setPreferenceSetting(response);
      setLoading(false);
    } else {
      setError(response.error?.message || 'Unknown error');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPreferenceSetting();
  }, [fetchPreferenceSetting]);

  return {preferenceSetting, loading, error, refetch: fetchPreferenceSetting};
};

export default useGetPreferenceSettingOnce;
