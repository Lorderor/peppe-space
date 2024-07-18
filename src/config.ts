import {MainMenuScene} from "./scenes/MenuScene";
import {PreloadScene} from "./scenes/PreloadScene";
import {GameScene} from "./scenes/GameScene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {x: 0, y: 800 },
      debug: false,
    },
  },
  scene: [PreloadScene,MainMenuScene,GameScene],
};
