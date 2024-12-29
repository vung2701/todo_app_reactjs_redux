import { Footer } from 'antd/es/layout/layout';
import styles from './footers.module.css';

export default function Footers() {
  return <Footer className={styles.footers}> ©{new Date().getFullYear()} All Rights Reserved</Footer>;
}
