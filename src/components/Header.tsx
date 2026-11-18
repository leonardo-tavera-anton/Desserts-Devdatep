import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="mb-8">
      <h1 className="text-[40px] font-bold leading-tight text-rose-900">Desserts Devdatep</h1>
      <Link to="/admin/productos">CRUD prueba</Link>
    </header>
  );
};
