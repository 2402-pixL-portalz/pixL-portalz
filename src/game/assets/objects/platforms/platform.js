import platformImg from "../../images/platforms/platform.png";

//takes in "this" from the scene it is called in
const Platform = (level) => {
  
  //runs a statement to preload
  level.load.image("platform", platformImg);
}

//creation of the object for the platform
const platformObject = (level) => {
  //returns details of object to be used in a variable
  return level.physics.add.staticGroup();
}

//create platforms function takes in the platform object, an array with both the x position and the y position, and an array with the length/height scaling
const createPlatform = (platform,[xPosition,yPosition],[lengthScale, heightScale]) => {

  platform.create(xPosition, yPosition, "platform").setScale(lengthScale, heightScale).refreshBody();
  //returns created platform 
  return platform;
}




export default Platform;

export{createPlatform, platformObject}