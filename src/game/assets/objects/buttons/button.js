import deactivatedImage from "./../../images/buttons/deactivatedButton.png";
import activatedImage from "./../../images/buttons/activatedButton.png";

const buttonLoad = (This) => {
	This.load.image(`deactivatedImage`, deactivatedImage);
	This.load.image(`activatedImage`, activatedImage);
};

const createButton = (This, x, y, xScale, yScale) => {
	const button = This.physics.add.sprite(x, y, `deactivatedImage`).setScale(xScale, yScale * 2);
	button.body.allowGravity = false;

	button.isPressed = false;

	return button;
};

const addButtonOverlap = (This, button, objectsAllowedToOverlap) => {
	This.physics.add.overlap(button, objectsAllowedToOverlap, () => {
		if (!button.isPressed) {
			button.isPressed = true;
			button.setTexture(`activatedImage`);
		}
		button.textureSet = false;
		button.overlapping = true;
	});
};

const buttonUpdate = (button) => {
	if (!button.overlapping && !button.textureSet) {
		button.setTexture(`deactivatedImage`);

		button.isPressed = false;
		button.textureSet = true;
	}
	button.overlapping = false;
};

export { buttonLoad, createButton, addButtonOverlap, buttonUpdate };
