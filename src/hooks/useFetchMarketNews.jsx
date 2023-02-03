import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchMarketNews = () => {
  const [marketNewsData, setMarketNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    try {
      finnHub
        .get('/news', {
          params: {
            category: 'general',
          },
        })
        .then((res) => {
          setMarketNewsData(res.data);
          setLoading(false);
        });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { marketNewsData, loading, error };
};

export default useFetchMarketNews;
