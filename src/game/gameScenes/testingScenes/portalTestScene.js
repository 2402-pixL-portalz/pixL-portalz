import Phaser from "phaser";
import mC from "../../assets/images/character/pixilart-drawing.png";
import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import dayImage from "./../../assets/images/backgrounds/day.png";
import { addTeleportingOverlap, createPortal, portalLoad, portalUpdate, portalVars } from "../../assets/objects/portals/portal";

class PortalTest extends Phaser.Scene {
	constructor() {
		super("portal test");
		playerVars(this);
		portalVars(this);
		this.c = 0;
	}

	preload() {
		this.load.image(`player`, mC);
		this.load.image(`day`, dayImage);

		portalLoad(this, `blue`);
	}

	create() {
		this.bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "day");

		//player
		this.player = this.physics.add.image(100, 500, `player`).setScale(1.6, 1.6);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.player.setCollideWorldBounds(true);
		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		this.myPortal = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 100, `down`);
		this.myPortal2 = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 500, `down`);

		addTeleportingOverlap(this, this.myPortal, this.myPortal2, [this.player]);
		addTeleportingOverlap(this, this.myPortal2, this.myPortal, [this.player]);

		this.bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
	}

	update() {
		playerControls(this);

		portalUpdate(this);
	}
}

export default PortalTest;
