import idleAnimation from "../assets/spritesheets/dogwaterCharacter/badIdle.png";
import startRun from "../assets/spritesheets/dogwaterCharacter/badRunningAnimation.png";
import keepRunning from "../assets/spritesheets/dogwaterCharacter/badKeepRunning.png";
import jump from "../assets/spritesheets/dogwaterCharacter/badJump.png";




const playerAnimPreload = (level) => {

  level.load.spritesheet(`startRun`, startRun, {
    frameWidth: 32,
    frameHeight: 32
  });

  level.load.spritesheet("character", idleAnimation, {
    frameWidth: 32,
    frameHeight: 32
  })

  level.load.spritesheet("continueRunning", keepRunning, {
    frameWidth: 32,
    frameHeight: 32
  })

  level.load.spritesheet("jump", jump, {
    frameWidth: 32,
    frameHeight: 32
  });


  level.movingL = false;
  level.movingR = false;
  level.inAir = false;
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


  level.player.play("idle");
  level.player.body.setSize(13, 26)
  // level.player.body.setOffset(9,6)
}


const playerAnimUpdate = (level) => {

  //if the character is NOT on the floor and "inAir" is set to FALSE, play the "jump" animation and set "inAir" to TRUE
  if (!level.player.body.onFloor() && level.inAir === false) {
    // console.log("in air true");
    level.player.play("jump");
    level.inAir = true;
  }

  //if the character is on the floor, and "inAir" is set to TRUE, set "inAir" to FALSE and check to see if the character moving LEFT or RIGHT, if they are, play the "keepRunning" animation, if not, play the "idle" animation
  else if (level.player.body.onFloor() && level.inAir === true) {
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
    level.player.setScale(3, 3)
    level.player.setOffset(9, 4);
    if (!level.inAir) {
      level.player.play("runStart");
    }

    // console.log("movingR true");
  }

  //if the player's x velocity is less than 10, and "movingR" is TRUE, and "movingL" is FALSE, set "movingR" to FALSE, if the character is NOT in the air, play the "idle" animation
  else if (level.player.body.velocity.x < 10 && level.movingR === true && level.movingL === false) {
    level.movingR = false;
    if (!level.inAir) {
      level.player.stop("runStart");
      level.player.play("idle");
    }
    // console.log("movingR false")
  }
  
  
  //the code below is the same as the ones above but for movement in the left, see above for detailed explaination 

  //if the character is moving left, make the image face left, and if they are on the ground start a running animation
  if ((level.player.body.velocity.x < -10) && level.movingL === false) {
    // console.log("movingL true");
    if (!level.inAir) {
      level.player.play("runStart");
    }
    level.player.setScale(-3, 3)
    level.player.setOffset(23, 4);
    level.movingL = true;
  }
  //if the character was moving left but has stopped, if they are on the ground play the idle animation
  else if (level.player.body.velocity.x > -10 && level.movingL === true && level.movingR === false) {
    level.movingL = false;
    if (!level.inAir) {
      level.player.stop("runStart");
      level.player.play("idle");
    }
    // console.log("movingL false");
  }

  //if the "runStart" animation has completed, play "keep running animation"
  if (level.player.anims.currentAnim.key === "runStart" && level.player.anims.isPlaying === false) {
    level.player.play("keepRunning");
  }

}

export { playerAnimPreload, playerAnimCreate, playerAnimUpdate };



