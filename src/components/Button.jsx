export default function Button({ children, href, variant = 'primary', className = '' }) {
  const baseClasses = 'font-semibold px-6 py-2 rounded-lg transition-colors';
  
  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${variant === 'primary' 
          ? 'bg-[var(--spotify-green)] text-black hover:bg-[#1ed760]' 
          : 'border-2 border-[var(--spotify-gray)] text-[var(--spotify-gray)] hover:border-white hover:text-white'} ${className}`}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button className={`${baseClasses} bg-[var(--spotify-green)] text-black hover:bg-[#1ed760] ${className}`}>
      {children}
    </button>
  );
}
