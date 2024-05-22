import Phaser from "phaser";

import mC from "../../assets/images/character/pixilart-drawing.png";
import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import { exitLoad, createExit, exitUpdate } from "../../assets/objects/exit/exit";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import jumpInst from "../../assets/images/instructions/toJump.png";
import moveInst from "../../assets/images/instructions/toMove.png";
import { playerAnimCreate, playerAnimPreload, playerAnimUpdate } from "../../util functions/playerAnims";
import { addButtonOverlap, buttonLoad, buttonUpdate, buttonVars, createButton } from "../../assets/objects/buttons/button";

class ExitTestScene extends Phaser.Scene {
	constructor() {
		super(`exit test`);
		playerVars(this);
		buttonVars(this);
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image("bg", levelOneBg);
		this.load.image("jump instructions", jumpInst);
		this.load.image("move instructions", moveInst);
		platformLoad(this);
		exitLoad(this);
		playerAnimPreload(this);
		buttonLoad(this);
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//instructions
		this.add.image(400, 700, "jump instructions").setScale(1.3, 1.3);
		this.add.image(100, 700, "move instructions").setScale(1.3, 1.3);

		//player
		this.player = this.physics.add.sprite(300, 300, "character").setScale(3, 3);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		playerAnimCreate(this);

		//exit
		this.exit = createExit(this, `Level Select`, false, [700, 655], [1, 1]);

		this.button = createButton(this, 620, 690, 1, 1);

		// setIsUnlocked(this.exit, false);

		addButtonOverlap(this, this.button, this.player);

		//platforms
		createPlatform(platforms, [420, 750], [2, 0.6]);
		createPlatform(platforms, [700, 700], [2, 0.6]);

		this.physics.add.collider(this.player, platforms);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
		buttonUpdate(this);

		exitUpdate(this.exit, this.button.isPressed);
	}
}

export default ExitTestScene;
