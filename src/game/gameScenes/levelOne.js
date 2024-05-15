import Phaser from "phaser";
import mC from "../game/assets/images/character/pixilart-drawing.png";
import verycool from "../game/assets/images/character/verycool.png";
import Platform from "../assets/objects/platforms/platform";

class Test1 extends Phaser.Scene {
	constructor() {
		super(`Test1`);
		this.player;
		this.controls;
		this.playerSpeed = 100;
		this.playerAcceleration = 15;
		this.playerInAirAcceleration = 3;
		this.playerDeceleration = 20;
		this.playerJumpHeight = 150;
		this.playerMaxRunSpeed = 150;
	}
	preload() {
		this.load.image(`player`, verycool);
	}

	create() {
		this.player = this.physics.add.image(200, 200, `player`);
		this.player.body.setMaxVelocityX(this.playerMaxRunSpeed);

		this.controls = this.input.keyboard.addKeys(`W,S,A,D,UP,DOWN,RIGHT,LEFT,SPACE`);

		this.player.setCollideWorldBounds(true);
	}

	update() {
		// If we press one of the jump buttons, we jump!
		if ((this.controls.W.isDown || this.controls.SPACE.isDown || this.controls.UP.isDown) && this.player.body.onFloor()) {
			this.player.body.setVelocityY(-this.playerJumpHeight);

			// If we press the button to move right, we move right.
		} else if (this.controls.D.isDown || this.controls.RIGHT.isDown) {
			if (this.player.body.onFloor()) {
				// If we're moving in one direction, and then we decide to move in the other direction, the player will decelerate at this.playerDeceleration. And then afterwords, accelerate at this.playerAcceleration.
				if (this.player.body.velocity.x < 0) {
					this.player.body.setVelocityX(this.player.body.velocity.x + this.playerDeceleration);
				} else {
					this.player.body.setVelocityX(this.player.body.velocity.x + this.playerAcceleration);
				}
			} else {
				this.player.body.setVelocityX(this.player.body.velocity.x + this.playerInAirAcceleration);
			}
			// If we press the button to move left, we move left.
		} else if (this.controls.A.isDown || this.controls.LEFT.isDown) {
			if (this.player.body.onFloor()) {
				// If we're moving in one direction, and then we decide to move in the other direction, the player will decelerate at this.playerDeceleration. And then afterwords, accelerate at this.playerAcceleration.
				if (this.player.body.velocity.x > 0) {
					this.player.body.setVelocityX(this.player.body.velocity.x - this.playerDeceleration);
				} else {
					this.player.body.setVelocityX(this.player.body.velocity.x - this.playerAcceleration);
				}
			} else {
				this.player.body.setVelocityX(this.player.body.velocity.x - this.playerInAirAcceleration);
			}
			// If we don't press any button, we will slow down and stop.
		} else if (this.player.body.onFloor() && this.player.body.velocity.x != 0) {
			// To prevent us from making an infinite loop
			if (this.player.body.velocity.x > -this.playerDeceleration && this.player.body.velocity.x < this.playerDeceleration) {
				this.player.body.setVelocityX(0);
			} else if (this.player.body.velocity.x < 0) {
				this.player.body.setVelocityX(this.player.body.velocity.x + this.playerDeceleration);
			} else {
				this.player.body.setVelocityX(this.player.body.velocity.x - this.playerDeceleration);
			}
		}
	}
}

export default Test1;
