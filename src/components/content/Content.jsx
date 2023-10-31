import Miniature from '../miniature/Miniature';
import styles from './content.module.css';

const Content = () => {

  return (
    <div className={styles.content}>
      <Miniature />
    </div>
  )
}

export default Content;