import {GameObjects, Physics, Scene, Types} from 'phaser'



export class Bird extends Physics.Arcade.Sprite {
  scene: Scene
  constructor(scene:Scene, x:number, y:number) {
    super(scene, x, y, 'pepeAnim');
    this.scene = scene
    this.setDisplaySize(70,50)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(4)
    this.setCollideWorldBounds(true);

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('pepeAnim', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });


  }

  update(isDown?: boolean) {
    if (isDown) {
      this.setVelocityY(-350);
    }

  }

  playAnim(){
    this.anims.play('fly')
  }

  stopAnim(){
    this.anims.stop()
  }
}