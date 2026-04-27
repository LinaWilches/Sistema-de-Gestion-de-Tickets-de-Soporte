const Header = () => (
  <header style={{ 
    backgroundColor: 'var(--etb-blue)', 
    height: 'var(--header-height)',
    width: '100%', position: 'fixed', top: 0, z_index: 1000,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  }}>
    <h1 style={{ color: 'var(--etb-cyan)', fontWeight: 800, fontSize: '2.2rem', margin: 0 }}>eTb</h1>
  </header>
);
export default Header;