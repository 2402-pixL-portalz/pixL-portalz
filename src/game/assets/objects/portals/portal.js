import applyPortalTrajectory from "../../../util functions/applyPortalTrajectory";
import bluePortalImage from "./../../images/portals/bluePortalSheet.png";
import grayPortalImage from "./../../images/portals/grayPortalSheet.png";
import greenPortalImage from "./../../images/portals/greenPortalSheet.png";
import orangePortalImage from "./../../images/portals/orangePortalSheet.png";
import pinkPortalImage from "./../../images/portals/pinkPortalSheet.png";
import redPortalImage from "./../../images/portals/redPortalSheet.png";

const portalVars = (This) => {
	This.inPortal = false;
	This.currentInPortalNumber = 0;
	This.pastInPortalNumber = 0;
};

const portalLoad = (This, color) => {
	if (color === `blue`) {
		This.load.spritesheet(`bluePortalSheet`, bluePortalImage, { frameWidth: 498, frameHeight: 498 });
	} else if (color === `gray`) {
		This.load.spritesheet(`grayPortalSheet`, grayPortalImage, { frameWidth: 498, frameHeight: 498 });
	} else if (color === `green`) {
		This.load.spritesheet(`greenPortalSheet`, greenPortalImage, { frameWidth: 498, frameHeight: 498 });
	} else if (color === `orange`) {
		This.load.spritesheet(`orangePortalSheet`, orangePortalImage, { frameWidth: 498, frameHeight: 498 });
	} else if (color === `pink`) {
		This.load.spritesheet(`pinkPortalSheet`, pinkPortalImage, { frameWidth: 498, frameHeight: 498 });
	} else if (color === `red`) {
		This.load.spritesheet(`redPortalSheet`, redPortalImage, { frameWidth: 498, frameHeight: 498 });
	} else {
		throw `We do not support this portal color!`;
	}
};

//create platforms function takes in the platform object, an array with both the x position and the y position, and an array with the length/height scaling
const createPortal = (This, color, x, y, rotation) => {
	let sheet;
	if (color === `blue`) {
		sheet = `bluePortalSheet`;
	} else if (color === `gray`) {
		sheet = `grayPortalSheet`;
	} else if (color === `green`) {
		sheet = `greenPortalSheet`;
	} else if (color === `orange`) {
		sheet = `orangePortalSheet`;
	} else if (color === `pink`) {
		sheet = `pinkPortalSheet`;
	} else if (color === `red`) {
		sheet = `redPortalSheet`;
	}

	const portal = This.physics.add.sprite(x, y, sheet).setScale(0.2, 0.2);

	portal.body.allowGravity = false;

	if (!Object.hasOwn(This.anims.anims.entries, color)) {
		This.anims.create({
			key: color,
			frames: This.anims.generateFrameNumbers(sheet),
			frameRate: 20,
			repeat: -1
		});
	}

	portal.play(color);

	if (rotation === `left`) {
		portal.angle = 0;
		portal.setSize(275, 475);
	} else if (rotation === `right`) {
		portal.angle = 180;
		portal.setSize(275, 475);
	} else if (rotation === `down`) {
		portal.angle = 270;
		portal.setSize(475, 275);
	} else if (rotation === `up`) {
		portal.angle = 90;
		portal.setSize(475, 275);
	}

	return portal;
};


const joinPortals = (This, enteringPortal, exitingPortal, objectsAllowedToOverlap) => {
	addTeleportingOverlap(This, enteringPortal, exitingPortal, objectsAllowedToOverlap);
	addTeleportingOverlap(This, exitingPortal, enteringPortal, objectsAllowedToOverlap);
};

const addTeleportingOverlap = (This, portal1, portal2, objectsAllowedToOverlap) => {
	This.physics.add.overlap(portal1, objectsAllowedToOverlap, (obj1, item) => {
		if (!This.inPortal) {
			This.inPortal = true;
			item.setPosition(portal2.x, portal2.y);

			applyPortalTrajectory(portal1, portal2, item);
		}
		This.currentInPortalNumber++;
	});
};

const portalUpdate = (This) => {
	if (This.inPortal && This.currentInPortalNumber !== This.pastInPortalNumber) {
		This.pastInPortalNumber = This.currentInPortalNumber;
	} else {
		This.inPortal = false;
		This.currentInPortalNumber = 0;
		This.pastInPortalNumber = 0;
	}
};

export { portalLoad, createPortal, joinPortals, portalVars, portalUpdate };
