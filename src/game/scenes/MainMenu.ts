import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image;

    constructor() {
        super('MainMenu');
    }

    create() {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        console.log({ width, height });
        this.matter.world.setBounds(0, 0, width, height);

        this.matter.add.circle(250, height - 100, 50);
        this.matter.add.circle(200, height - 500, 50);

        EventBus.emit('current-scene-ready', this);
    }
}