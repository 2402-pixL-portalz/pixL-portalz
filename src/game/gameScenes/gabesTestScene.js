import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/white.png";
import testSprite from "../assets/spritesheets/character/spritesheet.png";
// import idleAnimation from "../assets/spritesheets/dogwaterCharacter/badIdle.png";
// import startRun from "../assets/spritesheets/dogwaterCharacter/badRunningAnimation.png";
// import keepRunning from "../assets/spritesheets/dogwaterCharacter/badKeepRunning.png";

import { playerAnimUpdate, playerAnimCreate, playerAnimPreload } from "../util functions/playerAnims";

class GabeScene extends Phaser.Scene {
	constructor() {
		super(`GabeScene`);
		playerVars(this);
	}

	preload() {

    playerAnimPreload(this);
		// this.load.spritesheet(`startRun`, startRun, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // });
    
    // this.load.spritesheet("character", idleAnimation, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })

    // this.load.spritesheet("continueRunning", keepRunning, {
    //   frameWidth: 32,
    //   frameHeight: 32
    // })
    

    this.load.image("bg", levelTwoBg);
		exitLoad(this);
    platformLoad(this);
    // this.movingL = false;
    // this.movingR = false;
	}



	create() {
		//declarations
		const platforms = platformObject(this);
		const exit = exitObject(this);

		//background
		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
		

		

		//player
    this.player = this.physics.add.sprite(300,300, "character").setScale(3,3);

		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);


		//platforms

    //animations
   
    playerAnimCreate(this);
    // this.anims.create({
    //   key: "idle",
    //   frames: this.anims.generateFrameNumbers("character"),
    //   frameRate: 2,
    //   repeat: -1
    // })

    // this.anims.create({
    //   key: "runStart",
    //   frames: this.anims.generateFrameNumbers("startRun"),
    //   frameRate: 15,
    //   repeat: 0
    // })

    // this.anims.create({
    //   key: "keepRunning",
    //   frames: this.anims.generateFrameNumbers("continueRunning"),
    //   frameRate: 20,
    //   repeat: -1
    // })

    // this.player.play("idle");
    

    


	

    //interacts
		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, () => { goThroughExit(this, "Level Select") });



	}
  
	update() {
		playerControls(this);
    playerAnimUpdate(this);


    // if ((this.player.body.velocity.x > 10) && this.movingR === false) {
    //   this.player.play("runStart");
    //   this.player.setScale(3,3)
    //   this.player.setOffset(0,0);
    //   this.movingR = true;
    // }
    // else if(this.player.body.velocity.x < 10 && this.movingR === true){
    //   this.movingR = false;
    //   this.player.stop("runStart");
    //   this.player.play("idle"); 
    // }
    // else if(this.player.anims.currentAnim.key === "runStart" && this.player.anims.isPlaying === false){
    //   this.player.play("keepRunning");
    // }

    
    // if ((this.player.body.velocity.x < -10) && this.movingL === false) {
    //   this.player.setScale(-3,3)
    //   this.player.setOffset(32,0);
    //   this.player.play("runStart");
    //   this.movingL = true;
    // }
    // else if(this.player.body.velocity.x > -10 && this.movingL === true){
    //   this.movingL = false;
    //   this.player.stop("runStart");
    //   this.player.play("idle"); 
    // }
    // else if(this.player.anims.currentAnim.key === "runStart" && this.player.anims.isPlaying === false){

    //   this.player.play("keepRunning");
    // }

	}
}

export default GabeScene;
