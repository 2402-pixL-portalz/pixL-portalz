import Game from "./components/Game";
import Navbar from "./components/Navbar";
import GamePage from "./pages/GamePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Route, Routes } from "react-router-dom";



function App() {
	const game = new Game();


	return (
		<>
			<Navbar game={game} />

			<Routes>
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/" element={<GamePage game={game}/>} />
			</Routes>
		</>
	);

	
}

export default App;


