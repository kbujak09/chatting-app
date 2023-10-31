import styles from './header.module.css';
import logo from '../../assets/logo.png';
import logo_white from '../../assets/logo_white.png';
import menu from '../../assets/menu.svg';
import Menu from '../menu/Menu';
import { useState } from 'react';

const Header = () => {

  const [isActive, setIsActive] = useState(false);

  const headerStyling = localStorage.token ? `${styles.header} ${styles.loggedIn}` : styles.header;
  
  const toggleMenu = () => {
    if (isActive) {
      return setIsActive(false);
    }
    return setIsActive(true);
  }

  return (
    <>
      <header className={headerStyling}>
        {
        localStorage.token && 
        <div onClick={toggleMenu} className={styles.nav}>
          <img className={styles.navBtn} src={menu} alt="menu" />
        </div>
        }
        <img className={localStorage.token ? `${styles.logo} ${styles.loggedInLogo}`: styles.logo } src=  {!localStorage.token ? logo : logo_white} alt="logo" />
      </header>
      <Menu isActive={isActive} setIsActive={setIsActive}/>
    </>
  )
}

export default Header;