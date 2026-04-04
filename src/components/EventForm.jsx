import { useState } from 'react';
import TimelineSection from './TimelineSection';
import Spinner from './Spinner';

const EventForm = ({ event }) => {
  const [formData, setFormData] = useState({
    nombre: event?.nombre || '',
    fecha: event?.fecha || '',
    direccion: event?.direccion || '',
    descripcion: event?.descripcion || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [actividades, setActividades] = useState(event?.actividades || []);

  const isEditing = !!event?.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing 
        ? `http://localhost:3000/eventos/${event?.id}` 
        : 'http://localhost:3000/eventos';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert('Error al guardar: ' + (errorData.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 max-w-md mx-auto"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="font-semibold text-[--spotify-green]">
            Nombre del evento
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa el nombre del evento"
            required
            className="p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white focus:outline-none focus:border-[#1db954] focus:ring-4 focus:ring-[rgba(29,185,84,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fecha" className="font-semibold text-[--spotify-green]">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white focus:outline-none focus:border-[#1db954] focus:ring-4 focus:ring-[rgba(29,185,84,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="direccion" className="font-semibold text-[--spotify-green]">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ingresa la dirección"
            required
            className="p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white focus:outline-none focus:border-[#1db954] focus:ring-4 focus:ring-[rgba(29,185,84,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="font-semibold text-[--spotify-green]">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe el evento..."
            className="p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white resize-y focus:outline-none focus:border-[#1db954] focus:ring-4 focus:ring-[--spotify-green]"
          />
        </div>

        <TimelineSection actividades={actividades} />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-lg font-semibold text-center no-underline bg-[--spotify-green] text-black hover:bg-[#1ed760] disabled:opacity-50 border-white text-white border-2 hover:text-black cursor-pointer"
          >Nuevo Evento
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-lg font-semibold text-center no-underline border-2 border-[--spotify-gray] text-[--spotify-gray] hover:border-white hover:text-white"
          >
            Cancelar
          </a>
        </div>
      </form>
      <Spinner />
    </>
  );
};

export default EventForm;
