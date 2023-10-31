import styles from './miniature.module.css';
import avatar from '../../assets/avatar.png';

const Miniature = () => {
  return (
    <div className={styles.miniature}>
      <div className={styles.avatar}><img src={avatar} alt='avatar' /></div>
      <div className={styles.info}>
        <div className={styles.name}>Kacper Bujak</div>
        <div className={styles.container}>
          <div className={styles.text}>Hello world!</div>
          <span className={styles.dot}>•</span>
          <div className={styles.date}>14:25</div>
        </div>
      </div>
    </div>
  )
}

export default Miniature;