import Phaser from "phaser";

import playerVars from "../../util functions/playerVars";
import playerControls from "../../util functions/playerControls";
import {
  createPlatform,
  platformObject,
  platformLoad,
} from "../../assets/objects/platforms/platform";
import levelOneBg from "../../assets/images/backgrounds/level.jpg";
import {
  exitLoad,
  createExit,
  exitUpdate,
  setIsUnlocked,
} from "../../assets/objects/exit/exit";
import {
  playerAnimPreload,
  playerAnimCreate,
  playerAnimUpdate,
} from "../../util functions/playerAnims";
import {
  buttonVars,
  buttonLoad,
  createButton,
  addButtonOverlap,
  buttonUpdate,
} from "../../assets/objects/buttons/button";
import {
  portalLoad,
  createPortal,
  joinPortals,
  portalVars,
  portalUpdate,
} from "../../assets/objects/portals/portal";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelFive extends Phaser.Scene {
  constructor() {
    super(`Level Five`);
    playerVars(this);
    buttonVars(this);
    portalVars(this);
  }

  preload() {
    playerAnimPreload(this);
    this.load.image("bg", levelOneBg);

    exitLoad(this);
    platformLoad(this);
    portalLoad(this, "blue");
    portalLoad(this, "green");
    portalLoad(this, "orange");
    portalLoad(this, "pink");
    portalLoad(this, "red");
    buttonLoad(this);
  }

  create() {
    //declarations
    const platforms = platformObject(this);

    //background

    const bg = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      "bg"
    );
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    //player
    this.player = this.physics.add.sprite(200, 700, "character").setScale(3, 3);

    this.player.setCollideWorldBounds(true);
    this.controls = this.input.keyboard.addKeys(
      `W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`
    );

    playerAnimCreate(this);

    //platforms
    createPlatform(platforms, [800, 800], [20, 0.9]);
    createPlatform(platforms, [1095, 400], [2, 0.6]);
    createPlatform(platforms, [1000, 385], [0.1, 0.6]);

    //portals
    this.portal1 = createPortal(this, `green`, 1570, 740, `left`);
    this.portal2 = createPortal(this, `red`, 30, 80, `right`);
    joinPortals(this, this.portal1, this.portal2, [this.player]);

    this.portal3 = createPortal(this, `pink`, 800, 200, `right`);
    this.portal4 = createPortal(this, `blue`, 500, 25, `down`);
    joinPortals(this, this.portal3, this.portal4, [this.player]);

    this.portal5 = createPortal(this, `green`, 1000, 100, `left`);
    this.portal6 = createPortal(this, `orange`, 250, 400, `up`);
    joinPortals(this, this.portal5, this.portal6, [this.player]);

    this.portal7 = createPortal(this, `red`, 1575, 300, `left`);
    this.portal8 = createPortal(this, `pink`, 700, 400, `up`);
    joinPortals(this, this.portal7, this.portal8, [this.player]);

    this.portal9 = createPortal(this, `blue`, 1500, 25, `down`);
    this.portal10 = createPortal(this, `red`, 1300, 500, `up`);
    joinPortals(this, this.portal7, this.portal8, [this.player]);

    //button
    this.exitButton = createButton(this, 1165, 390, 1, 1);
    addButtonOverlap(this, this.exitButton, [this.player]);

    //enterence
    this.entrance = createExit(this, `Level Select`, true, [50, 750], [1, 1]);

    //exit
    this.exit1 = createExit(
      this,
      "Level Select",
      false,
      [1000, 715],
      [2, 2],
      5
    );

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
    exitUpdate(this.exit1, this.isExitUnlocked);
    if (this.exitButton.isPressed) {
      this.isExitUnlocked = true;
    }
  }
}

export default LevelFive;
