import { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const result = await fetch('/api/v1/auth/register', {

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

        navigate('/')
      } else {
        console.log("error registering, no token received", userData)
      }
    } catch (error) {
      console.error("error registering user", error)
    }
  }
  return (
    <div>
      <h1>Register An Account</h1>
      <form onSubmit={handleSubmit} >
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
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button>Register</button>
      </form>

    </div>
  )

}

export default Register
