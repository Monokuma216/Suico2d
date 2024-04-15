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

        const x = Phaser.Math.Between(0, width);
        const y = Phaser.Math.Between(0, height);

        if (Math.random() < 0.7) {
            const sides = Phaser.Math.Between(3, 14);
            const radius = Phaser.Math.Between(8, 50);

            this.matter.add.polygon(x, y, sides, radius, { restitution: 0.9 });
        } else {
            const width = Phaser.Math.Between(16, 128);
            const height = Phaser.Math.Between(8, 64);

            this.matter.add.rectangle(x, y, width, height, { restitution: 0.9 });
        }

        EventBus.emit('current-scene-ready', this);
    }
}