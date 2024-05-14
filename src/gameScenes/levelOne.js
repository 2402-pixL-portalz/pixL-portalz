import Phaser from "phaser";
import mC from "../assets/character/pixilart-drawing.png"
import verycool from "../assets/character/verycool.png"

class Test1 extends Phaser.Scene {

	preload() {
		this.load.image("player",verycool);
		
	}

	create() {
		this.add.image(400, 300, "player");
	}
}

export default Test1;