import exitImg from "../../images/exit/exit.png";

//preloads exit image
const exitLoad = (level) => {
  level.load.image("exit", exitImg);
}

//returns exit object details to a variable
const exitObject = (level) => {
  return level.physics.add.staticGroup();
}

//creates an exit which takes in the exit object, and array with the x/y positions, and an array with the length/height of the exit 
const createExit = (exit, [xPosition,yPosition],[lengthScale, heightScale]) => {
  exit.create(xPosition, yPosition, "exit").setScale(lengthScale, heightScale).refreshBody();
}

//checks, when the player is overlapping with the exit, to see if the user is pressing down the S or DOWN key, if they are, it starts the scene provided in the parameters
const goThroughExit = (level, scene) => {
if(level.controls.S.isDown || level.controls.DOWN.isDown){
  level.scene.start(scene);
}
}

export{exitLoad, exitObject, createExit, goThroughExit}