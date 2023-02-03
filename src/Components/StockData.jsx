import React from 'react';
import useFetchStockDetails from '../hooks/useFetchStockDetails';

const StockData = ({ symbol }) => {
  const { data: stockData, loading, error } = useFetchStockDetails(symbol);

  return (
    <div>
      {!loading && !error && stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col m-2">
            <div>
              <span className="fw-bold">Name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">Country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col m-2">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col m-2">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {`$${stockData.marketCapitalization.toLocaleString()}`}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
              {stockData.shareOutstanding.toLocaleString()}
            </div>
            <div>
              <span className="fw-bold">Website: </span>
              <a href={stockData?.weburl} target="_blank" rel="noreferrer">
                {stockData.weburl}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
