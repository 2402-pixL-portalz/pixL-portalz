import LevelOne from "../game/gameScenes/levelOne.js";
import LevelSelect from "../game/gameScenes/levelSelect.js";
import LevelTwo from "../game/gameScenes/levelTwo.js";
import Phaser from "phaser";
import GabeScene from "../game/gameScenes/gabesTestScene.js";

class Game {
	constructor() {
		this.game = null;
	}

	createGame() {
		if (this.game === null) {
			const config = {
				type: Phaser.AUTO,
				width: 1600,
				height: 800,
				scene: [LevelSelect, LevelOne, LevelTwo],
				physics: {
					default: "arcade",
					arcade: {
						gravity: { y: 900 },
						debug: true
					},
					
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
