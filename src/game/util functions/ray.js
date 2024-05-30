import ray from "../assets/ray/ray.png";

const rayLoad = (level) => {
level.load.image("ray", ray);
}

const rayCreate = (level, boxes) => {
  const ray = level.physics.add.image(level.player.body.x, level.player.body.y , "ray");
  ray.body.allowGravity = false;


  level.physics.add.overlap(ray, boxes,null, () => {
    level.rayInteract = true;
    return true;
  });
  ray.alpha = 0;
  ray.setScale(2,.5);
  ray.setOffset(0, 50);
  return ray;
}

const rayUpdate = (ray, level) => {
ray.setX(level.player.body.x + 20)
ray.setY(level.player.body.y + 38);

if(level.rayInteract === false){
  level.player.fakeOnFloor = false;
}
if(level.rayInteract === true){
  level.player.fakeOnFloor = true;
  level.rayInteract = false;
}

}

export {rayLoad, rayCreate, rayUpdate};