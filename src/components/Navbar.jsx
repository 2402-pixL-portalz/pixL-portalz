import { useNavigate } from "react-router-dom";
const Navbar = () => {

  const navigate = useNavigate();
  return (
    <>

      <nav className="nav">
        <h3>very cool game title</h3>

        <button onClick={() => {
          navigate("/");
          //create game
        }}>Home</button>

        <button onClick={() => {
          navigate("/Login");
          //destroy game
        }}>Login</button>

        <button onClick={() => {
          navigate("/Register");
          //destroy game
        }}>Register</button>

      </nav>
    </>
  );


}

export default Navbar;