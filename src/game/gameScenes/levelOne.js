import Phaser from "phaser";

import mC from "../assets/images/character/pixilart-drawing.png";
import verycool from "../assets/images/character/verycool.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import Platform from "../assets/objects/platforms/platform";
import { createPlatform, platformObject} from "../assets/objects/platforms/platform";



class Test1 extends Phaser.Scene {
	constructor() {
		super(`Test1`);
		playerVars(this);

	}
	preload() {
		this.load.image(`player`, verycool);
		Platform(this);
	}



	create() {
		//declarations
		const platforms = platformObject(this);

		//player
		this.player = this.physics.add.image(200, 200, `player`);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);
	
		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		//platforms
		createPlatform(platforms,[500,550],[4,.6]);
		createPlatform(platforms,[400,300],[4,.6]);
		
		this.physics.add.collider(this.player, platforms);
	}

	update() {
		playerControls(this);
	}
}

export default Test1;

