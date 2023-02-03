import React, { useEffect, useState, useContext } from 'react';
import { WatchListContext } from '../context/watchListContext';
import finnHub from '../apis/finnHub';

const QuoteSearch = () => {
  const [search, setSearch] = useState('');
  const [resultStockList, setResultStockList] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const filterStockList = (list) => {
    return list.filter((stock) => {
      return !stock.symbol.includes('.') && !stock.symbol.includes(':');
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const resp = await finnHub.get('/search', {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          const filteredList = filterStockList(resp.data.result);
          setResultStockList(filteredList);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResultStockList([]);
    }
    return () => (isMounted = false);
  }, [search]);

  const renderDropdown = () => {
    const dropDownClass = search ? 'show' : null;
    return (
      <ul
        className={`dropdown-menu ${dropDownClass}`}
        style={{
          maxHeight: '500px',
          width: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer',
        }}
      >
        {resultStockList.map((s) => {
          return (
            <li
              key={s.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(s.symbol);
                setSearch('');
              }}
            >
              {s.description}
              {'  '} ({s.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          id="search"
          style={{ backgroundColor: 'rgba(145,158,171,0.04)' }}
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search Stock</label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default QuoteSearch;
