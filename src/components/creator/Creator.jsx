import styles from './creator.module.css';
import plus from '../../assets/plus.svg';
import { useState } from 'react';
import Users from '../users/Users';

const Creator = () => {

  const [isActive, setIsActive] = useState(false);
  
  const [searchActive, setSearchActive] = useState(false);

  const handleClick = () => {
    if (isActive) {
     return setIsActive(false);
    }
    return setIsActive(true);
  }

  const showSearch = () => {
    setIsActive(false);
    return setSearchActive(true);
  }

  return (
    <>
      <div onClick={handleClick} className={styles.creator}>
        <img src={plus} alt="add" />
      </div>
      <div className={`${styles.menu} ${isActive ? styles.slideIn : null}`}>
        <div onClick={showSearch} className={styles.btn}>New conversation</div>
      </div>
      {searchActive && <Users setSearchActive={setSearchActive}/>}
    </>
  )
}

export default Creator;