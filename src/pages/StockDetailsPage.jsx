import React from 'react';
import { useParams } from 'react-router-dom';
import StockChart from '../Components/StockChart';
import NewsCard from '../Components/NewsCard';
import StockData from '../Components/StockData';
import useFetchStockCandle from '../hooks/useFetchStockCandle';
import useFetchCompanyNews from '../hooks/useFetchCompanyNews';

const StockDetails = () => {
  const { symbol } = useParams();
  const {
    data: chartData,
    chartLoading,
    chartError,
  } = useFetchStockCandle(symbol);
  const {
    newsData: companyNewsData,
    companyNewsLoading,
    companyNewsError,
  } = useFetchCompanyNews(symbol);
  console.log(companyNewsData);
  return (
    <div>
      <div>
        <StockData symbol={symbol} />
        {!chartLoading && !chartError && chartData && (
          <StockChart chartData={chartData} symbol={symbol} />
        )}
        <h3 className="my-3">Company News</h3>
        <div className="news-container">
          {!companyNewsLoading &&
            !companyNewsError &&
            companyNewsData.map((item) => {
              return <NewsCard key={item.id} data={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
