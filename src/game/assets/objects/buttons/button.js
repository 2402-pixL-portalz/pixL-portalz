import deactivatedImage from "./../../images/buttons/deactivatedButton.png";
import activatedImage from "./../../images/buttons/activatedButton.png";

const buttonVars = (This) => {
	This.buttons = [];
};

const buttonLoad = (This) => {
	This.load.image(`deactivatedImage`, deactivatedImage);
	This.load.image(`activatedImage`, activatedImage);
};

const createButton = (This, x, y, xScale, yScale) => {
	const button = This.physics.add.sprite(x, y, `deactivatedImage`).setScale(xScale, yScale * 2);
	button.body.allowGravity = false;

	button.currentOnButtonNumber = 0;
	button.pastOnButtonNumber = 0;
	button.isPressed = false;

	This.buttons.push(button);

	return button;
};

const addButtonOverlap = (This, button, objectsAllowedToOverlap) => {
	This.physics.add.overlap(button, objectsAllowedToOverlap, () => {
		if (!button.isPressed) {
			button.isPressed = true;
			button.setTexture(`activatedImage`);
		}
		button.currentOnButtonNumber++;
	});
};

const buttonUpdate = (This) => {
	for (let button of This.buttons) {
		if (button.isPressed && button.currentOnButtonNumber !== button.pastOnButtonNumber) {
			button.pastOnButtonNumber = button.currentOnButtonNumber;
		} else if (button.isPressed) {
			button.setTexture(`deactivatedImage`);
			button.isPressed = false;
			button.currentOnButtonNumber = 0;
			button.pastOnButtonNumber = 0;
		}
	}
};

export { buttonVars, buttonLoad, createButton, addButtonOverlap, buttonUpdate };
