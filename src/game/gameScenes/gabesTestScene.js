import Phaser from "phaser";
import playerVars from "../util functions/playerVars";
import playerControls from "../util functions/playerControls";
import { createPlatform, platformObject, platformLoad } from "../assets/objects/platforms/platform";
import { exitLoad } from "../assets/objects/exit/exit";
import levelTwoBg from "../assets/images/backgrounds/white.png";
import { portalVars, portalLoad, portalUpdate, createPortal} from "../assets/objects/portals/portal";
import { playerAnimUpdate, playerAnimCreate, playerAnimPreload } from "../util functions/playerAnims";
import { createGarage, garageLoad, garageUpdate } from "../assets/objects/garage/garage";
import { buttonVars, buttonLoad, buttonUpdate, createButton, addButtonOverlap} from "../assets/objects/buttons/button";
import backgroundMusic from "../assets/audio/background/metal-bar.mp3"; //change the mp3 file
import { boxLoad, boxUpdate, createBox } from "../assets/objects/box/box";
import { rayLoad, rayCreate, rayUpdate } from "../util functions/ray";

class GabeScene extends Phaser.Scene {
  constructor() {
    super(`GabeScene`);
    playerVars(this);
    portalVars(this);
    buttonVars(this);
  }

  preload() {
    playerAnimPreload(this);
    this.load.image("bg", levelTwoBg);
    exitLoad(this);
    platformLoad(this);
    portalLoad(this, `blue`);
    garageLoad(this);
    buttonLoad(this);
    this.load.audio("backgroundMusic", backgroundMusic);
    boxLoad(this);
    rayLoad(this);
    
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

    createPlatform(platforms, [100,100], [.5,.5]);

    //animations

    playerAnimCreate(this);

    //portals 
    // this.myPortal = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 100, `down`);
    // this.myPortal2 = createPortal(this, `blue`, this.sys.game.config.width / 4, this.sys.game.config.height - 500, `down`);

    

    //buttons
    this.myButton = createButton(this, 700, 735, 1, 1);
    addButtonOverlap(this, this.myButton, [this.player]);

    //garage
    this.garage1 = createGarage(this, [1150,750],[3,.25],'RIGHT', .03);
    this.garage2 = createGarage(this, [500,350],[.25,3],'UP', .01);
    this.garage3 = createGarage(this, [1150,350],[.25,3],'DOWN', .02);
   
    

    //interacts
    this.physics.add.collider(this.player, platforms);
    // this.physics.add.collider(this.player, this.garage1);

    //audio
    this.backgroundMusic = this.sound.add("backgroundMusic");
    // this.backgroundMusic.play();

    //box?
    this.box1 = createBox(this, 500,500,1,1,this.player.body);

    this.ray = rayCreate(this, this.box1);

    console.log(this.player.body);



  }

  update() {
    
    playerControls(this);
    playerAnimUpdate(this);
    boxUpdate(this.box1);
    // portalUpdate(this);
    buttonUpdate(this, this.myButton);
    garageUpdate(this.garage1, this.myButton.isPressed);
    garageUpdate(this.garage2, this.myButton.isPressed);
    garageUpdate(this.garage3, this.myButton.isPressed);
    rayUpdate(this.ray, this);
    

    
  }
}

export default GabeScene;
