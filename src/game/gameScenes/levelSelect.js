import Phaser from "phaser";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { exitLoad, createExit, exitUpdate, setIsUnlocked } from "../assets/objects/exit/exit";
import { playerAnimUpdate, playerAnimCreate, playerAnimPreload, } from "../util functions/playerAnims";
import dayImage from "./../assets/images/backgrounds/day.png";
import nightImage from "./../assets/images/backgrounds/night.png";

class LevelSelect extends Phaser.Scene {
	constructor() {
		super("Level Select");
		playerVars(this);

	}

	preload() {
		exitLoad(this);
		playerAnimPreload(this);
		this.load.image(`day`, dayImage);
		this.load.image(`night`, nightImage);
	}

	create() {
		this.minutes = new Date(Date.now()).getMinutes();

		if (this.minutes < 30) this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");
		else this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "night");

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//declarations
		const layer = this.add.layer();
		


		
		//player
		this.player = this.physics.add.sprite(300, 300, "character").setScale(3, 3)
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);
		playerAnimCreate(this);
		
		//exit
		this.exit1 = createExit(this, "Level One", true, [600,750], [1,1]);

		//layering
		layer.add([this.player]);
		layer.setDepth(1);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
	}
}

export default LevelSelect;
