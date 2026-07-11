import Button from './Button';
import { $authStore, $clerkStore } from '@clerk/astro/client';
import { useStore } from '@nanostores/react';
import { navigate } from 'astro:transitions/client';

const ITEMS = [
  { title: 'Inicio', label: 'inicio', url: '/' },
  { title: 'Calendario', label: 'calendario', url: '/calendario' },
  { title: 'Perfil', label: 'Perfil', url: '/perfil' }
];

export default function Sidebar() {
  const auth = useStore($authStore);
  const isSignedIn = !!auth?.userId;

  if (!isSignedIn) return null;

  return (
    <aside 
      className="max-w-64 sticky top-0 h-screen flex flex-col justify-between"
      style={{ backgroundColor: 'var(--spotify-black)' }}
    >
      <div className="px-2 pt-4">
        <ul className="menu p-0">
          {ITEMS.map((item, index) => (
            <li 
              key={index} 
              className='py-2 mb-2 border-solid border-white border-2 rounded-lg text-center cursor-pointer'
              onClick={() => navigate(item.url)}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--spotify-green)';
                e.currentTarget.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="icon-[tabler--home] size-5"></span>
                {item.title}
              </span>
            </li>
          ))}
          <li className='py-2 pt-6'>
            <Button href="/nuevo-evento">+ Nuevo evento</Button>
          </li>
        </ul>
      </div>

      <div className="px-4 pb-4">
        <button 
          onClick={() => {
            const clerk = $clerkStore.get();
            clerk?.signOut().then(() => {
              navigate('/');
            });
          }}
          className="w-full py-2 px-4 rounded-lg font-bold text-sm cursor-pointer transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--spotify-green)', color: 'black' }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
