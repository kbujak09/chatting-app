import styles from './conversation.module.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsername, getAvatar } from '../miniature/Miniature';
import avatar from '../../assets/avatar.png';

const Conversation = () => {

  const location = useLocation();

  const [data, setData] = useState();

  const conversationId = location.pathname.split('/')[2];

  const fetchConversation = async () => {
    try {
      const res = await fetch(`http://192.168.0.15:5000/api/conversations/${conversationId}`);

      if (!res.ok) {
        console.error(`Failed to fetch conversations: ${res.status}`);
      }

      const data = await res.json();

      if (data) {
        await setData(data);
        console.log(data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getMessages = (arr) => {
    return arr.reverse().map(message => {
      if (message.from === localStorage.id) {
        return <div className={`${styles.message} ${styles.yourMessage}`}>{message.text}</div>
      }
      else {
        return <div className={styles.message}>{message.text}</div>
      }
    })
  }

  useEffect(() => {
    fetchConversation();
  }, [])

  return (
    data && 
    <div className={styles.conversation}>
      <div className={styles.user}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        {getUsername(data.conversation.members)}
      </div>
      <div className={styles.messages}>{getMessages(data.conversation.messages)}</div>
      <div className={styles.addMessage}>
        <div className={styles.more}>+</div>
        <input className={styles.input} type="text" />
        <div className={styles.reaction}>reaction</div>
      </div>
    </div>
  )
}

export default Conversation;