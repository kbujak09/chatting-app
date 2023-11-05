import styles from './conversation.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUsername, getAvatar } from '../miniature/Miniature';
import avatar from '../../assets/avatar.png';
import send from '../../assets/send.svg';
import image from '../../assets/image.svg';
import back from '../../assets/back.svg';

const Conversation = () => {

  const textareaRef = useRef();

  const location = useLocation();

  const navigate = useNavigate();

  const [data, setData] = useState();

  const [inputValue, setInputValue] = useState('');

  const initialHeight = '2.8rem';

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
    return arr.map(message => {
      if (message.from === localStorage.id) {
        return <div key={message._id} className={`${styles.message} ${styles.yourMessage}`}>{message.text}</div>
      }
      else {
        return <div key={message._id} className={styles.message}>{message.text}</div>
      }
    })
  }

  const getBack = () => {
    navigate('/')
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetchConversation();
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = initialHeight;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);
  

  return (
    data && 
    <div className={styles.conversation}>
      <div className={styles.user}>
        <img src={back} alt="back" onClick={getBack} className={styles.back}/>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        {getUsername(data.conversation.members)}
      </div>
      <div className={styles.messages}>{getMessages(data.conversation.messages)}</div>
      <div className={styles.addMessage}>
        <img src={image} alt="addImage" className={styles.addImage}/>
        <form className={styles.messageForm}>
          <textarea 
            ref={textareaRef}
            value={inputValue} 
            onChange={handleChange} 
            className={styles.input}
            maxLength={250} 
            type="text"
            style={{ height: initialHeight }}>
          </textarea>
          <img src={send} alt="send" className={styles.sendMessage} />
        </form>
      </div>
    </div>
  )
}

export default Conversation;