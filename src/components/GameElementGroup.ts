import {Physics, Scene} from "phaser";

export type Box = Physics.Arcade.Image & {
  passed: boolean
  typeElem: 'pipe' | 'line' | 'coin'
}

type DisplayParamType = {
  w: number,
  h: number,
  hTop: number,
  hBase: number,
  hBottom: number,
}
export class GameElementGroup {
  scene: Scene;
  items: Physics.Arcade.Group;
  lines: Physics.Arcade.Group;
  coins: Physics.Arcade.Group;
  dParam: DisplayParamType;
  
  previousTopPipes: Box[][];
  previousBottomPipes: Box[][]
  constructor(scene: Scene,param:DisplayParamType) {
    this.scene = scene;
    this.items = scene.physics.add.group();
    this.lines = scene.physics.add.group();
    this.coins = scene.physics.add.group();

    this.previousTopPipes = [];
    this.previousBottomPipes = [];
    this.dParam = { ...param };
  }

  addBox(x: number, y: number): Box {
    const pipe = this.items.create(x, y, 'box');
    pipe.body.allowGravity = false;
    pipe.setDisplaySize(40,40)
    pipe.setVelocityX(-200);
    pipe.passed = false;
    pipe.typeElem = 'pipe'
    pipe.setDepth(3)


    return pipe;
  }

  addCoin(x: number, y: number): Box {
    const coin = this.coins.create(x, y, 'coin');
    coin.body.allowGravity = false;
    coin.setDisplaySize(40,40)
    coin.setVelocityX(-200);
    coin.typeElem = 'coin'
    coin.setDepth(3)

    return coin;
  }
  addLine(x1: number, y1: number, x2: number, y2: number) {
    const distance = Phaser.Math.Distance.Between(x1, y1, x2, y2);
    const angle = Phaser.Math.Angle.Between(x1, y1, x2, y2);

    // Создаем спрайт линии и устанавливаем его положение, угол и длину
    const line = this.lines.create(((x1 + x2) / 2), (y1 + y2) / 2, 'line');
    line.setDisplaySize(distance, 2);
    line.setAngle(Phaser.Math.RadToDeg(angle)); // Устанавливаем угол
    line.setVelocityX(-200);
    line.body.allowGravity = false;
    line.typeElem = 'line'
    line.setDepth(2)

    return line
  }

  stopAll() {
    this.items.setVelocityX(0);
    this.lines.setVelocityX(0);
    this.coins.setVelocityX(0);
  }

  addRowOfPipes() {
    const topPipes: Box[][] = [];
    const bottomPipes: Box[][] = [];

    const hole = 2
    const minAmount = 1
    const sizeBox = 40;
    const gapBox = 10
    const {h,hBase,hBottom,hTop}=this.dParam

    const allAmountWithHole = Math.floor((hBase-hBottom) / (sizeBox+gapBox) )

    const allAmountBox = allAmountWithHole - hole
    const topAmmount = getRandomInt(minAmount, allAmountBox - minAmount)
    const bottomAmount = allAmountBox - topAmmount


    const tempPipeTop:Box[] = []
    const tempPipeBottom:Box[] = []
    for (let i = 0; i < Math.max(topAmmount,bottomAmount); i++) {
      if(i < topAmmount){
        tempPipeTop.push(this.addBox(800, (i * (sizeBox + gapBox)) +hTop+gapBox));
      }
      if(i < bottomAmount){
        tempPipeBottom.push(this.addBox(800, (h - hBottom) - sizeBox/2 - (i * (sizeBox+gapBox))));
      }
    }

    topPipes.push(tempPipeTop)
    bottomPipes.push(tempPipeBottom)

    if (Math.random() > 0.5) {
     this.addCoin(800,getRandomInt(topAmmount*(sizeBox+gapBox)+hTop,(topAmmount+hole)*(sizeBox+gapBox)))
    }

    if(this.previousBottomPipes.length > 0 && this.previousTopPipes.length >0){
      this.addLines(this.previousTopPipes, topPipes);
      this.addLines(this.previousBottomPipes, bottomPipes);
    }

    this.previousTopPipes = topPipes;
    this.previousBottomPipes = bottomPipes;
  }

  addLines(prevPipes: Box[][], newPipes: Box[][]) {
    prevPipes[prevPipes.length-1].forEach((el)=>{
      const prevCenter = el.getCenter()
      const newCenter = newPipes[0][getRandomInt(0,newPipes[0].length)].getCenter()

      this.addLine(prevCenter.x, prevCenter.y, newCenter.x, newCenter.y);
    })

  }

  getItems() {
    return this.items;
  }

  getLines() {
    return this.lines;
  }
  getCoins() {
    return this.coins;
  }
}

/*** Максимум не включается, минимум включается ***/
export const getRandomInt=(min:number, max:number):number=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}