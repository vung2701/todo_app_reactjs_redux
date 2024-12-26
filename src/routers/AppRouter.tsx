import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Unauthorized from '../pages/Unknown/Unauthorized';
import NotFound from '../pages/Unknown/NotFound';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* ----------------Unknown------------ */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* ----------------home------------ */}
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
