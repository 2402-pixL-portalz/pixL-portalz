import exitImg from "../../images/exit/exit.png";
import exitClosedImg from "../../images/exit/exitClosed.png";

//preloads exit images
const exitLoad = (level) => {
	level.load.image(`exit`, exitImg);
	level.load.image(`exitClosed`, exitClosedImg);
};

//creates an exit which takes in the scene an array with the x/y positions, and an array with the length/height of the exit
const createExit = (level, scene, isUnlocked, [xPosition, yPosition], [lengthScale, heightScale]) => {
	const exit = level.physics.add.sprite(xPosition, yPosition, `exit`).setScale(lengthScale, heightScale);
	exit.body.allowGravity = false;
	setIsUnlocked(exit, isUnlocked);

	exit.pastIsUnlocked = exit.isUnlocked;
	level.physics.add.overlap(exit, level.player, () => {
		if ((level.controls.S.isDown || level.controls.DOWN.isDown) && exit.isUnlocked && level.player.body.onFloor()) {
			level.scene.start(scene);
		}
	});

	return exit;
};

const exitUpdate = (exit, switchValue) => {
	if (exit.isUnlocked !== switchValue) {
		setIsUnlocked(exit, switchValue);
	}
};

const setIsUnlocked = (exit, status) => {
	if (status) {
		exit.isUnlocked = true;
		exit.setTexture(`exit`);
	} else {
		exit.isUnlocked = false;
		exit.setTexture(`exitClosed`);
	}
};

export { exitLoad, createExit, exitUpdate, setIsUnlocked };
