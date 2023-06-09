import React, { useState, useEffect } from 'react';
import CurrencyTable from './components/CurrencyTable';
import CurrencyConverter from './components/CurrencyConverter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchExchangeRates();
    fetchCurrencies();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  };

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
    fetchExchangeRates();
  };

  return (
    <div className="App">
      <Navbar siteName="Currency Converter" />
      <div className="container">
        <CurrencyTable
          baseCurrency={baseCurrency}
          exchangeRates={exchangeRates}
          currencies={currencies}
          onBaseCurrencyChange={handleBaseCurrencyChange}
        />
        <CurrencyConverter
          baseCurrency={baseCurrency}
          exchangeRates={exchangeRates}
          currencies={currencies}
        />
      </div>
      <Footer portfolioLink="https://yourportfolio.com" />
    </div>
  );
}

export default App;

