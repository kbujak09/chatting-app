import styles from './auth.module.css';

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Log in</div>
      <form className={styles.form}>
        <label htmlFor="username">Username: </label>
        <input type="text" name='username'/>
        <label htmlFor="password">Password: </label>
        <input type="password" name='password'/>
      </form>
    </div>
  )
}

export default Auth;