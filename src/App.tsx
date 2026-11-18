import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductManagementPage } from './pages/ProductManagementPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/admin/productos" element={<ProductManagementPage />} />
      <Route path="*" element={<NotFoundPage />} /> //caso de rutas inexistente
    </Routes>
  );
}
