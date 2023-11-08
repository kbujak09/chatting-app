import Miniature from '../miniature/Miniature';
import styles from './content.module.css';
import Creator from '../creator/Creator';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const Content = () => {

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  const [conversations, setConversations] = useState();

  const joinRoom = (user) => {
    socket.emit('join_room', user);
  }

  const fetchConversations = async () => {
    try {
      const res = await fetch(`http://192.168.0.15:5000/api/conversations?userId=${localStorage.id}`, {
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

  useEffect(() => {
    fetchConversations();
  }, []);

  const receiveMessage = async(data) => {
    try {
      joinRoom(localStorage.id);
      fetchConversations();
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    socket.on('receive_message', receiveMessage);

    return () => {
      socket.off('receive_message', receiveMessage);
    }
  },[socket])

  return (
    conversations && <div className={styles.content}>
      {conversations && conversations.map(item => {
        return <Miniature data={item}/>
      })}
      <Creator />
    </div>
  )
}

export default Content;