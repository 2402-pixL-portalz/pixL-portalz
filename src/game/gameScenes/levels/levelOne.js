import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import jumpInst from "../../assets/images/instructions/toJump.png";
import moveInst from "../../assets/images/instructions/toMove.png";
import { exitLoad, exitUpdate, createExit, setIsUnlocked} from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";

class LevelOne extends Phaser.Scene {
	constructor() {
		super(`Level One`);
		playerVars(this);
	}

	preload() {
		exitLoad(this);
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);
		this.load.image("jump instructions", jumpInst);
		this.load.image("move instructions", moveInst);
		platformLoad(this);
	
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
		this.player = this.physics.add.sprite(300, 300, "character").setScale(3, 3)
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		playerAnimCreate(this);

		//platforms
		createPlatform(platforms, [420, 750], [2, 0.6]);
		createPlatform(platforms, [700, 700], [2, 0.6]);

		//exit
		this.exit1 = createExit(this, "Level Select", true, [700,650], [1,1]);

		//interact

		this.physics.add.collider(this.player, platforms);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
	}
}

export default LevelOne;
