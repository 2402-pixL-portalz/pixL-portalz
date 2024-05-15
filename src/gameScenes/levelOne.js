import Phaser from "phaser";
import mC from "../assets/images/character/pixilart-drawing.png"
import verycool from "../assets/images/character/verycool.png"
import Platform from "../assets/objects/platforms/platform";

class Test1 extends Phaser.Scene {

	preload() {
		this.load.image("player",verycool);
		
	}

	create() {
		this.add.image(400, 300, "player");
	}
}

export default Test1;