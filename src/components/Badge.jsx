export default function Badge({ id }) {
  return (
    <span className="badge" style={{ backgroundColor: 'var(--spotify-green)', color: 'var(--spotify-black)', fontWeight: 'bold' }}>
      {id}
    </span>
  );
}
