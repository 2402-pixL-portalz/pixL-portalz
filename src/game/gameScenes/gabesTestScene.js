import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/white.png";
import testSprite from "../assets/spritesheets/character/spritesheet.png";
//

import { playerAnimUpdate, playerAnimCreate, playerAnimPreload } from "../util functions/playerAnims";

class GabeScene extends Phaser.Scene {
	constructor() {
		super(`GabeScene`);
		playerVars(this);
	}

	preload() {

    playerAnimPreload(this);
    this.load.image("bg", levelTwoBg);
		exitLoad(this);
    platformLoad(this);
   
	}



	create() {
		//declarations
		const platforms = platformObject(this);
		const exit = exitObject(this);

		//background
		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
		

		

		//player
    this.player = this.physics.add.sprite(300,300, "character").setScale(3,3)

		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);


		//platforms

    createPlatform(platforms, [700,780], [2,1]);

    //animations
   
    playerAnimCreate(this);
  

    //interacts
		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, () => { goThroughExit(this, "Level Select") });



	}
  
	update() {
		playerControls(this);
    playerAnimUpdate(this);
	}
}

export default GabeScene;
