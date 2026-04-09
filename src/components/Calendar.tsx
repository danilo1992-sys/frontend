"use client";
import { useState, useEffect } from "react";

interface Evento {
  id?: string;
  nombre: string;
  fecha: string;
  direccion: string;
  descripcion: string;
  timeline?: { id: string; hora: string; actividad: string; descripcion: string; tipo: string; eventoId: string }[];
}

export default function Calendar() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        const todayStr = formatDate(new Date());
        const todayEvent = data.find((e: Evento) => getDateOnly(e.fecha) === todayStr);
        if (todayEvent) {
          setSelectedEvent(todayEvent);
        }
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDateOnly = (dateStr: string) => {
    return dateStr.split("T")[0];
  };

  const getTimeOnly = (dateStr: string) => {
    const time = dateStr.split("T")[1];
    return time ? time.split(".")[0].substring(0, 5) : "";
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayStr}`;

    return events.filter((event) => getDateOnly(event.fecha) === dateStr);
  };

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[var(--spotify-dark)] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-[var(--spotify-green)] text-black rounded hover:opacity-80"
          >
            ←
          </button>
          <h2 className="text-xl font-bold text-[var(--spotify-green)]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-[var(--spotify-green)] text-black rounded hover:opacity-80"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-[var(--spotify-gray)] py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isToday =
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const isSelected = selectedEvent && dayEvents.some(e => e.id === selectedEvent.id);
            
            return (
              <div
                key={index}
                onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
                className={`min-h-[80px] p-1 border border-[var(--spotify-gray)] rounded cursor-pointer transition-all ${
                  day ? "bg-[var(--spotify-black)]" : "bg-transparent"
                } ${isToday ? "border-[var(--spotify-green)] border-2" : ""} ${isSelected ? "ring-2 ring-[var(--spotify-green)]" : ""} ${dayEvents.length > 0 ? "hover:bg-[var(--spotify-dark)]" : ""}`}
              >
                {day && (
                  <>
                    <span className={`text-sm ${isToday ? "text-[var(--spotify-green)] font-bold" : "text-white"}`}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <p className="text-xs text-white mt-1 truncate font-medium">
                        {dayEvents[0].nombre}
                      </p>
                    )}
                    {dayEvents.length > 1 && (
                      <p className="text-xs text-[var(--spotify-green)]">
                        +{dayEvents.length - 1} más
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedEvent && (
        <div className="bg-[var(--spotify-dark)] rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-[var(--spotify-green)]">{selectedEvent.nombre}</h3>
              <p className="text-sm text-[var(--spotify-gray)]">{getDateOnly(selectedEvent.fecha)}</p>
              <p className="text-sm text-white">{selectedEvent.direccion}</p>
              <p className="text-sm text-[var(--spotify-gray)] mt-2">{selectedEvent.descripcion}</p>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-3 py-1 bg-[var(--spotify-gray)] text-black rounded hover:opacity-80"
            >
              ✕
            </button>
          </div>
          
          {selectedEvent.timeline && selectedEvent.timeline.length > 0 && (
            <div className="border-t border-[var(--spotify-gray)] pt-2 mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Timeline</h4>
              {selectedEvent.timeline.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--spotify-gray)]">{item.actividad}</span>
                  <span className="text-[var(--spotify-green)]">{getTimeOnly(item.hora)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedEvent && (
        <div className="bg-[var(--spotify-dark)] rounded-lg p-4 text-center text-[var(--spotify-gray)]">
          <p>Selecciona un evento del calendario</p>
        </div>
      )}
    </div>
  );
}
