import Phaser from "phaser";
import verycool from "../assets/images/character/verycool.png";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createExit, exitLoad, exitObject } from "../assets/objects/exit/exit";


class LevelSelect extends Phaser.Scene {
  constructor() {
    super("Level Select");
    playerVars(this);
  }

  preload() {
    this.load.image(`player`, verycool);
    exitLoad(this);
  }

  create() {

    //declarations
    const exit = exitObject(this);

    //exit
    createExit(exit, [100, 570], [1, 1]);


    //player
    this.player = this.physics.add.image(100, 500, `player`).setScale(.5, .5);
    this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

    this.player.setCollideWorldBounds(true);
    this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

  }

  update() {
    playerControls(this);

  }
}

export default LevelSelect