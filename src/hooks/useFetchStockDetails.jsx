import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchStockDetails = (symbol) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      finnHub
        .get('/stock/profile2', {
          params: {
            symbol,
          },
        })
        .then((resp) => {
          setData(resp.data);
          setLoading(false);
        });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [symbol]);
  return { data, loading, error };
};

export default useFetchStockDetails;
