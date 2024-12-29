import { Link, useLocation } from 'react-router-dom';
import styles from './headers.module.css';

export default function Menus() {
  const location = useLocation();
  return (
    <div className={`${styles.menus}`}>
      <ul>
        <li className={`${styles.menuItem} ${location.pathname.includes('/employee') ? styles.active : ''}`}>
          <Link to="/employee">Employee</Link>
        </li>
      </ul>
    </div>
  );
}
