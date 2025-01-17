import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layouts from '../layouts/Layouts';
import Login from '../pages/Auth/Login';
import Unauthorized from '../pages/Unknown/Unauthorized';
import NotFound from '../pages/Unknown/NotFound';
import Tasks from '../pages/Task/Tasks';
import Register from '../pages/Auth/Register';
import AddTask from '../pages/Task/events/AddTask';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layouts />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/task/create" element={<AddTask />} />
      </Route>
    </Routes>
  );
}
