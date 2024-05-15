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
  return level.load.image("platform", platformImg);

}

export default Platform;