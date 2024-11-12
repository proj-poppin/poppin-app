import {useState, useEffect} from 'react';
import randomNickName from '../../Axios/Auth/⭐\uFE0FrandomNickName.ts';

const useRandomNickname = () => {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await randomNickName();
        if (response.success) {
          setNickname(response.data.randomNickname);
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNickname();
  }, []);

  return {nickname, loading, error};
};

export default useRandomNickname;
