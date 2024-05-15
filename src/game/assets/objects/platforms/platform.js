import platformImg from "../../images/platforms/platform.png";

//very cool class thingy 

// class Platform {
//   constructor(level){
//     this.level = level
//   }

//   preload(){
//     return this.level.load.image("platform",platformImg);
//   }


// }


//takes in "this" from the scene it is called in
const Platform = (level) => {
  
  //returns a statement to preload
  level.load.image("platform", platformImg);
  return level.physics.add.staticGroup();
}

const createPlatform = (platform,[xPosition,yPosition],[lengthScale, heightScale]) => {

  platform.create(xPosition, yPosition, "platform").setScale(lengthScale, heightScale).refreshBody();

  return platform;
	

}

const platformObject = (level) => {

  return level.physics.add.staticGroup();
}





export default Platform;

export{createPlatform, platformObject}