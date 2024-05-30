import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import { exitLoad, createExit } from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";
import { boxLoad, createBox, boxUpdate } from "../../assets/objects/box/box";
import { buttonLoad, createButton, buttonUpdate, buttonVars, addButtonOverlap } from "../../assets/objects/buttons/button";
import { garageLoad, createGarage, garageUpdate } from "../../assets/objects/garage/garage";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelTwo extends Phaser.Scene {
	constructor() {
		super(`Level Two`);
		playerVars(this);
		buttonVars(this);
	}

	preload() {
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);

		exitLoad(this);
		platformLoad(this);
		boxLoad(this);
		buttonLoad(this);
		garageLoad(this);
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.sprite(300, 300, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`);

		playerAnimCreate(this);

		//box
		this.box = createBox(this, 1000, 400, 1, 1, platforms);

		//button
		this.button = createButton(this, 600, 792, 1, 1);
		addButtonOverlap(this, this.button, [this.player, this.box]);
		

		//exit
		this.exit1 = createExit(this, "Level Select", true, [1400, 750], [1, 1]);

    this.entrance = createExit(this, `Level Select`, true, [50, 750], [1, 1]);

		//garage
		this.garage = createGarage(this, [1400, 691], [2, 1], 'UP', 0.01);

    //floor
		createPlatform(platforms, [800, 800,], [20,0.9]);
		

		//interact
		this.physics.add.collider(this.player, platforms);
		this.physics.add.collider(this.box, platforms);
		this.physics.add.collider(this.player, this.box);

		//layers
		const layer = this.add.layer();
		layer.add([this.player, this.box, this.button, this.garage]);
		layer.setDepth(1);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
		boxUpdate(this.box);
		buttonUpdate(this);
		garageUpdate(this.garage, this.button.isPressed);
		resettingFunctionality(this);

	}
}

export default LevelTwo;
