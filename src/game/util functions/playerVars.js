const playerVars = (This) => {
	This.player;
	This.controls;
	This.playerSpeed = 100;
	This.playerAcceleration = 15;
	This.playerInAirAcceleration = 3;
	This.playerDeceleration = 20;
	This.playerJumpHeight = 150;
	This.playerMaxRunSpeed = 150;
};

export default playerVars;
