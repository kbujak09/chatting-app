import { useNavigate } from 'react-router-dom';

const Content = () => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <div>Hello {localStorage.username} :)</div>
      <button onClick={logOut}>log out</button>
    </>
  )
}

export default Content;