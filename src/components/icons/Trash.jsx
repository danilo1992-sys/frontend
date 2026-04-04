import React from 'react';

export default function Trash({ id, onDelete }) {
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        const response = await fetch(`http://localhost:3000/eventos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          onDelete?.(id);
        } else {
          alert('Error al eliminar el evento');
        }
      } catch (error) {
        alert('Error al eliminar el evento');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg> 
    </button>
  );
}
