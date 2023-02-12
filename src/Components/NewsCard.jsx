import React from 'react';

const NewsCard = ({ data }) => {
  const formatDateTime = (time) => {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return month + '/' + day + '/' + year;
  };

  return (
    <div className="card border-light">
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <img
          src={data.image}
          className="card-img-top"
          alt={data.headline}
          lazy
        />
      </a>
      <div className="card-body">
        <p className="">
          <span className="me-2" style={{ color: 'rgba(0, 120, 255, 1)' }}>
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </span>
          <span className="fs-6" style={{ color: '#959595' }}>
            {data.source}
          </span>
          <span
            className="fs-6"
            style={{ color: '#959595', position: 'absolute', right: '1rem' }}
          >
            {formatDateTime(data.datetime)}
          </span>
        </p>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <h5 className="card-title">{data.headline}</h5>
        </a>
        <p className=" card-text">{data.summary}</p>
      </div>
    </div>
  );
};

export default NewsCard;
