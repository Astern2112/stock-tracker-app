import React from 'react';
import SymbolSearch from '../Components/SymbolSearch';
import StockList from '../Components/StockList';

const StockOverview = () => {
  return (
    <div>
      <SymbolSearch />
      <StockList />
    </div>
  );
};

export default StockOverview;
