const playerVars = (This) => {
	This.player;
	This.controls;
	This.playerAcceleration = 15;
	This.playerInAirAcceleration = 8;
	This.playerDeceleration = 20;
	This.playerJumpHeight = 450;
	This.playerMaxRunSpeed = 220;
};

export default playerVars;
