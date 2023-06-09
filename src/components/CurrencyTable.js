import React from 'react';

function CurrencyTable({ baseCurrency, exchangeRates, currencies, onBaseCurrencyChange }) {
  return (
    <div className="currency-table">
      <h2>Exchange Rates</h2>
      <select value={baseCurrency} onChange={(e) => onBaseCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
<table>
  <thead>
    <tr>
      <th>Currency</th>
      <th>Rate</th>
      <th>Currency</th>
      <th>Rate</th>
      <th>Currency</th>
      <th>Rate</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(exchangeRates).map((currency, index) => {
      if (index % 3 === 0) {
        return (
          <tr key={currency}>
            <td>{currency}</td>
            <td>{exchangeRates[currency]}</td>
            {Object.keys(exchangeRates)[index + 1] && (
              <>
                <td>{Object.keys(exchangeRates)[index + 1]}</td>
                <td>{exchangeRates[Object.keys(exchangeRates)[index + 1]]}</td>
              </>
            )}
            {Object.keys(exchangeRates)[index + 2] && (
              <>
                <td>{Object.keys(exchangeRates)[index + 2]}</td>
                <td>{exchangeRates[Object.keys(exchangeRates)[index + 2]]}</td>
              </>
            )}
          </tr>
        );
      }
      return null;
    })}
  </tbody>
</table>
    </div>
  );
}

export default CurrencyTable;