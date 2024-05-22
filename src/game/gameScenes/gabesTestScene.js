import Phaser from "phaser";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/white.png";
import mC from "../assets/images/character/pixilart-drawing.png";
import { portalVars, portalLoad, portalUpdate, createPortal, addTeleportingOverlap } from "../assets/objects/portals/portal";

import { playerAnimUpdate, playerAnimCreate, playerAnimPreload, } from "../util functions/playerAnims";

class GabeScene extends Phaser.Scene {
  constructor() {
    super(`GabeScene`);
    playerVars(this);
    portalVars(this);
  }

  preload() {
    this.load.image("player", mC);
    playerAnimPreload(this);
    this.load.image("bg", levelTwoBg);
    exitLoad(this);
    platformLoad(this);
    portalLoad(this, `blue`);

  }



  create() {
    //declarations
    const platforms = platformObject(this);

    //background
    const bg = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg");
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);




    //player
    this.player = this.physics.add.sprite(300, 300, "character").setScale(3, 3)

    this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

    this.player.setCollideWorldBounds(true);
    this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);


    //platforms

    createPlatform(platforms, [700, 750], [2, 1]);

    //animations

    playerAnimCreate(this);

    //portals 
    this.myPortal = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 100, `down`);
    this.myPortal2 = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 500, `down`);

    //interacts
    this.physics.add.collider(this.player, platforms);


    addTeleportingOverlap(this, this.myPortal, this.myPortal2, [this.player]);

		addTeleportingOverlap(this, this.myPortal2, this.myPortal, [this.player]);




  }

  update() {
    playerControls(this);
    playerAnimUpdate(this);
    portalUpdate(this);
  }
}

export default GabeScene;
