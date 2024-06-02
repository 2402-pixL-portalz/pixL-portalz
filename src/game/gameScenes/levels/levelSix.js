import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import { exitLoad, createExit, exitUpdate } from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";
import { createGarage, garageLoad, garageUpdate } from "../../assets/objects/garage/garage";
import { createPortal, joinPortals, portalLoad, portalUpdate } from "../../assets/objects/portals/portal";
import { boxLoad, boxUpdate, createBox } from "../../assets/objects/box/box";
import resettingFunctionality from "../../util functions/resettingFunctionality";
import { addButtonOverlap, buttonLoad, buttonUpdate, createButton } from "../../assets/objects/buttons/button";

class LevelSix extends Phaser.Scene {
	constructor() {
		super(`Level Six`);
		playerVars(this);
	}

	preload() {
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);

		exitLoad(this);
		platformLoad(this);
		garageLoad(this);
		portalLoad(this, `gray`);
		portalLoad(this, `red`);
		portalLoad(this, `pink`);
		boxLoad(this);
		buttonLoad(this);
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.sprite(250, 700, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`);

		playerAnimCreate(this);

		//* platforms:

		// floor
		createPlatform(platforms, [800, 800], [20, 0.9]);

		// left top
		createPlatform(platforms, [20, 250], [0.3, 20]);
		createPlatform(platforms, [220, 250], [0.3, 20]);
		createPlatform(platforms, [120, 460], [2.25, 1]);
		createPlatform(platforms, [330, 250], [2, 1]);

		// bottom:
		createPlatform(platforms, [525, 775], [0.5, 1]);
		createPlatform(platforms, [675, 775], [0.5, 1]);

		// right top:
		createPlatform(platforms, [1500, 250], [2, 1]);

		// garages:
		this.garage1 = createGarage(this, [28, 238], [1.8, 0.25], `LEFT`, 0.025);
		this.garage2 = createGarage(this, [415, 245], [0.25, 2.1], `DOWN`, 0.025);
		this.garage3 = createGarage(this, [100, 465], [0.25, 3.25], `UP`, 0.025);

		// box:
		this.box = createBox(this, 400, 700, 1, 1, [this.player, platforms, this.garage1]);

		// buttons:

		this.button1 = createButton(this, 120, 445, 1, 1);
		this.button2 = createButton(this, 1400, 786, 1, 1);

		addButtonOverlap(this, this.button1, [this.player, this.box]);
		addButtonOverlap(this, this.button2, [this.player]);

		// portals:
		this.portalG1 = createPortal(this, `gray`, 265, 185, `right`);
		this.portalG2 = createPortal(this, `gray`, 1575, 735, `left`);
		joinPortals(this, this.portalG1, this.portalG2, [this.player, this.box]);

		this.portalR3 = createPortal(this, `red`, 120, 30, `down`);
		this.portalR4 = createPortal(this, `red`, 25, 740, `right`);
		joinPortals(this, this.portalR3, this.portalR4, [this.player, this.box]);

		this.portalP5 = createPortal(this, `pink`, 600, 775, `up`);
		this.portalP6 = createPortal(this, `pink`, 1000, 100, `right`);
		joinPortals(this, this.portalP5, this.portalP6, [this.player]);

		//exit
		this.exit = createExit(this, "Level Select", false, [1500, 150], [2, 2], 6);

		this.entrance = createExit(this, "Level Select", true, [160, 750], [1, 1]);

		//interact
		this.physics.add.collider(this.player, platforms);

		//layers
		const layer = this.add.layer();
		layer.add([this.box, this.player]);
		layer.setDepth(1);
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);

		garageUpdate(this.garage1, this.button2.isPressed);
		garageUpdate(this.garage2, this.button1.isPressed);
		garageUpdate(this.garage3, !this.button1.isPressed);
		exitUpdate(this.exit, this.button1.isPressed);

		portalUpdate(this);
		boxUpdate(this.box);

		buttonUpdate(this.button1);
		buttonUpdate(this.button2);

		resettingFunctionality(this);
	}
}

export default LevelSix;
