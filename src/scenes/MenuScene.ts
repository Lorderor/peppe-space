import { Background } from "../components/Background";
import { Scene } from "phaser";

export class MainMenuScene extends Scene {
  private background: Background;

  constructor() {
    super({
      key: "MainMenuScene",
    });
    this.background = new Background(this);
  }

  create(): void {
    this.background.render();
    this.background.renderGetReadyImage();

    this.input.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }

  update(): void {}
}
