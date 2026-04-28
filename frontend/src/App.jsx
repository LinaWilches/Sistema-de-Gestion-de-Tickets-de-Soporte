import { useState, useEffect } from 'react';
import Header from './components/Header';
import TicketForm from './components/TicketForm';
import TicketCard from './components/TicketCard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo para mostrar nombres en los filtros
  const nombresFiltros = {
    'Todos': 'Todos',
    'abierto': 'Abierto',
    'en_progreso': 'En Progreso',
    'cerrado': 'Cerrado'
  };

  // Carga inicial de datos desde la API Mock
  useEffect(() => {
    fetch('http://localhost:3001/tickets')
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con la API de soporte ETB.');
        return res.json();
      })
      .then(data => setTickets(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtrado dinámico en el cliente
  const filtrados = tickets.filter(t => filtro === 'Todos' || t.estado === filtro);

  // Función para agregar el nuevo ticket a la lista localmente
  const handleTicketCreated = (nuevoTicket) => {
    setTickets(prevTickets => [nuevoTicket, ...prevTickets]);
  };

  return (
    <>
      <Header />
      <main className="app-container">
        {/* Formulario de creación */}
        <TicketForm onTicketCreated={handleTicketCreated} />

        <section className="list-section">
          {/* Contenedor de Filtros con Conteo Dinámico */}
          <div className="filters-container">
            {['Todos', 'abierto', 'en_progreso', 'cerrado'].map(f => {
              const conteo = tickets.filter(t => f === 'Todos' || t.estado === f).length;
              return (
                <button 
                  key={f} 
                  onClick={() => setFiltro(f)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    // Estilos de identidad visual ETB para filtros
                    backgroundColor: filtro === f ? 'var(--etb-blue)' : 'white',
                    color: filtro === f ? 'white' : '#718096',
                    border: filtro === f ? 'none' : '1px solid #D0D7DE'
                  }}
                >
                  {nombresFiltros[f]} ({conteo})
                </button>
              );
            })}
          </div>

          {/* Zona de contenido con Spinner centrado o Listado (RF-01) */}
          {loading ? (
            <div className="tickets-loading-zone">
              <div className="spinner"></div>
              <p style={{ marginTop: '15px', fontWeight: 600 }}>Sincronizando con soporte ETB...</p>
            </div>
          ) : error ? (
            <div className="tickets-loading-zone" style={{ color: '#C53030' }}>
              <span style={{ fontSize: '3rem' }}>⚠️</span>
              <p><strong>Error:</strong> {error}</p>
            </div>
          ) : (
            <div className="tickets-grid">
              {filtrados.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#718096', marginTop: '40px' }}>
                  No se encontraron tickets en estado "{nombresFiltros[filtro]}".
                </p>
              ) : (
                filtrados.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;   