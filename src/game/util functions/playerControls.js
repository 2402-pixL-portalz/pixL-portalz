const playerControls = (This) => {
	// If we press one of the jump buttons, we jump!
	if ((This.controls.W.isDown || This.controls.SPACE.isDown || This.controls.UP.isDown) && (This.player.body.onFloor() || This.player.fakeOnFloor)) {
		This.player.body.setVelocityY(-This.playerJumpHeight);
	}

	// If we press the button to move right and we haven't reached our max run speed, we move right.
	else if ((This.controls.D.isDown || This.controls.RIGHT.isDown) && This.player.body.velocity.x <= This.playerMaxRunSpeed) {
		if ((This.player.body.onFloor() || This.player.fakeOnFloor)) {
			// If we're moving in one direction, and then we decide to move in the other direction, the player will decelerate at This.playerDeceleration. And then afterwords, accelerate at This.playerAcceleration.
			if (This.player.body.velocity.x < 0) {
				This.player.body.setVelocityX(This.player.body.velocity.x + This.playerDeceleration);
			} else {
				This.player.body.setVelocityX(This.player.body.velocity.x + This.playerAcceleration);
			}
		} else {
			This.player.body.setVelocityX(This.player.body.velocity.x + This.playerInAirAcceleration);
		}
		// If we press the button to move left and we haven't reached our max run speed, we move left.
	} else if ((This.controls.A.isDown || This.controls.LEFT.isDown) && This.player.body.velocity.x >= -This.playerMaxRunSpeed) {
		if ((This.player.body.onFloor() || This.player.fakeOnFloor)) {
			// If we're moving in one direction, and then we decide to move in the other direction, the player will decelerate at This.playerDeceleration. And then afterwords, accelerate at This.playerAcceleration.
			if (This.player.body.velocity.x > 0) {
				This.player.body.setVelocityX(This.player.body.velocity.x - This.playerDeceleration);
			} else {
				This.player.body.setVelocityX(This.player.body.velocity.x - This.playerAcceleration);
			}
		} else {
			This.player.body.setVelocityX(This.player.body.velocity.x - This.playerInAirAcceleration);
		}
		// If we don't press any button, we will slow down and stop.
	} else if ((This.player.body.onFloor() || This.player.fakeOnFloor) && This.player.body.velocity.x != 0) {
		// To prevent us from making an infinite loop
		if (This.player.body.velocity.x > -This.playerDeceleration && This.player.body.velocity.x < This.playerDeceleration) {
			This.player.body.setVelocityX(0);
		} else if (This.player.body.velocity.x < 0) {
			This.player.body.setVelocityX(This.player.body.velocity.x + This.playerDeceleration);
		} else {
			This.player.body.setVelocityX(This.player.body.velocity.x - This.playerDeceleration);
		}
	}
};

export default playerControls;
