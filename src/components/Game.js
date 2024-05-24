import LevelOne from "../game/gameScenes/levels/levelOne.js";
import LevelSelect from "../game/gameScenes/levelSelect.js";
import LevelTwo from "../game/gameScenes/levels/levelTwo.js";
import Phaser from "phaser";
import GabeScene from "../game/gameScenes/gabesTestScene.js";
import TylersTestScene from "../game/gameScenes/testingScenes/tylersTestScene.js";

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
				fps: {
					target: 60,
					forceSetTimeOut: true
				},
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
