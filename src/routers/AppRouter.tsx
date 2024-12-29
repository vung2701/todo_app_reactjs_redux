import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layouts from '../layouts/Layouts';
import Login from '../pages/Auth/Login';
import Unauthorized from '../pages/Unknown/Unauthorized';
import NotFound from '../pages/Unknown/NotFound';
import Task from '../pages/Task/Task';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layouts />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
      </Route>
    </Routes>
  );
}
