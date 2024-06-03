import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (result.headers.get('content-type')?.includes('application/json')) {
        const userData = await result.json();
        if (userData.token) {
          localStorage.setItem('token', userData.token);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          console.log('Error logging in, no token received', userData);
        }
      } else {
        console.log('Error: Response is not JSON');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: </label><br />
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <label>Password:</label><br />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <br></br> {/* quick CSS fix */}
        <br></br> {/* quick CSS fix */}
        <button className="button loginPageButton">Login</button>
      </form>
    </div>
  );
};

export default Login;