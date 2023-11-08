import styles from './miniature.module.css';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  const [message , setMessage] = useState('');
  
  function convertTime(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const hoursAgo = timeDifference / (1000 * 60 * 60);
  
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
    navigate(`/conversation/${data._id}/${data.members.filter(member => member._id !== localStorage.id)[0]._id}`)
  }


  useEffect(() => {
    console.log(data)
    setMessage(data.messages[0]);
  }, [])
 
  return (
    <div onClick={handleClick} key={data._id} className={styles.miniature}>
      <div className={styles.avatar}><img src={avatar} alt='avatar' /></div>
      <div className={styles.info}>
        <div className={styles.name}>{getUsername(data.members)}</div>
        <div className={styles.container}>
          <div className={styles.text}>{message ? message.from._id === localStorage.id ? `You: ${message.text.substring(0, 30)}` : message.text.substring(0, 30) : null}</div>
          {message ? <span className={styles.dot}>•</span> : null}
          <div className={styles.date}>{message ? convertTime(message.createdAt) : null}</div>
        </div>
      </div>
    </div>
  )
}

export default Miniature;
export { getUsername, getAvatar };