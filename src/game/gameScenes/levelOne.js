import Phaser from "phaser";

import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelOneBg from "../assets/images/backgrounds/level.jpg"
import jumpInst from "../assets/images/instructions/toJump.png";
import moveInst from "../assets/images/instructions/toMove.png";



class Test1 extends Phaser.Scene {
	constructor() {
		super(`Test1`);
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image("bg", levelOneBg);
		this.load.image("jump instructions", jumpInst);
		this.load.image("move instructions", moveInst)
		platformLoad(this);
		exitLoad(this);
	}



	create() {
		//declarations
		const platforms = platformObject(this);
		const exit = exitObject(this);

		//background
		
		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//instructions
		this.add.image(400,500,"jump instructions").setScale(1.3,1.3);
		this.add.image(100,500, "move instructions").setScale(1.3,1.3);

		//exit
		createExit(exit, [700, 455], [1, 1]);


		//player
		this.player = this.physics.add.image(100, 580, `player`).setScale(1, 1);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		//platforms
		createPlatform(platforms, [420, 550], [2, .6]);
		createPlatform(platforms, [700, 500], [2, .6]);

		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, () => { goThroughExit(this, "Level Select") });



	}

	update() {
		playerControls(this);
	}
}

export default Test1;

