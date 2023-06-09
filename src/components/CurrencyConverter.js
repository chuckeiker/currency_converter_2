import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CurrencyConverter({ exchangeRates, currencies }) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
    setToCurrency(currency);
  };

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleAmountBlur = () => {
    convertAmount();
  };

  useEffect(() => {
    convertAmount();
  }, [fromCurrency, toCurrency, amount]);

  const convertAmount = () => {
    if (fromCurrency && toCurrency && amount) {
      if (fromCurrency === toCurrency) {
        setResult(amount);
      } else {
        const fromRate = exchangeRates[fromCurrency] || 1;
        const toRate = exchangeRates[toCurrency] || 1;

        if (fromRate && toRate) {
          const rate = toRate / fromRate;
          setResult((amount * rate).toFixed(2));
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
    convertAmount();
  };

  useEffect(() => {
    const buildChart = async () => {
      const chartData = await fetchHistoricalData();
      if (!chartData) {
        console.error('Error fetching historical data');
        return;
      }

      const chartLabels = Object.keys(chartData);
      const chartValues = Object.values(chartData);
      const ctx = chartRef.current.getContext('2d');

      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency}`,
              data: chartValues,
              borderColor: 'lightgreen',
              backgroundColor: 'transparent',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: false,
          scales: {
            x: {
              display: true,
              max: 'auto',
            },
            y: {
              display: true,
              beginAtZero: true,
            },
          },
        },
      });
    };

    const fetchHistoricalData = async () => {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 90);
      const startDateString = startDate.toISOString().split('T')[0];
      const apiUrl = `https://api.frankfurter.app/${startDateString}..${endDate}?from=${fromCurrency}&to=${toCurrency}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = data?.rates || {};
        return Object.keys(rates).reduce((chartData, date) => {
          chartData[date] = rates[date][toCurrency];
          return chartData;
        }, {});
      } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
      }
    };

    buildChart();
  }, [fromCurrency, toCurrency]);

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          onBlur={handleAmountBlur}
        />
        <select
          value={fromCurrency}
          onChange={(e) => handleFromCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => handleToCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>{result}</span>
        <br />
        <br />
        <button onClick={handleSwapCurrencies}>Swap</button>
      </div>
      <br />
      <canvas ref={chartRef} width={750} height={200}></canvas>
    </div>
  );
}

export default CurrencyConverter;
