import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad, exitObject, createExit, goThroughExit } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/level2.jpg";
import box from "../assets/images/box/box.png";


class LevelTwo extends Phaser.Scene {
	constructor() {
		super(`LevelTwo`);
		playerVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
    this.load.image("bg", levelTwoBg);
		this.load.image("box", box);
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
		

		//exit
		


		//player
		this.player = this.physics.add.image(100, 580, `player`).setScale(1.6, 1.6);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		//platforms
	

    //interacts
		this.physics.add.collider(this.player, platforms);
		this.physics.add.overlap(this.player, exit, () => { goThroughExit(this, "Level Select") });

		

		//box sprite
		this.box = this.physics.add.sprite(150, 580, 'box');
		this.box.setCollideWorldBounds(true);
		this.box.setImmovable(true);
		
		this.box.body.setSize(this.box.width, this.box.height);
		this.box.setOrigin(0.5, 0.5);
		

		//collision between character and box
		this.physics.add.collider(this.player, 
		this.box, this.handlePush, null, this);
		this.boxFlipped = false;
	}

	

	handlePush(player, box ) {
		if (!this.boxFlipped) {
			if (Math.abs(player.y - box.y) < box.height / 2) {
				this.boxFlipped = true;

				const flipDistance = this.box.width;

				let targetX = box.x;
				let targetAngle = box.angle;

				if (player.x < box.x) {
					targetX += flipDistance;
					targetAngle += 90;
				} else if (player.x > box.x) {
					targetX -= flipDistance;
					targetAngle -= 90;
				}

				this.tweens.add({
					targets: box,
					angle: targetAngle,

					x: targetX,
					duration: 650,
					ease: 'Power2',
					onComplete: () => {
						this.boxFlipped = false;
					}
				});
			}
		}
		}
	

	

	update() {
		playerControls(this);

		
	}
}

export default LevelTwo;
