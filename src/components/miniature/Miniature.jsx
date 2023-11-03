import styles from './miniature.module.css';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const getUsername = (arr) => {
  const user = arr.filter(item => item._id !== localStorage.id);
  return user[0].username;
}

const getAvatar = (arr) => {
  const user = arr.filet(item => item._id !== localStorage.id);
  if (user[0].avatar) {
    return user[0].avatar;
  }
  else {
    return;
  }
}

const Miniature = ({data}) => {

  const navigate = useNavigate();
  
  function convertTime(dateString) {
    console.log(dateString)
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const hoursAgo = timeDifference / (1000 * 60 * 60);

    console.log(timeDifference)
  
    let formattedDate;
  
    if (hoursAgo < 24) {
      formattedDate = inputDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (hoursAgo < 24 * 365.25) {
      formattedDate = inputDate.toLocaleString('en-UK', { day: 'numeric', month: '2-digit', year: '2-digit'});
    } else {
      formattedDate = Math.floor(hoursAgo / 24 / 365.25) + ' years ago';
    }
  
    return formattedDate;
  }

  const handleClick = () => {
    navigate(`/conversation/${data._id}`)
  }

  const message = data.messages[0];
 
  return (
    <div onClick={handleClick} className={styles.miniature}>
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
export { getUsername, getAvatar };