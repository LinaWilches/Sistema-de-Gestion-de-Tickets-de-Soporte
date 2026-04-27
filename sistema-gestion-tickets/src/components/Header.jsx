import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#004c8f', // Fondo azul ETB
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        color: '#00ffff',      // Texto cian ETB
        fontFamily: "'Lexend', sans-serif",
        fontWeight: 800,       // ExtraBold
        margin: 0,
        fontSize: '2.5rem',
        letterSpacing: '-1px'
      }}>
        eTb
      </h1>
    </header>
  );
};

export default Header;