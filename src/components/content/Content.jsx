import Miniature from '../miniature/Miniature';
import styles from './content.module.css';
import { useState, useEffect } from 'react';

const Content = () => {

  const [conversations, setConversations] = useState();

  const fetchConversations = async () => {
    try {
      const res = await fetch(`http://192.168.0.15:5000/api/conversations?userId=${localStorage.id}`);

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
    console.log(conversations)
  }, []);

  return (
    <div className={styles.content}>
      {conversations && conversations.map(item => {
        return <Miniature data={item}/>
      })}
    </div>
  )
}

export default Content;