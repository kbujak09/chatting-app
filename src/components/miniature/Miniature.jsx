import styles from './miniature.module.css';
import avatar from '../../assets/avatar.png';

const Miniature = ({data}) => {

  const getUsername = (arr) => {
    const user = arr.filter(item => item._id !== localStorage.id);
    return user[0].username;
  }
  
  function convertTime(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const hoursAgo = timeDifference / (1000 * 60 * 60);
  
    let formattedDate;
  
    if (hoursAgo < 24) {
      formattedDate = inputDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (hoursAgo < 24 * 365.25) {
      formattedDate = inputDate.toLocaleString('en-US', { day: 'numeric' });
    } else {
      formattedDate = Math.floor(hoursAgo / 24 / 365.25) + ' years ago';
    }
  
    return formattedDate;
  }

  const message = data.messages[0];
 
  return (
    <div className={styles.miniature}>
      <div className={styles.avatar}><img src={avatar} alt='avatar' /></div>
      <div className={styles.info}>
        <div className={styles.name}>{getUsername(data.members)}</div>
        <div className={styles.container}>
          <div className={styles.text}>{message.from._id === localStorage.id ? `You: ${message.text.substring(0, 30)}` : message.text.substring(0, 30)}</div>
          <span className={styles.dot}>•</span>
          <div className={styles.date}>{convertTime(message.createdAt)}</div>
        </div>
      </div>
    </div>
  )
}

export default Miniature;