import styles from './headers.module.css';
import { Link } from 'react-router-dom';
const Logos = () => {
  return (
    <>
      <div>
        <Link className={styles.logo} to="/">
          Todo App
        </Link>
      </div>
    </>
  );
};
export default Logos;
