import { useState, useEffect } from 'react';

const ITEMS = [
  { id: 'timeline', title: 'Linea de tiempo' },
  { id: 'preferencias', title: 'Preferencias' },
  { id: 'playlists', title: 'Playlists' },
]

function Divider() {
  const [activeSection, setActiveSection] = useState('timeline');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeItem = ITEMS.find(item => item.id === activeSection);

  return (
    <div className="flex gap-6 py-4 border-b border-[--spotify-light-gray]">
      <span
        onClick={() => scrollToSection(activeItem?.id)}
        className="font-semibold text-[--spotify-green] cursor-pointer"
      >
        {activeItem?.title}
      </span>
    </div>
  );
}

export default Divider;
