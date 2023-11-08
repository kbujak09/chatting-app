import styles from './menu.module.css';
import { useNavigate } from 'react-router-dom';

const Menu = ({isActive, setIsActive}) => {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear();
    setIsActive(false);
    navigate('/login');
  }

  return (
    <div className={isActive ? `${styles.menu} ${styles.active}` : styles.menu}>
      <div onClick={logOut} className={styles.logOut}>log out</div>
    </div>
  )
}

export default Menu;