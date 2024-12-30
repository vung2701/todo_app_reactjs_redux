import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/apiAuth';
import styles from './headers.module.css';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
export default function RightMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <ul className={`${styles.rightMenus}`}>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  );
}
