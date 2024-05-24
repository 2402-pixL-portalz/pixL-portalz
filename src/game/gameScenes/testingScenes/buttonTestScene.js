import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import dayImage from "./../assets/images/backgrounds/day.png";
import { createPlatform, platformLoad, platformObject } from "../../assets/objects/platforms/platform";
import { addButtonOverlap, buttonLoad, buttonUpdate, buttonVars, createButton } from "../../assets/objects/buttons/button";

class ButtonTest extends Phaser.Scene {
	constructor() {
		super("button test");
		playerVars(this);

		buttonVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image(`day`, dayImage);

		platformLoad(this);
		buttonLoad(this);
	}

	create() {
		this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");

		//player
		this.player = this.physics.add.image(100, 500, `player`).setScale(1.6, 1.6);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		const platforms = platformObject(this);

		createPlatform(platforms, [420, 775], [2, 0.6]);
		createPlatform(platforms, [700, 750], [5, 0.6]);

		this.physics.add.collider(this.player, platforms);

		this.myButton = createButton(this, 500, 740, 1, 1);

		addButtonOverlap(this, this.myButton, [this.player]);
	}

	update() {
		playerControls(this);

		buttonUpdate(this, this.myButton);
	}
}

export default ButtonTest;
