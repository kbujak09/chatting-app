import styles from './popup.module.css';

const Popup = ({data}) => {
  return (
    <div className={styles.container}>
      {data}
    </div>
  )
}

export default Popup;