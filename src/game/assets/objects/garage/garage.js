import garage from "../../images/platforms/squarePlat.png";

const garageLoad = (level) => {
  level.load.image("garage", garage);

}

const createGarage = (level, [xPos, yPos], [xScale, yScale], collapseDir, collapseSpeed) => {

  const garage = level.physics.add.staticGroup().create(xPos, yPos, "garage").setScale(xScale, yScale).refreshBody();
  garage.body.allowGravity = false;
  garage.fixedX = xScale;
  garage.fixedY = yScale;
  garage.collapseDir = collapseDir;
  garage.collapseSpeed = collapseSpeed;

  if (collapseDir === 'LEFT') {
    garage.setOrigin(0);
  }
  else if (collapseDir === 'RIGHT') {
    garage.setOrigin(1);
  }
  else if (collapseDir === 'UP') {
    garage.setOrigin(.5, 0);
  }
  else if (collapseDir === 'DOWN') {
    garage.setOrigin(.5, 1);
  }
  garage.refreshBody();

  level.physics.add.collider(level.player, garage);

  return garage;

  // this.garage.setOrigin(0);
}

const garageUpdate = (garage, isConditionMet) => {

  if (garage.collapseDir != "UP" && garage.collapseDir != "DOWN") {
    if (isConditionMet && garage.scaleX > 0) {
      garage.setScale((garage.scaleX - garage.collapseSpeed), garage.scaleY);
      garage.refreshBody();
    }
    else if (garage.scaleX <= garage.fixedX && !isConditionMet) {
      garage.setScale((garage.scaleX + garage.collapseSpeed), garage.scaleY);
      garage.refreshBody();
    }
  }

  else {
    if (isConditionMet && garage.scaleY > 0) {
      garage.setScale(garage.scaleX, (garage.scaleY - garage.collapseSpeed));
      garage.refreshBody();
    }
    else if (garage.scaleY <= garage.fixedY && !isConditionMet) {
      garage.setScale(garage.scaleX, (garage.scaleY + garage.collapseSpeed));
      garage.refreshBody();
    }
  }


}


export { garageLoad, createGarage, garageUpdate }
