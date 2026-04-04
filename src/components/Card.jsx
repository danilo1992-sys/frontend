import { useState, useEffect } from 'react';
import Badge from './Badge';
import Trash from './icons/Trash';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function Card() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://localhost:3000/eventos');
        if (!response.ok) throw new Error('Error');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col gap-3">
      {events.map((e) => (
        <a 
          key={e.id} 
          href="/evento" 
          className="w-full mt-6 cursor-pointer block border-2 rounded-lg p-4 flex flex-col justify-between" 
          style={{ borderColor: 'var(--spotify-green)', backgroundColor: 'var(--spotify-dark)', color: 'white', minHeight: '120px' }}
        >
          <div>
            <h5 className="mb-2.5 font-bold" style={{ color: 'var(--spotify-green)' }}>{e.nombre}</h5>
            <p className="text-sm" style={{ color: 'var(--spotify-gray)' }}>{formatDate(e.fecha)}</p>
            <p className="text-sm" style={{ color: 'var(--spotify-gray)' }}>{e.direccion}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <Badge id={e.id} />
            <Trash id={e.id} onDelete={handleDelete} />
          </div>
        </a>
      ))}
    </div>
  );
}
