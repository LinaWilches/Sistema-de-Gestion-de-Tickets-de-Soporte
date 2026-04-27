import { useState } from 'react';

const TicketForm = ({ onTicketCreated }) => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', estado: 'abierto' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      setError('Por favor, completa los campos obligatorios.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fecha: new Date().toISOString().split('T')[0] })
      });
      if (res.ok) {
        onTicketCreated(await res.json());
        setForm({ nombre: '', descripcion: '', estado: 'abierto' });
        setError('');
      }
    } catch { setError('Error de conexión con el servidor.'); }
  };

  return (
    <aside style={{ 
      backgroundColor: 'white', padding: '25px', borderRadius: '12px', 
      border: '1px solid #D0D7DE', position: 'sticky', top: '120px' 
    }}>
      <h2 style={{ color: 'var(--etb-blue)', marginTop: 0, marginBottom: '20px' }}>Nuevo Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>Nombre</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                 placeholder="Nombre del cliente"
                 value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>Descripción</label>
          <textarea style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px' }} 
                    placeholder="Detalle del problema"
                    value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '0.9rem' }}>Estado</label>
          <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
                  value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
            <option value="abierto">Abierto</option>
            <option value="en_progreso">En progreso</option>
            <option value="cerrado">Cerrado</option>
          </select>
        </div>
        {error && <p style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '10px', fontWeight: 600 }}>{error}</p>}
        <button type="submit" style={{ width: '100%', backgroundColor: 'var(--etb-blue)', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
          Crear Ticket
        </button>
      </form>
    </aside>
  );
};
export default TicketForm;