import styles from './header.module.css';
import logo from '../../assets/logo.png';
import logo_white from '../../assets/logo_white.png';
import menu from '../../assets/menu.svg';

const Header = () => {

  const headerStyling = localStorage.token ? `${styles.header} ${styles.loggedIn}` : styles.header;
  
  return (
    <header className={headerStyling}>
      {
      localStorage.token && 
      <div className={styles.nav}>
        <img className={styles.navBtn} src={menu} alt="menu" />
      </div>
      }
      <img className={localStorage.token ? `${styles.logo} ${styles.loggedInLogo}`: styles.logo } src={!localStorage.token ? logo : logo_white} alt="logo" />
    </header>
  )
}

export default Header;