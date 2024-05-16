import Phaser from "phaser";
import verycool from "../assets/images/character/verycool.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createExit, exitLoad, exitObject } from "../assets/objects/exit/exit";
import dayImage from "./../assets/images/backgrounds/day.png";
import nightImage from "./../assets/images/backgrounds/night.png";

class LevelSelect extends Phaser.Scene {
	constructor() {
		super("Level Select");
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, verycool);
		exitLoad(this);

		this.load.image(`day`, dayImage);
		this.load.image(`night`, nightImage);
	}

	create() {
		this.minutes = new Date(Date.now()).getMinutes();

		if (this.minutes < 30) this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");
		else this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "night");

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//declarations
		this.exit = exitObject(this);

		//exit
		createExit(this.exit, [100, 570], [1, 1]);

		//player
		this.player = this.physics.add.image(100, 500, `player`).setScale(0.5, 0.5);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);
	}

	update() {
		playerControls(this);
	}
}

export default LevelSelect;
