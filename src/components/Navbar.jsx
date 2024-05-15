import { useNavigate } from "react-router-dom";
const Navbar = ({ game }) => {
	const navigate = useNavigate();
	return (
		<>
			<nav className="nav">
				<h3>very cool game title</h3>

				<button
					onClick={() => {
						navigate("/");
					}}
				>
					Home
				</button>

				<button
					onClick={() => {
						game.deleteGame();
						navigate("/Login");
					}}
				>
					Login
				</button>

				<button
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
