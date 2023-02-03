import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchMarketNews = (newsCategory) => {
  const [marketNewsData, setMarketNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    try {
      finnHub
        .get('/news', {
          params: {
            category: newsCategory,
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
  }, [newsCategory]);

  return { marketNewsData, loading, error };
};

export default useFetchMarketNews;
