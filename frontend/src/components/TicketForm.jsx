import { useState } from 'react';

const TicketForm = ({ onTicketCreated }) => {
  // Inputs controlados - valor ligado al estado de React 
  const [form, setForm] = useState({ nombre: '', descripcion: '', estado: 'abierto' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos vacíos antes de hacer el POST
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      setExito(false);
      return;
    }

    try {
      // Petición POST al endpoint /tickets
      const res = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...form, 
          fecha: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        })
      });

      if (res.ok) {
        const nuevoTicket = await res.json();
        
        // Notifica al componente padre para ver el ticket nuevo inmediatamente 
        onTicketCreated(nuevoTicket); 
        
        // Limpiar formulario tras creación exitosa 
        setForm({ nombre: '', descripcion: '', estado: 'abierto' });
        setError('');
        setExito(true);

        // Feedback visual: Ocultar alerta de éxito tras 3 segundos
        setTimeout(() => setExito(false), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <aside style={{ 
      backgroundColor: 'white', 
      padding: '25px', 
      borderRadius: '12px',
      border: '1px solid #D0D7DE', 
      position: 'sticky', 
      top: '120px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ color: 'var(--etb-blue)', marginTop: 0, marginBottom: '20px' }}>Nuevo Ticket</h2>
      
      {/* Alerta de Éxito Visual */}
      {exito && (
        <div style={{ 
          backgroundColor: '#def7ec', color: '#03543f', padding: '10px', 
          borderRadius: '8px', marginBottom: '15px', fontWeight: 600,
          textAlign: 'center', border: '1px solid #84e1bc', fontSize: '0.9rem'
        }}>
          ✅ Ticket creado con éxito
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campo Nombre [cite: 33, 45] */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>
            Nombre del cliente
          </label>
          <input 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'Lexend' }} 
            type="text"
            placeholder="Ej: Ana Torres"
            value={form.nombre} 
            onChange={e => setForm({...form, nombre: e.target.value})} 
          />
        </div>
        
        {/* Campo Descripción */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>
            Descripción del problema
          </label>
          <textarea 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px', fontFamily: 'Lexend' }} 
            placeholder="Detalle de la solicitud..."
            value={form.descripcion} 
            onChange={e => setForm({...form, descripcion: e.target.value})} 
          />
        </div>

        {/* Campo Estado */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>
            Estado inicial
          </label>
          <select 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'Lexend', cursor: 'pointer' }} 
            value={form.estado} 
            onChange={e => setForm({...form, estado: e.target.value})}
          >
            <option value="abierto">Abierto</option>
            <option value="en_progreso">En progreso</option>
            <option value="cerrado">Cerrado</option>
          </select>
        </div>

        {/* Mensaje de error si la validación falla */}
        {error && (
          <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 600 }}>
            ⚠️ {error}
          </p>
        )}
        
        {/* Botón primario azul */}
        <button type="submit" style={{ 
          width: '100%', 
          backgroundColor: 'var(--etb-blue)', 
          color: 'white', 
          padding: '12px', 
          border: 'none', 
          borderRadius: '8px', 
          fontWeight: 800, 
          cursor: 'pointer',
          fontFamily: 'Lexend',
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.target.style.opacity = '0.9'}
        onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Crear Ticket
        </button>
      </form>
    </aside>
  );
};

export default TicketForm;