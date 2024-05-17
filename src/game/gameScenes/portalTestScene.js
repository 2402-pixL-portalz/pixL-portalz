import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import dayImage from "./../assets/images/backgrounds/day.png";
import bluePortalImage from "./../assets/images/portals/bluePortalSheet.png";

class PortalTest extends Phaser.Scene {
	constructor() {
		super("portal test");
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image(`day`, dayImage);

		this.load.spritesheet(`bluePortalSheet`, bluePortalImage, { frameWidth: 498, frameHeight: 498 });
	}

	create() {
		this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");

		this.portal = this.add.sprite(this.sys.game.config.width / 3, this.sys.game.config.height - 50, `bluePortalSheet`).setScale(0.2, 0.2);

		this.anims.create({
			key: "bluePortal",
			frames: this.anims.generateFrameNumbers("bluePortalSheet"),
			frameRate: 20,
			repeat: -1
		});

		this.portal.play(`bluePortal`);

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.image(100, 500, `player`).setScale(1.6, 1.6);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);
	}

	update() {
		playerControls(this);
	}
}

export default PortalTest;
