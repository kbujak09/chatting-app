import styles from './users.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = ({setSearchActive}) => {

  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const bearer = `Bearer ${token}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://192.168.0.15:5000/api/conversations', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer
        },
        body: JSON.stringify({fromId: localStorage.id, toId: inputValue !== localStorage.username ? inputValue : null})
      })

      const data = await res.json();

      if (data) {
        console.log(data);  
        navigate(`/conversation/${data.conversation._id}/${data.conversation.members.filter(member => member !== localStorage.id)[0]}`)
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleFormClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div onClick={() => setSearchActive(false)} className={styles.containerOuter}>
      <form onClick={handleFormClick} onSubmit={handleSubmit} className={styles.content}>
        <label htmlFor="createConversation">User: </label>
        <input onChange={(e) => setInputValue(e.target.value)} type="text" name='createConversation'/>
        <button className={styles.btn}>Create conversation</button>
      </form>
    </div>
  )
}

export default Users;