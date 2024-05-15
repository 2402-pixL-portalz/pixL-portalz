const playerControls = (This) => {
	// If we press one of the jump buttons, we jump!
	if ((This.controls.W.isDown || This.controls.SPACE.isDown || This.controls.UP.isDown) && This.player.body.onFloor()) {
		This.player.body.setVelocityY(-This.playerJumpHeight);

		// If we press the button to move right, we move right.
	} else if (This.controls.D.isDown || This.controls.RIGHT.isDown) {
		if (This.player.body.onFloor()) {
			// If we're moving in one direction, and then we decide to move in the other direction, the player will decelerate at This.playerDeceleration. And then afterwords, accelerate at This.playerAcceleration.
			if (This.player.body.velocity.x < 0) {
				This.player.body.setVelocityX(This.player.body.velocity.x + This.playerDeceleration);
			} else {
				This.player.body.setVelocityX(This.player.body.velocity.x + This.playerAcceleration);
			}
		} else {
			This.player.body.setVelocityX(This.player.body.velocity.x + This.playerInAirAcceleration);
		}
		// If we press the button to move left, we move left.
	} else if (This.controls.A.isDown || This.controls.LEFT.isDown) {
		if (This.player.body.onFloor()) {
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
	} else if (This.player.body.onFloor() && This.player.body.velocity.x != 0) {
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
