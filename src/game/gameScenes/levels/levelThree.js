import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import { exitLoad, createExit } from "../../assets/objects/exit/exit";
import { playerAnimPreload, playerAnimCreate, playerAnimUpdate } from "../../util functions/playerAnims";
import { createPortal, joinPortals, portalLoad, portalUpdate, portalVars } from "../../assets/objects/portals/portal";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelThree extends Phaser.Scene {
	constructor() {
		super(`Level Three`);
		playerVars(this);
		portalVars(this);
	}

	preload() {
		playerAnimPreload(this);
		this.load.image("bg", levelOneBg);

		portalLoad(this, `green`);
		portalLoad(this, `orange`);
		portalLoad(this, `pink`);
		portalLoad(this, `gray`);
		exitLoad(this);
		platformLoad(this);
	}

	create() {
		//declarations
		const platforms = platformObject(this);

		//background

		const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
		bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

		//player
		this.player = this.physics.add.sprite(150, 600, "character").setScale(3, 3);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`);

		playerAnimCreate(this);

		//platforms
		createPlatform(platforms, [800, 800], [20, 0.9]);

		createPlatform(platforms, [800, 400], [20, 2]);
		createPlatform(platforms, [800, 400], [0.5, 45]);

		this.portal1 = createPortal(this, `green`, 750, 740, `left`);
		this.portal2 = createPortal(this, `green`, 1575, 740, `left`);
		joinPortals(this, this.portal1, this.portal2, [this.player]);

		this.portal3 = createPortal(this, `orange`, 875, 760, `up`);
		this.portal4 = createPortal(this, `orange`, 875, 35, `down`);
		joinPortals(this, this.portal3, this.portal4, [this.player]);

		this.portal5 = createPortal(this, `pink`, 1575, 330, `left`);
		this.portal6 = createPortal(this, `pink`, 400, 35, `down`);
		joinPortals(this, this.portal5, this.portal6, [this.player]);

		this.portal7 = createPortal(this, `gray`, 50, 350, `up`);
		this.portal8 = createPortal(this, `gray`, 50, 35, `down`);
		joinPortals(this, this.portal7, this.portal8, [this.player]);

		//exit
		this.exit1 = createExit(this, `Level Select`, true, [700, 300], [2, 2]);

		this.entrance = createExit(this, `Level Select`, true, [50, 750], [1, 1]);

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
		portalUpdate(this);
		resettingFunctionality(this);
	}
}

export default LevelThree;
