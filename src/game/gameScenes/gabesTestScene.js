import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/level2.jpg";
import testSprite from "../assets/spritesheets/character/spritesheet.png";
import idleAnimation from "../assets/spritesheets/character/idleStickman.png";

class GabeScene extends Phaser.Scene {
	constructor() {
		super(`GabeScene`);
		playerVars(this);
	}

	preload() {
		this.load.spritesheet(`playerIdle`, idleAnimation, {
      frameWidth: 92,
      frameHeight: 112
    });
    this.load.image("bg", levelTwoBg);

    this.load.spritesheet("spritesheet", testSprite, {
      frameWidth: 35,
      frameHeight: 35
    });

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
    this.player = this.physics.add.sprite(300,300, "playerIdle").setScale(1,1);

		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);


		//platforms

    //animations
    this.testSprite = this.add.sprite(100,100,"spritesheet").setScale(20,20);


    this.anims.create({
      key: "testAnim",
      frames: this.anims.generateFrameNumbers("spritesheet"),
      frameRate: 1,
      repeat: -1
    })

    this.testSprite.play("testAnim");

    this.anims.create({
      key: "idleAnim",
      frames: this.anims.generateFrameNumbers("playerIdle"),
      frameRate: 3,
      repeat: -1
    })

    this.player.play("idleAnim");
    


	

    //interacts
		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, () => { goThroughExit(this, "Level Select") });



	}

	update() {
		playerControls(this);
	}
}

export default GabeScene;
