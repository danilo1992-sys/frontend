import { useState } from 'react';

const PDF_API = '/api/pdf';

export default function DownloadPDF({ event }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const payload = {
        id: event.id,
        nombre: event.nombre,
        fecha: event.fecha,
        direccion: event.direccion,
        descripcion: event.descripcion || '',
          actividades: event.timeline?.map(t => {
            const date = new Date(t.hora);
            const hora = date.getHours() + date.getMinutes() / 60;
            return { hora, actividad: t.actividad };
          }) || [],
      };
      console.log('PDF payload:', JSON.stringify(payload, null, 2));

      const res = await fetch(PDF_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error response:', res.status, errorBody);
        throw new Error(`Error ${res.status}: ${errorBody}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `evento_${event.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download failed:', err);
      alert(err.message || 'Error al generar el PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-6 py-3 rounded-lg font-semibold bg-[--spotify-green] text-black hover:bg-[#1ed760] disabled:opacity-50 border-2 border-white cursor-pointer"
    >
      {loading ? 'Generando PDF...' : 'Descargar PDF'}
    </button>
  );
}
