import Example from "../gameScenes.js/test.js";
const Game = () => {
	const config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scene: Example,
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 200 }
			}
		}
	};

	const game = new Phaser.Game(config);

	return;
	<>
		<h1>blah</h1>
	</>;
};

export default Game;
