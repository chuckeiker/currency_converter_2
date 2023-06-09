import React from 'react';

function Footer({ portfolioLink }) {
  return (
    <footer>
      <p>
        <a
          href="https://chuckeiker.carrd.co/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '40px',
            textDecoration: 'none',
            color: '#CBCBCB',
            fontWeight: 'bold',
            fontFamily: 'Taprom, sans-serif',
          }}
        >
          Chuck Eiker Portfolio
        </a>
      </p>
    </footer>
  );
}

export default Footer;
