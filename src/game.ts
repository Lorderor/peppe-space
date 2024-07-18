import 'phaser';
import { GameConfig } from './config';
import './reset.css'
import './style.css'
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});
