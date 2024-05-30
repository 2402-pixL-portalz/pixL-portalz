import Phaser from "phaser";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { exitLoad, createExit, setIsUnlocked } from "../assets/objects/exit/exit";
import { playerAnimUpdate, playerAnimCreate, playerAnimPreload } from "../util functions/playerAnims";
import dayImage from "./../assets/images/backgrounds/day.png";
import nightImage from "./../assets/images/backgrounds/night.png";
import { createPlatform, platformLoad, platformObject } from "../assets/objects/platforms/platform";
import { createPortal, joinPortals, portalLoad, portalUpdate, portalVars } from "../assets/objects/portals/portal";


class LevelSelect extends Phaser.Scene {
	constructor() {
		super("Level Select");
		playerVars(this);
		portalVars(this);
	}

	preload() {
		playerAnimPreload(this);
		exitLoad(this);
		platformLoad(this);
		portalLoad(this, `blue`);
		this.load.image(`day`, dayImage);
		this.load.image(`night`, nightImage);
	}

	create() {

		if(this.game.saveState === null){
			this.game.saveState = [false, false, false, false, false, false, false, false, false, false];
			this.game.saveState2 = [];
			for(let ele in this.game.saveState) {
				this.game.saveState2.push(ele);
			}
		}

		this.minutes = new Date(Date.now()).getMinutes();

		if (this.minutes < 30) this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");
		else this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "night");

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//declarations
		const layer = this.add.layer();
		const platforms = platformObject(this);

		createPlatform(platforms, [800, 800], [20, 0.9]);
		createPlatform(platforms, [800, 400], [20, 0.9]);

		//player
		this.player = this.physics.add.sprite(200, 600, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);
		playerAnimCreate(this);

		//exit

		// console.log("save state = ");
		// console.log(this.game.saveState);

		this.exit1 = createExit(this, "Level One", true, [(this.sys.game.config.width / 7) * 2, 715], [2, 2]);
		// console.log("creating exit two");
		this.exit2 = createExit(this, "Level Two", this.game.saveState[0], [(this.sys.game.config.width / 7) * 3, 715], [2, 2]);
		this.exit3 = createExit(this, "Level Three", this.game.saveState[1], [(this.sys.game.config.width / 7) * 4, 715], [2, 2]);
		this.exit4 = createExit(this, "Level Four", this.game.saveState[2], [(this.sys.game.config.width / 7) * 5, 715], [2, 2]);
		this.exit5 = createExit(this, "Level Five", this.game.saveState[3], [(this.sys.game.config.width / 7) * 6, 715], [2, 2]);

		this.exit6 = createExit(this, "Level One", this.game.saveState[4], [(this.sys.game.config.width / 7) * 2, 315], [2, 2]);
		this.exit7 = createExit(this, "Level Two", this.game.saveState[5], [(this.sys.game.config.width / 7) * 3, 315], [2, 2]);
		this.exit8 = createExit(this, "Level Three", this.game.saveState[6], [(this.sys.game.config.width / 7) * 4, 315], [2, 2]);
		this.exit9 = createExit(this, "Level Four", this.game.saveState[7], [(this.sys.game.config.width / 7) * 5, 315], [2, 2]);
		this.exit10 = createExit(this, "Level Five", this.game.saveState[8], [(this.sys.game.config.width / 7) * 6, 315], [2, 2]);

		this.portal1 = createPortal(this, `blue`, 30, this.sys.game.config.height - 60, `right`);
		this.portal2 = createPortal(this, `blue`, 30, this.sys.game.config.height / 2 - 60, `right`);

		joinPortals(this, this.portal1, this.portal2, this.player);

		//layering
		layer.add([this.player]);
		layer.setDepth(1);

		this.physics.add.collider(this.player, platforms);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
		portalUpdate(this);

		if(this.game.saveState !== this.game.saveState2) {
			// console.log(`updating the exit statis to: ${this.game.saveState}`);

			this.game.saveState2 = this.game.saveState;
			setIsUnlocked(this.exit2, this.game.saveState[0]);
			setIsUnlocked(this.exit3, this.game.saveState[1]);
			setIsUnlocked(this.exit4, this.game.saveState[2]);
			setIsUnlocked(this.exit5, this.game.saveState[3]);
			setIsUnlocked(this.exit6, this.game.saveState[4]);
			setIsUnlocked(this.exit7, this.game.saveState[5]);
			setIsUnlocked(this.exit8, this.game.saveState[6]);
			setIsUnlocked(this.exit9, this.game.saveState[7]);
			setIsUnlocked(this.exit10, this.game.saveState[8]);
		}

		// console.log(`saveState, ${this.game.saveState}`);

	}
}

export default LevelSelect;
