import { useNavigate } from "react-router-dom";
const Navbar = ({ game }) => {
	const navigate = useNavigate();
	return (
		<>
      <header>
        <img src="https://github.com/lucydelash/climbing-project/blob/main/PixL-portalZ-logo.png?raw=true"
          alt="PixL portalZ"
          width="1050" height="240">
        </img>
      </header>
      
			<nav className="nav">
				<button class="button homeButton"
					onClick={() => {
						navigate("/");
					}}
				>
					Home
				</button>
        
				<button class="button loginButton"
					onClick={() => {
						game.deleteGame();
						navigate("/Login");
					}}
				>
					Login
				</button>

				<button class="button registerButton"
					onClick={() => {
						game.deleteGame();
						navigate("/Register");
					}}
				>
					Register
				</button>
			</nav>
		</>
	);
};

export default Navbar;
