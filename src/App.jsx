import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockDetailsPage from './pages/StockDetailsPage';
import StockOverviewPage from './pages/StockOverviewPage';
import { WatchListContextProvider } from './context/watchListContext';
import './App.css';
import Navbar from './Components/Navbar';
import MarketNewsPage from './pages/MarketNewsPage';

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailsPage />} />
            <Route path="/news" element={<MarketNewsPage />} />
          </Routes>
        </Router>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
