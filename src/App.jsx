import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/auth/Login';
import Header from './components/header/Header';
import Register from './components/auth/Register';
import Content from './components/content/Content';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage)
    if (!localStorage.token) {
      navigate('/login');
    }
  },[])

  return (
    <div className={styles.App}>
        <Header />
        <Routes>
          <Route path='/' element={<Content/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
        </Routes>
    </div>
  )
}

export default App;