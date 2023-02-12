import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchCompanyNews = (symbol) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const today = new Date();
    const date = today.toLocaleDateString('en-US');
    const dateParts = date.split('/');
    const formattedDate =
      dateParts[2] +
      '-' +
      dateParts[0].padStart(2, '0') +
      '-' +
      dateParts[1].padStart(2, '0');

    try {
      finnHub
        .get('/company-news', {
          params: {
            symbol: symbol,
            from: '2000-01-01',
            to: formattedDate,
          },
        })
        .then((res) => {
          setNewsData(res.data);
          setLoading(false);
        });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [symbol]);

  return { newsData, loading, error };
};

export default useFetchCompanyNews;
