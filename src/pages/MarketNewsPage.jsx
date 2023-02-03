import React, { useState } from 'react';
import NewsCard from '../Components/NewsCard';
import useFetchMarketNews from '../hooks/useFetchMarketNews';
import Error from '../Components/Error';
import Loading from '../Components/Loading';

const NewsPage = () => {
  const [newsCategory, setNewsCategory] = useState('general');
  const { marketNewsData, loading, error } = useFetchMarketNews(newsCategory);

  const renderSelectedCategory = (category) => {
    const classes = 'news-category-item';
    if (category === newsCategory) {
      return classes + ' selected-category';
    } else {
      return classes;
    }
  };
  return (
    <div>
      <h2 className="h2 text-center mb-3">
        Latest {newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1)}{' '}
        News
      </h2>
      <ul className="news-category-bar">
        <li
          className={renderSelectedCategory('general')}
          onClick={() => setNewsCategory('general')}
        >
          General
        </li>
        <li
          className={renderSelectedCategory('crypto')}
          onClick={() => setNewsCategory('crypto')}
        >
          Crypto
        </li>
        <li
          className={renderSelectedCategory('forex')}
          onClick={() => setNewsCategory('forex')}
        >
          Forex
        </li>
        <li
          className={renderSelectedCategory('merger')}
          onClick={() => setNewsCategory('merger')}
        >
          Merger
        </li>
      </ul>

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
