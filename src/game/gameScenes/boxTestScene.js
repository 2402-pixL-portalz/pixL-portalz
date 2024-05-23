import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/level2.jpg";
import { boxLoad, boxUpdate, createBox } from "../assets/objects/box/box";

class boxTestScene extends Phaser.Scene {
	constructor() {
		super(`box test`);
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image("bg", levelTwoBg);
		platformLoad(this);
		boxLoad(this);
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background
		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//exit

		//player
		this.player = this.physics.add.image(400, 250, `player`).setScale(1.6, 1.6);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		//platforms
		createPlatform(platforms, [400, 300], [2, 0.5]);

		//interacts
		this.physics.add.collider(this.player, platforms);

		this.box = createBox(this, 500, 100, 1, 1, [this.player, platforms]);
	}

	update() {
		playerControls(this);
		boxUpdate(this.box);
	}
}

export default boxTestScene;
