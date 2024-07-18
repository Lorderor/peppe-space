import { Bird } from "../components/Bird";
import { Physics, Scene, Types } from "phaser";
import { GameElementGroup } from "../components/GameElementGroup";
import { GameOverMenu } from "../components/GameOverMenu";
import { Background } from "../components/Background";

export class GameScene extends Scene {
  private background: Background;
  private bird: Bird;
  private gameElementGroup: GameElementGroup;
  private rectangleGroup: Physics.Arcade.Group;
  private gameOverMenu: GameOverMenu;

  cursors: Types.Input.Keyboard.CursorKeys;
  score: number;
  isGameOver: boolean;

  constructor() {
    super({ key: "GameScene" });
    this.background = new Background(this);
    this.isGameOver = false;
  }

  create() {
    this.background.render();
    this.rectangleGroup = this.physics.add.group();
    this.isGameOver = false;

    this.bird = new Bird(this, 100, 245);
    this.bird.setSize(200, 200);

    this.gameElementGroup = new GameElementGroup(this,this.background.getParam());
    this.bird.playAnim();

    this.time.addEvent({
      delay: 1500,
      callback: this.gameElementGroup.addRowOfPipes,
      callbackScope: this.gameElementGroup,
      loop: true,
    });

    this.time.addEvent({
      delay: 50,
      callback: this.addRect,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
        this.bird,
        this.gameElementGroup.getItems(),
        this.endGame,
        undefined,
        this,
    );

    this.physics.add.existing(this.background.getMoon(), true);
    this.physics.add.collider(
      this.bird,
      this.background.getMoon(),
      this.endGame,
      undefined,
      this,
    );

    this.physics.add.existing(this.background.getImageHeader(), true);
    this.physics.add.collider(
      this.bird,
      this.background.getImageHeader(),
      this.endGame,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.bird,
      this.gameElementGroup.getCoins(),
      this.collectCoin,
      undefined,
      this,
    );

    this.input.on("pointerdown", () => {
      this.bird.update(!this.isGameOver);
    });

  }

  update() {
    if(!this.isGameOver){
      this.background.getBackground().tilePositionX += 4;
      this.background.getMoon().tilePositionX += 10;
      this.background.getMountain().tilePositionX += 8;
    }

  }

  addRect() {
    // Создаем индикатор направления
    if (this.bird.body?.velocity && this.bird.body?.velocity.y > 0) {
      const rectangle = this.rectangleGroup.create(
        this.bird.x,
        this.bird.y,
        "rectRed",
      );
      rectangle.body.allowGravity = false;
      rectangle.setVelocityX(-200);
    } else if (this.bird.body?.velocity && this.bird.body?.velocity.y < 0) {
      const rectangle = this.rectangleGroup.create(
        this.bird.x - 10,
        this.bird.y - 10,
        "rectGreen",
      );
      rectangle.body.allowGravity = false;
      rectangle.setVelocityX(-200);
    }
  }
  collectCoin(_: any, object2: any) {
    object2.destroy();
  }

  restartGame() {
    this.scene.restart();
    this.score = 0;
  }

  toMenu() {
    this.scene.start("MainMenuScene");
  }

  endGame() {
    this.isGameOver = true
    this.gameOverMenu = new GameOverMenu(
      this,
      () => this.restartGame(),
      () => this.toMenu(),
    );
    this.gameElementGroup.stopAll()
    this.rectangleGroup.setVelocityX(0)
    this.gameOverMenu.create();
    this.bird.stopAnim();
    this.time.removeAllEvents();
  }
}
