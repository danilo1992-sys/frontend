import Button from './Button';

const ITEMS = [
  { title: 'Inicio', label: 'inicio', url: '/' },
  { title: 'Calendario', label: 'calendario', url: '/calendario' },
  { title: 'Perfil', label: 'Perfil', url: '/perfil' }
];

export default function Sidebar() {
  return (
    <aside 
      className="max-w-64 sticky top-0 h-screen flex flex-col "
      style={{ backgroundColor: 'var(--spotify-black)' }}
    >
      <div className="px-2 pt-4">
        <ul className="menu p-0">
          {ITEMS.map((item, index) => (
            <li 
              key={index} 
              className='py-2 mb-2 border-solid border-white border-2 rounded-lg text-center cursor-pointer text-center'
              onClick={() => window.location.href = item.url}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--spotify-green)';
                e.currentTarget.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              <button
                type="button"
                className="w-full bg-none border-none cursor-pointer flex items-center justify-center gap-2"
                style={{ color: 'white' }}
              >
                <span className="icon-[tabler--home] size-5"></span>
                {item.title}
              </button>
            </li>
          ))}
          <li className='py-2 pt-6'>
            <Button href="/nuevo-evento">+ Nuevo evento</Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
