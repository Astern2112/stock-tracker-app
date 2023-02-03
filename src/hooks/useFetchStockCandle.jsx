import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchStockCandle = (symbol) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatData = ({ data }) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: data.c[index].toFixed(2),
      };
    });
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000); // current time in seconds
      let oneDayAgo;
      const oneWeekAgo = currentTime - 60 * 60 * 24 * 7;
      const oneYearAgo = currentTime - 60 * 60 * 24 * 365;
      const fiveYearAgo = currentTime - 60 * 60 * 24 * 365 * 5;

      if (date.getDate() === 6) {
        oneDayAgo = currentTime - 2 * 60 * 60 * 24;
      } else if (date.getDate() === 0) {
        oneDayAgo = currentTime - 3 * 60 * 60 * 24;
      } else {
        oneDayAgo = currentTime - 60 * 60 * 24;
      }

      try {
        const responses = await Promise.all([
          finnHub.get('/stock/candle', {
            params: {
              symbol: symbol,
              resolution: 30,
              from: oneDayAgo,
              to: currentTime,
            },
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol: symbol,
              resolution: 60,
              from: oneWeekAgo,
              to: currentTime,
            },
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol: symbol,
              resolution: 'W',
              from: oneYearAgo,
              to: currentTime,
            },
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol: symbol,
              resolution: 'M',
              from: fiveYearAgo,
              to: currentTime,
            },
          }),
        ]);
        setData({
          day: formatData(responses[0]),
          week: formatData(responses[1]),
          year: formatData(responses[2]),
          fiveYear: formatData(responses[3]),
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  return { data, loading, error };
};

export default useFetchStockCandle;
