import Phaser from "phaser";

import mC from "../assets/images/character/pixilart-drawing.png";
import verycool from "../assets/images/character/verycool.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad} from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";



class Test1 extends Phaser.Scene {
	constructor() {
		super(`Test1`);
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, verycool);
		platformLoad(this);
		exitLoad(this);
	}



	create() {
		//declarations
		const platforms = platformObject(this);
		const exit = exitObject(this);

		//exit
		createExit(exit, [100,620],[2,2]);


		//player
		this.player = this.physics.add.image(100, 500, `player`).setScale(.5,.5);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);
	
		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		//platforms
		createPlatform(platforms,[420,550],[2,.6]);
		createPlatform(platforms,[700,500],[2,.6]);

		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, ()=>{goThroughExit(this, "Level Select")});

		
	}

	update() {
		playerControls(this);
	}
}

export default Test1;

