import { useState } from 'react';
import Add from './icons/Add';
import Trash from './icons/Trash';
const TimelineSection = ({
  actividades: initialActividades = [],
  onChange
}) => {
  const [actividades, setActividades] = useState(initialActividades);

  const handleAddActividad = () => {
    const newActividades = [...actividades, { hora: '', actividad: '' }];
    setActividades(newActividades);
    onChange?.(newActividades);
  };

  const handleRemoveActividad = (index) => {
    const newActividades = actividades.filter((_, i) => i !== index);
    setActividades(newActividades);
    onChange?.(newActividades);
  };

  const handleChange = (index, field, value) => {
    const newActividades = actividades.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setActividades(newActividades);
    onChange?.(newActividades);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[--spotify-green]">Agenda del Evento</h3>
        <button 
          type="button" 
          onClick={handleAddActividad} 
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[--spotify-green] text-black hover:bg-[#1ed760] hover:text-black cursor-pointer border-white text-white border-2"
        >
          <Add />
          Agregar actividad
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {actividades.length === 0 ? (
          <p className="text-[--spotify-gray] text-center py-4">No hay actividades programadas</p>
        ) : (
          actividades.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark]">
              <input
                type="time"
                name={`actividades[${index}][hora]`}
                value={item.hora}
                onChange={(e) => handleChange(index, 'hora', e.target.value)}
                required
                className="p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white focus:outline-none focus:border-[#1db954] focus:ring-4 focus:ring-[rgba(29,185,84,0.2)]"
              />
              <input
                type="text"
                name={`actividades[${index}][actividad]`}
                value={item.actividad}
                onChange={(e) => handleChange(index, 'actividad', e.target.value)}
                placeholder="Descripción de la actividad"
                required
                className="flex-1 p-3 border-2 border-[--spotify-green] rounded-lg bg-[--spotify-dark] text-white focus:outline-none focus:border-[#1db954] focus:ring-4 "
              />
              <button
                type="button"
                className="p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 border-solid"
                title="Eliminar"
                onClick={() => handleRemoveActividad(index)}
              >
                <Trash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimelineSection;
