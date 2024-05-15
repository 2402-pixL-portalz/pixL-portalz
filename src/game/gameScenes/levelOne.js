import Phaser from "phaser";

import mC from "../assets/images/character/pixilart-drawing.png";
import verycool from "../assets/images/character/verycool.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";


class Test1 extends Phaser.Scene {
	constructor() {
		super(`Test1`);
		playerVars(this);
	}
	preload() {


	create() {
		this.add.image(400, 300, "platform")
		this.add.image();
=======
		this.load.image(`player`, verycool);
	}

	create() {
		this.player = this.physics.add.image(200, 200, `player`);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		this.player.setCollideWorldBounds(true);
	}

	update() {
		playerControls(this);
	}
}

export default Test1;

