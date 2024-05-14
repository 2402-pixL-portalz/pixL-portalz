
import Test1 from "../gameScenes/levelOne.js"; 
import mC from "../assets/character/pixilart-drawing.png"
import Example from "../gameScenes/test.js";
import Phaser from "phaser";

const Game = () => {
	const config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scene: Test1,
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 200 },
				debug: true
			}
		}
	};

	const game = new Phaser.Game(config);

	return(
	<>
		<img src={mC}/>
		
		<h1>blah</h1>
	</>
	)
};

export default Game;
