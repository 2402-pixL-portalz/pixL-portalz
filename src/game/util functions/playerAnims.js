import idleAnimation from "../assets/spritesheets/dogwaterCharacter/badIdle.png";
import startRun from "../assets/spritesheets/dogwaterCharacter/badRunningAnimation.png";
import keepRunning from "../assets/spritesheets/dogwaterCharacter/badKeepRunning.png";
import jump from "../assets/spritesheets/dogwaterCharacter/badJump.png";
import runParticle from "../assets/images/particles/runningParticle.png";
import fall from "../assets/spritesheets/dogwaterCharacter/badFall.png";
import differentRunning from "../assets/spritesheets/dogwaterCharacter/differentRunning.png";
import extraDifferentIdle from "../assets/spritesheets/dogwaterCharacter/extraDifferentIdle.png";
import differentBadKeepRunning from "../assets/spritesheets/dogwaterCharacter/differentBadKeepRunning.png";



const playerAnimPreload = (level) => {

  level.load.spritesheet(`startRun`, differentRunning, {
    frameWidth: 32,
    frameHeight: 32
  });

  level.load.spritesheet("character", extraDifferentIdle, {
    frameWidth: 32,
    frameHeight: 32
  })

  level.load.spritesheet("continueRunning", differentBadKeepRunning, {
    frameWidth: 32,
    frameHeight: 32
  })

  level.load.spritesheet("jump", jump, {
    frameWidth: 32,
    frameHeight: 32
  });
  
  
  level.load.spritesheet("fall", fall, {
    frameWidth: 32,
    frameHeight: 32
  });

  level.load.image("runParticle", runParticle);


  level.movingL = false;
  level.movingR = false;
  level.inAir = false;

  level.runEmitter;
}

const playerAnimCreate = (level) => {
  level.anims.create({
    key: "idle",
    frames: level.anims.generateFrameNumbers("character"),
    frameRate: 2,
    repeat: -1
  })

  level.anims.create({
    key: "runStart",
    frames: level.anims.generateFrameNumbers("startRun"),
    frameRate: 15,
    repeat: 0
  })

  level.anims.create({
    key: "keepRunning",
    frames: level.anims.generateFrameNumbers("continueRunning"),
    frameRate: 20,
    repeat: -1
  })

  level.anims.create({
    key: "jump",
    frames: level.anims.generateFrameNumbers("jump"),
    frameRate: 10,
    repeat: 0
  })

  level.anims.create({
    key: "fall",
    frames: level.anims.generateFrameNumbers("fall"),
    frameRate: 10,
    repeat: 0
  })

  level.runEmitter = level.add.particles(100, 300, 'runParticle', {
      speed: {min: 100, max: 100},
      angle: {min: -180, max: 0},
      scale: {start: .05, end: 0},
      lifespan: 500,
      gravityY: 700,
      gravityX: 700,
      quantity: 2,
      duration: 100,
    })

  level.runEmitter.stop();
  level.player.play("idle");
  level.player.body.setSize(13, 26)
  // level.player.body.setOffset(9,6)
}


const playerAnimUpdate = (level) => {

  


  //if the character is NOT on the floor and "inAir" is set to FALSE, play the "jump" animation and set "inAir" to TRUE
  if (!(level.player.body.onFloor() || level.player.fakeOnFloor) && level.inAir === false && (level.controls.W.isDown || level.controls.UP.isDown || level.controls.SPACE.isDown)) {
    // console.log("in air true");
    level.player.play("jump");
    level.inAir = true;
  }

  else if(!(level.player.body.onFloor() || level.player.fakeOnFloor) && level.inAir === false){
    // console.log("works yay");

    level.player.play("fall");
    level.inAir = true;
  }

  //if the character is on the floor, and "inAir" is set to TRUE, set "inAir" to FALSE and check to see if the character moving LEFT or RIGHT, if they are, play the "keepRunning" animation, if not, play the "idle" animation
  else if ((level.player.body.onFloor() || level.player.fakeOnFloor) && level.inAir === true) {
    level.inAir = false;
    if (level.movingL || level.movingR) {
      level.player.play("keepRunning");
    }
    else {
      level.player.play("idle");
    }
  }

  //if the character's x velocity is greater than 10(moving right), and "movingR" is FALSE, set "movingR" to TRUE, and set the character image to look right, if the character is NOT in the air, play the "runStart" animation
  if ((level.player.body.velocity.x > 10) && level.movingR === false) {
    level.movingR = true;
    // console.log("xflip pos");
    level.player.setScale(3, 3)
    level.player.setOffset(9, 4);
    if (!level.inAir) {
      level.player.play("runStart");
      level.runEmitter.setPosition(level.player.body.position.x + 18,level.player.body.position.y + 70);
      level.runEmitter.gravityX = -1000;
      level.runEmitter.start();
    }

    // console.log("movingR true");
  }

  //if the player's x velocity is less than 10, and "movingR" is TRUE, and "movingL" is FALSE, set "movingR" to FALSE, if the character is NOT in the air, play the "idle" animation
  else if (level.player.body.velocity.x < 10 && level.movingR === true) {
    level.movingR = false;
    if (!level.inAir) {
      level.player.stop("runStart");
      level.player.play("idle");
    }
    // console.log(`movingR false ${level.player.body.velocity.x}`)
  }
  
  
  //the code below is the same as the ones above but for movement in the left, see above for detailed explaination 

  //if the character is moving left, make the image face left, and if they are on the ground start a running animation


  else if ((level.player.body.velocity.x < -10) && level.movingL === false) {
    // console.log("movingL true");
    if (!level.inAir) {
      level.player.play("runStart");
      level.runEmitter.setPosition(level.player.body.position.x + 18,level.player.body.position.y + 70);
      level.runEmitter.gravityX = 1000;
      level.runEmitter.start();
    }
    // console.log("xflip neg");
    level.player.setScale(-3, 3)
    level.player.setOffset(23, 4);
    level.movingL = true;
  }
  //if the character was moving left but has stopped, if they are on the ground play the idle animation
  else if (level.player.body.velocity.x > -10 && level.movingL === true) {
    level.movingL = false;
    if (!level.inAir && !level.movingR) {
      level.player.stop("runStart");
      level.player.play("idle");
    }
    // console.log(`movingL false ${level.player.body.velocity.x}`)

  }

  //if the "runStart" animation has completed, play "keep running animation"
  if (level.player.anims.currentAnim.key === "runStart" && level.player.anims.isPlaying === false) {
    level.player.play("keepRunning");
  }

}

export { playerAnimPreload, playerAnimCreate, playerAnimUpdate };



