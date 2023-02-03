import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({ chartData, symbol }) => {
  const { day, week, year, fiveYear } = chartData;
  const [dateRange, setDateRange] = useState('24h');

  function determineDateRange() {
    switch (dateRange) {
      case '24h':
        return day;
      case '7d':
        return week;
      case '1y':
        return year;
      case '5y':
        return fiveYear;
      default:
        return day;
    }
  }

  const renderButtonSelected = (button) => {
    const classes = 'btn m-1';
    if (button === dateRange) {
      return classes + ' btn-primary';
    } else {
      return classes + ' btn-outline-primary';
    }
  };

  const priceDiff =
    determineDateRange()[determineDateRange().length - 1].y -
    determineDateRange()[0].y;

  const color = priceDiff > 0 ? '#26C281' : '#ed3419';

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px',
      },
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM',
      },
    },
    markers: {
      size: 6,
    },
  };

  const series = [
    {
      name: symbol,
      data: determineDateRange(),
    },
  ];

  return (
    <div className="mt-5 p-5 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" className="w-100" />
      <div>
        <button
          className={renderButtonSelected('24h')}
          onClick={() => setDateRange('24h')}
        >
          24h
        </button>
        <button
          className={renderButtonSelected('7d')}
          onClick={() => setDateRange('7d')}
        >
          7d
        </button>
        <button
          className={renderButtonSelected('1y')}
          onClick={() => setDateRange('1y')}
        >
          1y
        </button>
        <button
          className={renderButtonSelected('5y')}
          onClick={() => setDateRange('5y')}
        >
          5y
        </button>
      </div>
    </div>
  );
};

export default StockChart;
