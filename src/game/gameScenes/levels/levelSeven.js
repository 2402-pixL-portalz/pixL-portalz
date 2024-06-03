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
} from "../../assets/objects/exit/exit";
import {
  playerAnimPreload,
  playerAnimCreate,
  playerAnimUpdate,
} from "../../util functions/playerAnims";
import {
  buttonLoad,
  createButton,
  addButtonOverlap,
  buttonUpdate,
} from "../../assets/objects/buttons/button";
import {
  garageLoad,
  createGarage,
  garageUpdate,
} from "../../assets/objects/garage/garage";
import {
  portalLoad,
  createPortal,
  joinPortals,
  portalVars,
  portalUpdate,
} from "../../assets/objects/portals/portal";
import resettingFunctionality from "../../util functions/resettingFunctionality";

class LevelSeven extends Phaser.Scene {
  constructor() {
    super(`Level Seven`);
    playerVars(this);
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
    buttonLoad(this);
    garageLoad(this);
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
    this.player = this.physics.add.sprite(150, 735, "character").setScale(3, 3);

    this.player.setCollideWorldBounds(true);
    this.controls = this.input.keyboard.addKeys(
      `W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE,R`
    );

    playerAnimCreate(this);

    //platforms
    createPlatform(platforms, [800, 350], [16, 0.6]);
    createPlatform(platforms, [600, 690], [12, 0.6]);

    //walls
    createPlatform(platforms, [600, 520], [0.2, 14.8]);
    createPlatform(platforms, [450, 90], [0.2, 23]);
    createPlatform(platforms, [800, 90], [0.2, 23]);

    //floor
    createPlatform(platforms, [800, 800], [20, 0.9]);

    //portals
    this.portal1 = createPortal(this, `orange`, 835, 295, `right`);
    this.portal2 = createPortal(this, `orange`, 1575, 740, `left`);
    joinPortals(this, this.portal1, this.portal2, [this.player]);

    this.portal3 = createPortal(this, `green`, 485, 295, `right`);
    this.portal4 = createPortal(this, `green`, 640, 635, `right`);
    joinPortals(this, this.portal3, this.portal4, [this.player]);

    this.portal5 = createPortal(this, `pink`, 765, 295, `left`);
    this.portal6 = createPortal(this, `pink`, 30, 635, `right`);
    joinPortals(this, this.portal5, this.portal6, [this.player]);

    this.portal9 = createPortal(this, `blue`, 25, 745, `right`);
    this.portal10 = createPortal(this, `blue`, 415, 295, `left`);
    joinPortals(this, this.portal9, this.portal10, [this.player]);

    //buttons
    this.button = [];
    this.button.push(createButton(this, 300, 340, 1, 1));

    this.button.push(createButton(this, 800, 680, 1, 1));

    this.button.push(createButton(this, 400, 680, 1, 1));

    this.button.push(createButton(this, 1300, 340, 1, 1));

    this.button.forEach((button) =>
      addButtonOverlap(this, button, [this.player])
    );

    //garage
    this.garage = [];
    this.garage.push(createGarage(this, [1000, 360], [0.3, 3.1], "UP", 0.1)); //garage 0
    this.garage.push(createGarage(this, [300, 360], [0.3, 3.1], "UP", 0.1)); //garage 1
    this.garage.push(createGarage(this, [200, 3], [0.3, 3.3], "UP", 0.1)); //garage 2
    this.garage.push(createGarage(this, [1200, 3], [0.3, 3.3], "UP", 0.1)); //garage 3

    //map to link buttons to garages
    this.buttonGarageMap = new Map();
    this.buttonGarageMap.set(this.button[0], this.garage[0]);
    this.buttonGarageMap.set(this.button[1], this.garage[1]);
    this.buttonGarageMap.set(this.button[2], this.garage[3]);
    this.buttonGarageMap.set(this.button[3], this.garage[2]);

    //garage states
    this.isGarageOpen = new Map();
    this.garage.forEach((garage) => this.isGarageOpen.set(garage, false));

    //exit
    this.exit1 = createExit(this, "Level Select", true, [100, 265], [2, 2], 7);

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
    this.button.forEach((button) => {
      buttonUpdate(button);
    });
    portalUpdate(this);
    resettingFunctionality(this);

    this.button.forEach((button) => {
      if (button.isPressed) {
        const garage = this.buttonGarageMap.get(button);
        this.isGarageOpen.set(garage, true);
      }
    });

    this.garage.forEach((garage) => {
      garageUpdate(garage, this.isGarageOpen.get(garage));
    });
  }
}

export default LevelSeven;
