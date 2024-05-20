import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const userData = await result.json()
      if (userData.token) {
        localStorage.setItem('token', userData.token)
        navigate('/');
      } else {
        console.log("error logging in, no token received", userData);
      }
    } catch (error) {
      console.error("error logging in", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: </label><br/>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>

        <label>Password:</label><br/>
        <input 
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>

        <button class="button loginPageButton">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;