import Phaser from "phaser";

import LevelSelect from "../game/gameScenes/levelSelect.js";
import LevelOne from "../game/gameScenes/levels/levelOne.js";
import LevelTwo from "../game/gameScenes/levels/levelTwo.js";
import LevelThree from "../game/gameScenes/levels/levelThree.js";
import LevelFour from "../game/gameScenes/levels/levelFour.js";
import LevelFive from "../game/gameScenes/levels/levelFive.js";
import LevelSix from "../game/gameScenes/levels/levelSix.js";
import LevelSeven from "../game/gameScenes/levels/levelSeven.js";
import LevelEight from "../game/gameScenes/levels/levelEight.js";
import LevelNine from "../game/gameScenes/levels/levelNine.js";
import LevelTen from "../game/gameScenes/levels/levelTen.js";
import GabeScene from "../game/gameScenes/gabesTestScene.js";

class Game {
	constructor() {
		this.game = null;
	}

	createGame(progress) {
		if (this.game === null) {
			const config = {
				saveState: progress,
				type: Phaser.AUTO,
				width: 1600,
				height: 800,
				scene: [LevelSelect, LevelOne, LevelTwo, LevelThree, LevelFour, LevelFive, LevelSix, LevelSeven, LevelEight, LevelNine, LevelTen],

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

	transferState(state) {
		this.game.saveState = state;
	}
}

export default Game;
