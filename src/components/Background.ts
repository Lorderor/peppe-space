import { IMAGE_SIZE } from "../constants";

export class Background {
  public moonBg!: Phaser.GameObjects.TileSprite;
  private spaceBg!: Phaser.GameObjects.TileSprite;
  private mountainBg!: Phaser.GameObjects.TileSprite;
  private getReadyImage!: Phaser.GameObjects.Image;
  private headerImage!: Phaser.GameObjects.Image;
  private readonly innerHeight: number;
  private readonly innerWidth: number;
  private readonly heightTopZone: number;
  private readonly heightBaseZone: number;
  private readonly heightBottomZone: number;
  private readonly mountainsDisplayH: number;
  private readonly headerImageDisplayH: number;

  constructor(public scene: Phaser.Scene) {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    this.heightTopZone = Math.ceil(this.innerHeight * 0.1);
    this.heightBaseZone = Math.ceil(this.innerHeight * 0.9);
    this.heightBottomZone = innerHeight - this.heightBaseZone;
    this.mountainsDisplayH = 35;
    this.headerImageDisplayH = 16;
  }

  render() {
    const { space, moon, mountains, getReady, topLine } = IMAGE_SIZE;
    const spaceSprite = this.scene.add
      .tileSprite(0, 0, space.w, space.h, "sky")
      .setOrigin(0, 0);
    const scaleBg = this.heightBaseZone / space.h;
    spaceSprite.setScale(scaleBg);
    this.spaceBg = spaceSprite;

    const moonSprite = this.scene.add
      .tileSprite(0, this.heightBaseZone, moon.w, moon.h, "moon")
      .setOrigin(0, 0);
    const scaleMoon = this.heightBottomZone / moon.h;
    moonSprite.setScale(scaleMoon);
    this.moonBg = moonSprite;

    const mountainSprite = this.scene.add
      .tileSprite(
        0,
        this.heightBaseZone - this.mountainsDisplayH,
        mountains.w,
        mountains.h,
        "moonMountain",
      )
      .setOrigin(0, 0);
    const scaleMountain = this.mountainsDisplayH / mountains.h;
    mountainSprite.setScale(scaleMountain);
    this.mountainBg = mountainSprite;

    const headerImageSprite = this.scene.add
      .image(0, this.heightTopZone - this.headerImageDisplayH, "ceiling")
      .setOrigin(0, 0);
    const headerImageScale = this.headerImageDisplayH / topLine.h;
    headerImageSprite.setScale(headerImageScale);
    this.headerImage = headerImageSprite;
  }

  renderGetReadyImage() {
    const { getReady } = IMAGE_SIZE;

    const getReadySprite = this.scene.add.image(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY,
      "getReady",
    );
    const getReadyScale = (this.innerWidth * 0.85) / getReady.w;
    getReadySprite.setScale(getReadyScale);
    this.getReadyImage = getReadySprite;
  }

  getMoon() {
    return this.moonBg;
  }

  getBackground() {
    return this.spaceBg;
  }

  getMountain() {
    return this.mountainBg;
  }

  getImageGetReady() {
    return this.getReadyImage;
  }

  getParam() {
    return {
      w: this.innerWidth,
      h: this.innerHeight,
      hTop: this.heightTopZone,
      hBase: this.heightBaseZone,
      hBottom: this.heightBottomZone,
    };
  }
  getImageHeader() {
    return this.headerImage;
  }
}
