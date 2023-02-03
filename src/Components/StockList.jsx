import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchListContext } from '../context/watchListContext';
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsTrash,
} from 'react-icons/bs';
import Loading from './Loading';
import Error from './Error';
import useFetchStockQuote from '../hooks/useFetchStockQuote';

const StockList = () => {
  const { watchList, deleteStock } = useContext(WatchListContext);
  const { data: stock, loading, error } = useFetchStockQuote(watchList);
  const navigate = useNavigate();

  const changeColor = (val) => {
    return val < 0 ? 'danger' : 'success';
  };
  const renderIcon = (val) => {
    return val < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  };
  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  return (
    <div className="watchList-container mb-5">
      {error && <Error />}
      {loading && <Loading />}
      <table className="table hover mt-5">
        <thead style={{ color: 'rgb(79,89,102' }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Last Price</th>
            <th scope="col">Change</th>
            <th scope="col">% Change</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
          </tr>
        </thead>

        <tbody>
          {stock &&
            stock.map((stockData, index) => {
              return (
                <tr
                  className="table-row"
                  key={stockData.symbol}
                  onClick={() => handleStockSelect(stockData.symbol)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <th>{index + 1}</th>
                  <th>{stockData.symbol}</th>
                  <td>{stockData.data.c}</td>
                  <td className={`text-${changeColor(stockData.data.d)}`}>
                    {stockData.data.d.toFixed(2)}
                    {renderIcon(stockData.data.d)}
                  </td>
                  <td className={`text-${changeColor(stockData.data.dp)}`}>
                    {stockData.data.dp.toFixed(2)}
                    {'% '}
                    {renderIcon(stockData.data.dp)}
                  </td>
                  <td>{stockData.data.h}</td>
                  <td>{stockData.data.l}</td>
                  <td>{stockData.data.o}</td>
                  <td>
                    {stockData.data.pc}
                    <button
                      className="btn btn-danger btn-sm ms-5 d-inline-block delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStock(stockData.symbol);
                      }}
                    >
                      <BsTrash className="" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
