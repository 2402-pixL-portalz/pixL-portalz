import Test1 from "../game/gameScenes/levelOne.js";
import Example from "../game/gameScenes/test.js";
import Phaser from "phaser";

class Game {
	constructor() {
		this.game = null;
	}

	createGame() {
		if (this.game === null) {
			const config = {
				type: Phaser.AUTO,
				width: 800,
				height: 600,
				scene: [Test1, Example],
				physics: {
					default: "arcade",
					arcade: {
						gravity: { y: 200 },
						debug: true
					}
				}
			};

			this.game = new Phaser.Game(config);
		}
	}

	deleteGame() {
		if (this.game !== null) {
			this.game.destroy(true);
			this.game = null;
		}
	}
}

export default Game;
