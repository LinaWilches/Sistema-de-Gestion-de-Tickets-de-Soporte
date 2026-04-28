const Header = () => (
  <header style={{ 
    backgroundColor: 'var(--etb-blue)', 
    height: 'var(--header-height)',
    width: '100%', position: 'fixed', top: 0, zIndex: 1000,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  }}>
    <img 
        src="/ETB-Logo.png" 
        alt="Logo ETB" 
        style={{ 
          height: '60px',
          width: 'auto',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1)'
        }} 
      />
  </header>
);
export default Header;