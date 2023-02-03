import React from 'react';
import { useParams } from 'react-router-dom';
import StockChart from '../Components/StockChart';
import StockData from '../Components/StockData';
import useFetchStockCandle from '../hooks/useFetchStockCandle';

const StockDetails = () => {
  const { symbol } = useParams();
  const { data: chartData, loading, error } = useFetchStockCandle(symbol);

  return (
    <div>
      <div>
        <StockData symbol={symbol} />
        {!loading && !error && chartData && (
          <StockChart chartData={chartData} symbol={symbol} />
        )}
      </div>
    </div>
  );
};

export default StockDetails;
