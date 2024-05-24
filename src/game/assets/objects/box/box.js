// Import the box image from the specified path
import boxImage from "../../images/box/box.png";

// Load the box image into the game
const boxLoad = (This) => {
	This.load.image("box", boxImage);
};

// Create a box sprite at (x, y) with specified scale and collision settings
const createBox = (This, x, y, scaleX, scaleY, objectsAllowedToCollide) => {
	const box = This.physics.add.sprite(x, y, "box").setScale(scaleX, scaleY);

	box.inAir = true;
	box.setDrag(0, 0);
	box.setCollideWorldBounds(true);

	This.physics.add.collider(box, objectsAllowedToCollide);
	return box;
};

// Update the box's drag based on its in-air or on-floor state
const boxUpdate = (box) => {
	if (box.body.onFloor() && box.inAir) {
		box.setDrag(300, 0);
		box.inAir = false;
	} else if (!box.body.onFloor() && !box.inAir) {
		box.setDrag(0, 0);
		box.inAir = true;
	}
};

// Export the functions for external use
export { boxLoad, createBox, boxUpdate };

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

// import Phaser from "phaser";

// class Box extends Phaser.Physics.Arcade.Sprite {
// 	constructor(scene, x, y) {
// 		super(scene, x, y, "box");
// 		scene.add.existing(this);
// 		scene.physics.add.existing(this);

// 		// Physics properties for box
// 		this.setCollideWorldBounds(true);
// 		this.setBounce(0.3);
// 		this.setDrag(100, 100);
// 		this.setAngularDrag(10);
// 		this.setMass(10);
// 		this.body.setGravityY(300);

// 		this.setSize(this.width, this.height);
// 		this.setOrigin(0.5, 0.5);

// 		this.landed = false;
// 	}

// 	handlePush(player) {
// 		if (Math.abs(player.y - this.y) > this.height / 2) {
// 			const flipImpulse = 50;
// 			let flipDirection = 1;

// 			if (player.x < this.x) {
// 				flipDirection = 1;
// 			} else if (player.x > this.x) {
// 				flipDirection = -1;
// 			}

// 			this.setAngularVelocity(flipDirection * flipImpulse);
// 			this.setVelocityX(flipDirection * flipImpulse);
// 		}
// 	}

// 	update() {
// 		if (!this.body.blocked.down) {
// 			this.setAngularVelocity(this.body.velocity.x);
// 			this.landed = false;
// 		} else {
// 			if (!this.landed) {
// 				const forwardForce = Math.sign(this.body.velocity.x) * 85;
// 				this.setVelocityX(this.body.velocity.x + forwardForce);
// 				this.landed = true;
// 			}

// 			// Gradually reduce angular velocity
// 			this.setAngularVelocity(this.body.angularVelocity * 0.91);

// 			// If the box is moving slowly, make it rotate to the nearest flat side
// 			if (Math.abs(this.body.angularVelocity) < 0.1 && Math.abs(this.body.velocity.x) < 50) {
// 				const angle = this.angle % 360;
// 				const nearestRightAngle = Math.round(angle / 90) * 90;
// 				const angleDifference = nearestRightAngle - angle;

// 				if (Math.abs(angleDifference) < 100) {
// 					this.setAngle(nearestRightAngle);
// 					this.setAngularVelocity(1);
// 					this.setVelocityX(1);
// 				} else {
// 					// Apply a small angular velocity to nudge the box towards a flat side
// 					this.setAngularVelocity(angleDifference * 700);
// 				}
// 			}
// 		}
// 	}
// }

// export default Box;
