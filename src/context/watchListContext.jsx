import { createContext, useState, useEffect } from 'react';

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || ['GOOGL', 'MSFT', 'AMZN']
  );

  useEffect(() => {
    localStorage.setItem('watchList', watchList);
  }, [watchList]);

  const addStock = (symbol) => {
    if (watchList.indexOf(symbol) === -1) {
      setWatchList([...watchList, symbol]);
    }
  };
  const deleteStock = (symbol) => {
    setWatchList(
      watchList.filter((stock) => {
        return stock !== symbol;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
