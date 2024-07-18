import {GameObjects, Scene} from "phaser";

export class GameOverMenu {
    private scene: Scene;
    private menuContainer: GameObjects.Container;
    onRetry: ()=>void;
    onExit: ()=>void;

    constructor(scene: Scene,retryFn:()=>void,exitFn:()=>void ) {
        this.scene = scene;
        this.menuContainer = this.scene.add.container(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY);
        this.menuContainer.setDepth(6)
        this.onRetry = retryFn
        this.onExit = exitFn
    }

    create() {
        // Создаем фон
        const background = this.scene.add.rectangle(0, 0, 320, 300, 0x000000, 0.3);
        background.setOrigin(0.5, 0.5);
        this.menuContainer.add(background);

        // Добавляем текст
        const gameOverText = this.scene.add.text(0, -50, 'Game Over', { fontSize: '32px', color: '#fff' });
        gameOverText.setOrigin(0.5, 0.5);
        this.menuContainer.add(gameOverText);

        // Добавляем кнопку "Retry"
        const retryButton = this.createButton(0, 30, 'restartBtn', () => this.onRetry());
        this.menuContainer.add(retryButton);

        // Добавляем кнопку "Exit"
        const exitButton = this.createButton(150, 30, 'menuBtn', () => this.onExit());
        this.menuContainer.add(exitButton);

    }

    private createButton(x: number, y: number, texture: string, callback: () => void) {
        const button = this.scene.add.image(x, y, texture)
            .setInteractive()
            .on('pointerdown', callback)

        button.setOrigin(1, 1);
        return button;
    }

    public destroy() {
        this.menuContainer.destroy(); // Удаляем меню
    }
}