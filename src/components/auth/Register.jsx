import styles from './auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://192.168.0.18:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          confirmPassword: confirmPassword
        }),
      });
      if (res.status === 200) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="username"></label>
        <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" name='username'/>
        <label htmlFor="password"></label>
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" name='password'/>
        <label htmlFor="confirmPassword"></label>
        <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" type="password" name='confirmPassword'/>
        <button className={`${styles.submit} ${styles.button}`}>Sign up</button>
      </form>
      <hr />
      <div className={styles.noAccount}>
      <span className={styles.noAccountInfo}>Already have an account?</span>
      <button onClick={() => navigate('/login')} className={styles.button}>Log in</button>
      </div>
    </div>
  )
}

export default Register;