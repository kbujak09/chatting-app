import Miniature from '../miniature/Miniature';
import styles from './content.module.css';
import Creator from '../creator/Creator';
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';


import io from 'socket.io-client';

const socket = io.connect("https://blue-wildflower-7641.fly.dev", {
  transports: ['websocket'],
  });

const Content = () => {

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  const [isLoading, setIsLoading] = useState(true);

  const joinRoom = (user) => {
    socket.emit('join_room', user);
  }

  const [conversations, setConversations] = useState();

  const fetchConversations = async () => {
    try {
      const res = await fetch(`https://blue-wildflower-7641.fly.dev/api/conversations?userId=${localStorage.id}`, {
        headers: {
          Authorization: bearer,
        }
      });

      if (!res.ok) {
        console.error(`Failed to fetch data: ${res.status}`);
      }

      const data = await res.json();


      if (data) {
        await setConversations(data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const room = localStorage.id;

  useEffect(() => {
    joinRoom(room);
    fetchConversations().then(setIsLoading(false));
  }, []);

  
  const newMessage = (message) => {
    console.log(message)
    setConversations(prevArray =>
      prevArray.map(item =>
        item.messages[0].from === message.from && item.messages[0].to === message.to
          ? { ...item, messages: [message] }
          : item
      )
    );
  }

  const getConversations = (conversations) => {
    return (
      conversations.map(item => {
        return <Miniature data={item}/>
      })
    )
  }

  useEffect(() => {
    socket.on('receive_message', (data) => newMessage(data));

    return () => {
      socket.off('receive_message', (data) => newMessage(data));
    }
  },[socket])

  return (
    !isLoading ? 
    conversations && <div className={styles.content}>
      {getConversations(conversations)}
      <Creator />
    </div>
    :
    <div className={styles.loader}>
      <ReactLoading type={'spin'} color={'#cccccc'} width={'5rem'}/>
      <div>Loading...</div>
    </div>
  )
}

export default Content;