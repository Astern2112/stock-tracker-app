import React from 'react';
import NewsCard from '../Components/NewsCard';
import useFetchMarketNews from '../hooks/useFetchMarketNews';
import Error from '../Components/Error';
import Loading from '../Components/Loading';

const NewsPage = () => {
  const { marketNewsData, loading, error } = useFetchMarketNews();

  return (
    <div>
      <h2 className="h2">Latest Market News</h2>
      {error && <Error />}
      {loading && <Loading />}
      {!loading && !error && (
        <div className="news-container">
          {marketNewsData.map((n) => {
            return <NewsCard key={n.id} data={n} />;
          })}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
