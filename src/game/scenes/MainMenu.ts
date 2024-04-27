import { BodyType } from 'matter';
import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';
import { Spawner } from '../managers/spawner.ts';
import { Fruit } from '../models/fruit.ts';
import { fruitsUtility } from '../utils/fruits.ts';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    private text: Phaser.GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.text = this.add.text(10, 10, '', { color: '#00ff00' }).setDepth(1);

        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        console.log({ width, height });
        this.matter.world.setBounds(0, 0, width, height);

        const spawner = new Spawner(this);

        // const apple = new Fruit('apple', this);
        // apple.createPhysics({ x: 110, y: 700 });
        //
        // const apple2 = new Fruit('apple', this);
        // apple2.createPhysics({ x: 100, y: 800 });

        const banana = new Fruit('banana', this);
        banana.createPhysics({ x: 90, y: 700 });
        banana.ball.setStatic(true);

        const banana2 = new Fruit('banana', this);
        banana2.createPhysics({ x: 95, y: 700 });
        banana2.ball.setStatic(true);

        const merger = (event: Phaser.Physics.Matter.Events.CollisionActiveEvent, bodyA: BodyType, bodyB: BodyType) => {
            if (!bodyA.label.includes('Fruit')) return;
            if (!bodyB.label.includes('Fruit')) return;
            if (!bodyA.gameObject || !bodyB.gameObject) {
                console.log({ event: 'У bodyA или bodyB нет gameObject', bodyA, bodyB });
                return;
            }
            if (bodyA.gameObject.metadata.size !== bodyB.gameObject.metadata.size) return;
            console.log({ event, bodyA, bodyB });
            fruitsUtility.merging(bodyA, bodyB, this);
            bodyA.gameObject.destroy();
            bodyB.gameObject.destroy();
        };

        this.matter.world.on('collisionstart', merger);
        this.matter.world.on('collisionactive', merger);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        const pointer = this.input.activePointer;

        this.text.setText([`x: ${pointer.worldX}`,
                           `y: ${pointer.worldY}`,
                           `isDown: ${pointer.isDown}`,
                           `rightButtonDown: ${pointer.rightButtonDown()}`]);
    }
}