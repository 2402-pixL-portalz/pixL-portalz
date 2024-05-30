import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import { exitLoad, createExit, exitUpdate, setIsUnlocked } from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";
import { buttonVars, buttonLoad, createButton, addButtonOverlap, buttonUpdate } from "../../assets/objects/buttons/button";
import { garageLoad, createGarage, garageUpdate } from "../../assets/objects/garage/garage";
import { portalLoad, createPortal, joinPortals, portalVars, portalUpdate} from "../../assets/objects/portals/portal";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelFour extends Phaser.Scene {
	constructor() {
		super(`Level Four`);
		playerVars(this);
		buttonVars(this);
		portalVars(this);
	}

	preload() {
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);

		exitLoad(this);
		platformLoad(this);
		buttonLoad(this);
		garageLoad(this);
		portalLoad(this, "blue");
		portalLoad(this, "green");
		portalLoad(this, "orange");
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.sprite(80, 700, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`);

		playerAnimCreate(this);

		//platforms
		createPlatform(platforms, [800, 800], [20, 0.9]);

		createPlatform(platforms, [1300, 750], [2, 0.6]);
		createPlatform(platforms, [1000, 650], [2, 0.6]);
		createPlatform(platforms, [1300, 550], [2, 0.6]);
		createPlatform(platforms, [1000, 450], [2, 0.6]);
		createPlatform(platforms, [1300, 350], [2, 0.6]);
		createPlatform(platforms, [1000, 250], [2, 0.6]);
		createPlatform(platforms, [100, 200], [7, 0.6]);
		createPlatform(platforms, [100, 500], [7, 0.6]);

		//portals
		this.portal1 = createPortal(this, `green`, 100, 610, `down`);
		this.portal2 = createPortal(this, `green`, 525, 80, `right`);
		joinPortals(this, this.portal1, this.portal2, [this.player]);

		this.portal3 = createPortal(this, `blue`, 715, 150, `left`);
		this.portal4 = createPortal(this, `blue`, 25, 425, `right`);
		joinPortals(this, this.portal3, this.portal4, [this.player]);

		this.portal5 = createPortal(this, `orange`, 650, 450, `left`);
		this.portal6 = createPortal(this, `orange`, 100, 35, `down`);
		joinPortals(this, this.portal5, this.portal6, [this.player]);

		//buttons
		this.garageButton = createButton(this, 250, 498, 1, 1);
    addButtonOverlap(this, this.garageButton, [this.player]);

    this.exitButton = createButton(this, 200, 198, 1, 1);
    addButtonOverlap(this, this.exitButton, [this.player]);

		

		//garage
		this.garage = createGarage(this, [468, 1], [.3, 5], 'UP', 0.1);

		//exit
		this.exit1 = createExit(this, "Level Select", false, [250, 750], [1, 1]);

		this.entrance = createExit(this, `Level Select`, true, [50, 750], [.5, 1]);

		//interact
		this.physics.add.collider(this.player, platforms);

		//layers
		const layer = this.add.layer();
		layer.add([this.player]);
		layer.setDepth(1);

		
	}

	update() {
		playerControls(this);
		playerAnimUpdate(this);
		buttonUpdate(this);
		portalUpdate(this);
		resettingFunctionality(this);
		garageUpdate(this.garage, this.isGarageOpen);
		if (this.garageButton.isPressed) {
			this.isGarageOpen = true;
	}
	if (this.exitButton.isPressed) {
			this.isExitUnlocked = true;
	}
	exitUpdate(this.exit1, this.isExitUnlocked);
	}
}

export default LevelFour;
