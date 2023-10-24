import styles from './header.module.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="logo" />
    </header>
  )
}

export default Header;