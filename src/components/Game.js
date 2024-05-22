import LevelOne from "../game/gameScenes/levels/levelOne.js";
import LevelSelect from "../game/gameScenes/levelSelect.js";
import LevelTwo from "../game/gameScenes/levels/levelTwo.js";
import Phaser from "phaser";
import ExitTestScene from "../game/gameScenes/testingScenes/exitTestScene.js";
import PortalTest from "../game/gameScenes/testingScenes/portalTestScene.js";

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
				scene: [ExitTestScene, LevelSelect, LevelOne, LevelTwo],
				physics: {
					default: "arcade",
					arcade: {
						gravity: { y: 900 },
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
