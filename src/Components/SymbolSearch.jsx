import React, { useState, useContext } from 'react';
import { WatchListContext } from '../context/watchListContext';
import useFetchSymbolLookup from '../hooks/useFetchSymbolLookup';

const SymbolSearch = () => {
  const [search, setSearch] = useState('');
  const { addStock } = useContext(WatchListContext);
  const {
    data: resultStockList,
    loading,
    error,
  } = useFetchSymbolLookup(search);

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
        {!loading && !error && renderDropdown()}
      </div>
    </div>
  );
};

export default SymbolSearch;
