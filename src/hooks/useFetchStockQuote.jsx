import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchStockQuote = (watchList) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get('/quote', {
              params: {
                symbol: stock,
              },
            });
          })
        );

        const data = responses.map((resp) => {
          return { data: resp.data, symbol: resp.config.params.symbol };
        });

        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [watchList]);

  return { data, loading, error };
};

export default useFetchStockQuote;
