import { useState, useEffect } from 'react';
import Header from './components/Header';
import TicketCard from './components/TicketCard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/tickets')
      .then(response => {
        if (!response.ok) throw new Error('Error al conectar con la API');
        return response.json();
      })
      .then(data => {
        setTickets(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="container">
        <h2>Gestión de Tickets</h2>
        
        {/* Indicador de carga y error  */}
        {cargando && <p>Cargando tickets...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="ticket-list">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;