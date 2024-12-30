import { Header } from 'antd/es/layout/layout';
import styles from './headers.module.css';
import Logos from './Logos';
import Menus from './Menus';
import RightMenu from './RightMenu';

export default function Headers() {
  return (
    <Header className={`${styles.headers}`}>
      <Logos />
      <Menus />
      <RightMenu />
    </Header>
  );
}
