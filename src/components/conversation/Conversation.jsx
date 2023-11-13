import styles from './conversation.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUsername, getAvatar } from '../miniature/Miniature';
import avatar from '../../assets/avatar.png';
import send from '../../assets/send.svg';
import image from '../../assets/image.svg';
import back from '../../assets/back.svg';
import io from 'socket.io-client';

const socket = io.connect("https://blue-wildflower-7641.fly.dev", {
  transports: ['websocket'],
});

const Conversation = () => {

  const textareaRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const initialHeight = '2.8rem';
  const conversationId = location.pathname.split('/')[2];
  const toId = location.pathname.split('/')[3]
  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;
  const rooms = [toId, localStorage.id];

  const [data, setData] = useState();

  const [inputValue, setInputValue] = useState('');

  const [from, setFrom] = useState('');

  const [to, setTo] = useState('');

  const [messages, setMessages] = useState([]);

  const joinRoom = (user) => {
    socket.emit('join_room', user);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!from || !to || !inputValue) {
      return;
    }
    try {
      const res = await fetch('https://blue-wildflower-7641.fly.dev/api/messages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify({from: from, to: to, text: inputValue})
      })
      if (!res.ok) {
        console.error(`Failed to send a message: ${res.status}`);
      }
      const data = await res.json();

      if (data) {
        setInputValue('');
        await setMessages([{ 
          'from': data.from, 
          'to': data.to, 
          'text': data.text,
          'createdAt': new Date()
        }, ...messages])
        const newMessage = {
          from: data.from,
          to: data.to,
          text: data.text,
          createdAt: data.createdAt 
        }
        socket.emit('send_message', {newMessage, toId})
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchConversation = async () => {
    try {
      const res = await fetch(`https://blue-wildflower-7641.fly.dev/api/conversations/${conversationId}`, {
        headers: {
          Authorization: bearer,
        }
      });

      if (!res.ok) {
        console.error(`Failed to fetch conversations: ${res.status}`);
      }

      const data = await res.json();

      if (data) {
        await setData(data);
        setTo(data.conversation.members.filter(member => member._id !== localStorage.id)[0]._id);
        setFrom(data.conversation.members.filter(member => member._id === localStorage.id)[0]._id);
        setMessages([...data.conversation.messages])
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const getMessages = (arr) => {
    return arr.map(message => {
      if (message.from === localStorage.id && message.to === toId) {
        return <div key={message._id} className={`${styles.message} ${styles.yourMessage}`}>{message.text}</div>
      }
      else if (message.to === localStorage.id && message.from === toId) {
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
    joinRoom(rooms);
    fetchConversation();
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = initialHeight;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);
  
  // const receiveMessage = (data) => {  
  //   console.log(data)
  //   const arr = [data.from, data.to]
  //   if (arr.includes(from) && arr.includes(to)) {
  //     setMessages(prevMessages => [data, ...prevMessages]);
  //   }
  // }

  const getNewMessages = (data) => {
    setMessages((prevMessages) => [data, ...prevMessages])
  }

  useEffect(() => {
    socket.on('receive_message', getNewMessages)

    return () => {
      socket.off('receive_message', getNewMessages)
    }
  }, [socket])


  return (
    data && 
    <div className={styles.conversation}>
      <div className={styles.user}>
        <img src={back} alt="back" onClick={getBack} className={styles.back}/>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        {getUsername(data.conversation.members)}
      </div>
      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {getMessages(messages)}
        </div>
      </div>
      <div className={styles.addMessage}>
        <img src={image} alt="addImage" className={styles.addImage}/>
        <form onSubmit={sendMessage} className={styles.messageForm}>
          <textarea 
            ref={textareaRef}
            value={inputValue} 
            onChange={handleChange} 
            className={styles.input}
            maxLength={250} 
            type="text"
            style={{ height: initialHeight }}>
          </textarea>
          <button className={styles.sendButton}><img src={send} alt="send" className={styles.sendMessage} /></button>
        </form>
      </div>
    </div>
  )
}

export default Conversation;