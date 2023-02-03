import React from 'react';
import QuoteSearch from '../Components/QuoteSearch';
import StockList from '../Components/StockList';

const StockOverview = () => {
  return (
    <div>
      <QuoteSearch />
      <StockList />
    </div>
  );
};

export default StockOverview;
