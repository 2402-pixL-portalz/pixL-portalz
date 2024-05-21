import idleAnimation from "../assets/spritesheets/dogwaterCharacter/badIdle.png";
import startRun from "../assets/spritesheets/dogwaterCharacter/badRunningAnimation.png";
import keepRunning from "../assets/spritesheets/dogwaterCharacter/badKeepRunning.png";


const playerAnimUpdate = (level) => {


  if ((level.player.body.velocity.x > 10) && level.movingR === false) {
    level.player.play("runStart");
    level.player.setScale(3, 3)
    level.player.setOffset(0, 0);
    level.movingR = true;
  }

  else if (level.player.body.velocity.x < 10 && level.movingR === true) {
    level.movingR = false;
    level.player.stop("runStart");
    level.player.play("idle");
  }

  else if (level.player.anims.currentAnim.key === "runStart" && level.player.anims.isPlaying === false) {
    level.player.play("keepRunning");
  }


  if ((level.player.body.velocity.x < -10) && level.movingL === false) {
    level.player.setScale(-3, 3)
    level.player.setOffset(32, 0);
    level.player.play("runStart");
    level.movingL = true;
  }

  else if (level.player.body.velocity.x > -10 && level.movingL === true) {
    level.movingL = false;
    level.player.stop("runStart");
    level.player.play("idle");
  }

  else if (level.player.anims.currentAnim.key === "runStart" && level.player.anims.isPlaying === false) {

    level.player.play("keepRunning");
  }

}


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


  level.movingL = false;
  level.movingR = false;
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

  level.player.play("idle");
}


export{playerAnimPreload,playerAnimCreate,playerAnimUpdate};



