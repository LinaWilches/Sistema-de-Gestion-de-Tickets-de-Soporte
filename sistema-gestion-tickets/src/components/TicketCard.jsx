import React from 'react';

const TicketCard = ({ ticket }) => {
  // Función para obtener los estilos del badge según el estado 
  const getBadgeStyles = (estado) => {
    switch (estado) {
      case 'abierto':
        return { backgroundColor: 'var(--bg-abierto)', color: 'var(--text-abierto)' };
      case 'en_progreso':
        return { backgroundColor: 'var(--bg-progreso)', color: 'var(--text-progreso)' };
      case 'cerrado':
        return { backgroundColor: 'var(--bg-cerrado)', color: 'var(--text-cerrado)' };
      default:
        return {};
    }
  };

  return (
    <div className="ticket-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{ticket.nombre}</h3>
        {/* Badge con estilos dinámicos  */}
        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          textTransform: 'capitalize',
          ...getBadgeStyles(ticket.estado)
        }}>
          {ticket.estado.replace('_', ' ')}
        </span>
      </div>
      
      <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '15px' }}>
        {ticket.descripcion}
      </p>
      
      <div style={{ fontSize: '0.8rem', color: '#888' }}>
        📅 {ticket.fecha || 'Sin fecha'}
      </div>
    </div>
  );
};

export default TicketCard;