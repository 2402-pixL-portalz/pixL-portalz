import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/register";

import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<Navbar/>
			
			<Routes>
				<Route path="/Login" element={<Login />} />
				<Route path="/Register" element={<Register/>}/>
				<Route path="/" element={<Game/>}/>
			</Routes>
		
		</>
	);
}

export default App;
