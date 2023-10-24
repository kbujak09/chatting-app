import styles from './auth.module.css';
import { useState } from 'react';



const Auth = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="username"></label>
        <input placeholder="Username" type="text" name='username'/>
        <label htmlFor="password"></label>
        <input placeholder="Password" type="password" name='password'/>
        <button className={`${styles.submit} ${styles.button}`}>Log in</button>
      </form>
      <hr />
      <div className={styles.noAccount}>
      <span className={styles.noAccountInfo}>Doesn't have an account?</span>
      <button className={styles.button}>Create account</button>
      </div>
    </div>
  )
}

export default Auth;