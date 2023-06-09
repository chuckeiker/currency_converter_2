import React, { useState } from 'react';

function CurrencyConverter({ baseCurrency, exchangeRates, currencies }) {
  const [fromCurrency, setFromCurrency] = useState(baseCurrency);
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
    convertAmount(currency, toCurrency, amount);
  };

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
    convertAmount(fromCurrency, currency, amount);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    convertAmount(fromCurrency, toCurrency, value);
  };

const convertAmount = (from, to, value) => {
  if (from && to && value) {
    if (from === 'USD' && to === 'USD') {
      setResult(value);
    } else {
      const fromRate = from === 'USD' ? 1 : exchangeRates[from];
      const toRate = to === 'USD' ? 1 : exchangeRates[to];

      if (fromRate && toRate) {
        const rate = toRate / fromRate;
        setResult((value * rate).toFixed(2));
      } else {
        setResult(0);
      }
    }
  } else {
    setResult(0);
  }
};

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    convertAmount(toCurrency, fromCurrency, amount);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => handleFromCurrencyChange(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select value={toCurrency} onChange={(e) => handleToCurrencyChange(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>{result}</span>
        <br></br>
        <br></br>
        <button onClick={handleSwapCurrencies}>Swap</button>
      </div>
    </div>
  );
}

export default CurrencyConverter;
