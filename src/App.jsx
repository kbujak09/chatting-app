import styles from './app.module.css';
import Login from './components/auth/Login';
import Header from './components/header/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Login />
    </div>
  )
}

export default App;