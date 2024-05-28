const resettingFunctionality = (This) => {
	if (This.controls.R.isDown) {
		This.scene.restart();
	}
};

export default resettingFunctionality;
