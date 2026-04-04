import React from 'react';
import Button from './Button';

const ITEMS = [
  { title: 'Inicio', label: 'inicio', url: '/' },
  { title: 'Calendario', label: 'calendario', url: '/calendario' },
  { title: 'Perfil', label: 'Perfil', url: '/perfil' }
];

export default function Sidebar() {
  return (
    <aside 
      className="max-w-64 sticky top-0 h-screen flex flex-col"
      style={{ backgroundColor: 'var(--spotify-black)' }}
    >
      <div className="px-2 pt-4">
        <ul className="menu p-0">
          {ITEMS.map((item, index) => (
            <li key={index}>
              <a 
                href={item.url} 
                style={{ color: 'white' }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--spotify-green)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <span className="icon-[tabler--home] size-5"></span>
                {item.title}
              </a>
            </li>
          ))}
          <li>
            <Button href="/nuevo-evento">+ Nuevo evento</Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
