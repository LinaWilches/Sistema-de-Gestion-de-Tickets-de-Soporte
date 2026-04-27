const TicketCard = ({ ticket }) => {
  const badgeStyles = {
    abierto: { bg: 'var(--bg-abierto)', tx: 'var(--text-abierto)' },
    en_progreso: { bg: 'var(--bg-progreso)', tx: 'var(--text-progreso)' },
    cerrado: { bg: 'var(--bg-cerrado)', tx: 'var(--text-cerrado)' }
  }[ticket.estado];

  return (
    <div style={{ 
      backgroundColor: 'white', border: '1px solid #D0D7DE', borderRadius: '12px', 
      padding: '24px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1a1a1a' }}>{ticket.nombre}</h3>
        <span style={{ 
          backgroundColor: badgeStyles.bg, color: badgeStyles.tx, 
          padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', 
          fontWeight: 800, textTransform: 'uppercase' 
        }}>
          {ticket.estado.replace('_', ' ')}
        </span>
      </div>
      <p style={{ color: '#4a5568', margin: '16px 0', lineHeight: '1.5' }}>{ticket.descripcion}</p>
      <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '12px', fontSize: '0.85rem', color: '#718096' }}>
        <span>📅 {ticket.fecha}</span>
      </div>
    </div>
  );
};
export default TicketCard;