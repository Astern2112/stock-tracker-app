import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const useFetchSymbolLookup = (search) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterStockList = (list) => {
    return list.filter((stock) => {
      return !stock.symbol.includes('.') && !stock.symbol.includes(':');
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const resp = await finnHub.get('/search', {
          params: {
            q: search,
          },
        });

        const filteredList = filterStockList(resp.data.result);
        setData(filteredList);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [search]);

  return { data, loading, error };
};

export default useFetchSymbolLookup;
