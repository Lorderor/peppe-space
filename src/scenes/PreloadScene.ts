import {Scene} from "phaser";

export class PreloadScene extends Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.image('sky', 'assets/sky-new.png');
        this.load.image('line', 'assets/line.png');
        // this.load.spritesheet('pepeAnim', 'assets/pepeAnim.png',{frameWidth: 438, frameHeight: 293});
        this.load.spritesheet('pepeAnim', 'assets/pepe8.png',{frameWidth: 438, frameHeight: 293});
        this.load.image('box', 'assets/square.png');
        this.load.image('coin', 'assets/energyIcon.png');
        this.load.image('moon', 'assets/moon.png');
        this.load.image('moonMountain', 'assets/moonMountain.png');
        this.load.image('ceiling', 'assets/topLine.png');
        this.load.image('rectGreen', 'assets/rectGreen.png');
        this.load.image('rectRed', 'assets/rectRed.png');
        this.load.image('getReady', 'assets/getReady.png');
        this.load.image('restartBtn', 'assets/RestartBtn.png');
        this.load.image('menuBtn', 'assets/MenuBtn.png');
        this.load.image('rectMenu', 'assets/Rectangle.png');


        this.loadCSS()


    }

    create() {
        this.scene.start('MainMenuScene');
    }

   loadCSS() {
        const style = document.createElement("style");
        style.innerHTML = `
      .btn {
        background-color: crimson;
        border-radius: 6px;
        border: 2px solid white;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        z-index: 100;
        position: absolute;
        top: ${window.innerHeight / 2 + 50}px;
        left: ${window.innerWidth / 2 - 50}px;
      }
    `;
        document.head.appendChild(style);
    }
}