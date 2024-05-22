import Phaser from "phaser";

class Box extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "box");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Physics properties for box
    this.setCollideWorldBounds(true);
    this.setBounce(0.3);
    this.setDrag(100, 100);
    this.setAngularDrag(10);
    this.setMass(10);
    this.body.setGravityY(300);

    this.setSize(this.width, this.height);
    this.setOrigin(0.5, 0.5);
    this.boxFlipped = false;
    this.landed = false;
  }

  handlePush(player) {
    if (!this.boxFlipped) {
      if (Math.abs(player.y - this.y) < this.height / 2) {
        this.boxFlipped = true;

        const flipImpulse = 50;
        let flipDirection = 1;

        if (player.x < this.x) {
          flipDirection = 1;
        } else if (player.x > this.x) {
          flipDirection = -1;
        }

        this.setAngularVelocity(flipDirection * flipImpulse);
        this.setVelocityX(flipDirection * flipImpulse);
      }
    }
  }

  update() {
    if (!this.body.blocked.down) {
      this.setAngularVelocity(this.body.velocity.x);
      this.landed = false;
    } else {
      if (!this.landed) {
        const forwardForce = Math.sign(this.body.velocity.x) * 85;
        this.setVelocityX(this.body.velocity.x + forwardForce);
        this.landed = true;
      }

      // Gradually reduce angular velocity
      this.setAngularVelocity(this.body.angularVelocity * 0.91);

      // If the box is moving slowly, make it rotate to the nearest flat side
      if (
        Math.abs(this.body.angularVelocity) < 0.1 &&
        Math.abs(this.body.velocity.x) < 50
      ) {
        const angle = this.angle % 360;
        const nearestRightAngle = Math.round(angle / 90) * 90;
        const angleDifference = nearestRightAngle - angle;

        if (Math.abs(angleDifference) < 100) {
          this.setAngle(nearestRightAngle);
          this.setAngularVelocity(1);
          this.setVelocityX(1);
        } else {
          // Apply a small angular velocity to nudge the box towards a flat side
          this.setAngularVelocity(angleDifference * 700);
        }
      }

      // Gradually reduce linear velocity
      this.setVelocityX(this.body.velocity.x * 0.95);
    }
  }
}

export default Box;
