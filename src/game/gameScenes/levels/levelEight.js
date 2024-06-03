import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import { exitLoad, createExit, exitUpdate } from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";
import { rayLoad, rayCreate, rayUpdate } from "../../util functions/ray";
import { boxLoad, boxUpdate, createBox } from "../../assets/objects/box/box";
import { buttonLoad, createButton, buttonUpdate, addButtonOverlap } from "../../assets/objects/buttons/button";
import { garageLoad, createGarage, garageUpdate } from "../../assets/objects/garage/garage";
import { portalLoad, portalUpdate, portalVars, createPortal, joinPortals} from "../../assets/objects/portals/portal";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelEight extends Phaser.Scene {
	constructor() {
		super(`Level Eight`);
		playerVars(this);
		portalVars(this);
	}

	preload() {
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);
		exitLoad(this);
		platformLoad(this);
		rayLoad(this);
		boxLoad(this);
		buttonLoad(this);
		garageLoad(this);
		portalLoad(this, "blue");
		portalLoad(this, "orange");
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.sprite(300, 740, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`);

		playerAnimCreate(this);

		//platforms
		createPlatform(platforms, [500, 780], [.5, 5.1]);
		createPlatform(platforms, [700, 780], [.2, 12]);
		createPlatform(platforms, [790,780], [.2,3]);

		createPlatform(platforms, [1500, 250], [3,1]);//BR
		createPlatform(platforms, [1500, 500], [3,1]);//BR

		
		createPlatform(platforms, [50, 400], [2,1]); //BL
		createPlatform(platforms, [45, 640], [2,1]);
		createPlatform(platforms, [135, 780], [.2, 12]);
		createPlatform(platforms, [135, 330], [.2, 6]);

		// createPlatform(platforms, [355, 300], [1,1]);
		createPlatform(platforms, [625, 300], [2,1]);
		createPlatform(platforms, [925, 250], [1,1]);


			
		createPlatform(platforms, [800, 800,], [20, 0.9]); //floor

		//exit
		this.exit1 = createExit(this, "Level Select", false, [1500, 161], [2, 2], 8);
		this.exit2 = createExit(this, "Level Select", true, [300, 750], [1, 1]);

		//buttons
		this.button1 = createButton(this, 660, 785, 1, 1);
		this.button2 = createButton(this, 1460, 785, 1, 1);
		this.button3 = createButton(this, 70, 385, 1, 1);


		//layers
		const layer = this.add.layer();
		layer.add([this.player]);
		layer.setDepth(1);

		//portals
		this.portal1b = createPortal(this,`blue`, 20, 580, `right`);
		this.portal2b = createPortal(this,`blue`, 1570, 440, `left`);

		this.portal1o = createPortal(this,`orange`, 1290, 530, `up`);
		this.portal2o = createPortal(this,`orange`, 20, 130, `right`);


		//boxes

		this.box1;
		this.box2;
		this.box3;



		this.box1 = createBox(this, 420, 640, 1, 1, [this.player, this.box2, this.box3, platforms]);
		this.box2 = createBox(this, 420, 730, 1, 1, [this.player, this.box1, this.box3, platforms]);
		this.box3 = createBox(this, 1390, 430, 1, 1, [this.player, this.box1, this.box2, platforms]);

		//garage
		this.garage1 = createGarage(this,[1365,500], [.25,3], "UP",.03);
		this.garage2 = createGarage(this,[135,400], [.25,2.3], "UP",.003);
		this.garage3 = createGarage(this,[-6,245], [1.9,.2], "LEFT",.1);

		//rays
		this.ray = rayCreate(this, [this.box1, this.box2, this.box3, this.box4, this.box5, this.box6]);

		//interact
		this.physics.add.collider(this.player, platforms);
		addButtonOverlap(this, this.button1, [this.box1, this.box2, this.box3, this.player])
		addButtonOverlap(this, this.button2, [this.box1, this.box2, this.box3, this.player])
		addButtonOverlap(this, this.button3, [this.box1, this.box2, this.box3, this.player])

		joinPortals(this,this.portal1b, this.portal2b, [this.player]);
		joinPortals(this,this.portal1o, this.portal2o, [this.player, this.box3]);
		
	}

	update() {
		resettingFunctionality(this);
		playerControls(this);
		playerAnimUpdate(this);
		rayUpdate(this.ray, this);
		boxUpdate(this.box1);
		boxUpdate(this.box2);
		boxUpdate(this.box3);
		buttonUpdate(this.button1);
		buttonUpdate(this.button2);
		buttonUpdate(this.button3);
		garageUpdate(this.garage1, this.button1.isPressed);
		garageUpdate(this.garage2, this.button2.isPressed);
		garageUpdate(this.garage3, !this.button3.isPressed);
		portalUpdate(this);
		exitUpdate(this.exit1, this.button3.isPressed)
	}
}

export default LevelEight;
