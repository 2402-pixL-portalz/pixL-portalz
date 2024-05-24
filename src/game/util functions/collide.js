//code for testing collision, may be used later for other colissions
// import character from "../assets/images/character/littleGuy.png";
import idleAnimation from "../assets/spritesheets/dogwaterCharacter/badIdle.png";

const collidePre = (level) => {
  level.load.spritesheet("character2", idleAnimation, {
    frameWidth: 32,
    frameHeight: 32
  })


}

const Collide = (level) => {

  level.player2 = level.physics.add.sprite(300, 650, "character2").setScale(3, 3)
  level.player2.body.allowGravity = false;

  level.physics.add.overlap(level.player, level.player2, () => {
    
    console.log(level.player.body.onFloor());
    

  })
  

}

export {Collide, collidePre};