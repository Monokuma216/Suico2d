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

        this.matter.world.setBounds(0, 0, width / 4, height);

        // Нажатие на I включает дебаг у matter
        if (!this.input.keyboard) return;
        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key.toLowerCase() !== 'i') return;
        });

        const spawner = new Spawner(this);

        const merger = (event: Phaser.Physics.Matter.Events.CollisionStartEvent, bodyA: BodyType, bodyB: BodyType) => {
            if (bodyA.label.concat(bodyB.label).includes('Rectangle')) return;

            console.log({ paris: [...event.pairs] });

            for (const pair of event.pairs) {
                const { bodyA, bodyB } = pair;
                if (!bodyA.label.includes('Fruit')) return;
                if (!bodyB.label.includes('Fruit')) return;
                if (!bodyA.gameObject || !bodyB.gameObject) {
                    console.log({ event: 'У bodyA или bodyB нет gameObject', bodyA, bodyB });
                    return;
                }
                if (bodyA.gameObject.metadata.size !== bodyB.gameObject.metadata.size) return;
                console.log({ event, bodyA, bodyB });
                const mergingFruit = fruitsUtility.merging(bodyA, bodyB, this);
                if (!mergingFruit) return;
                const newFruit = fruitsUtility.getCheckNearCollision(mergingFruit, spawner.spawnedFruits);
                bodyA.gameObject.destroy();
                bodyB.gameObject.destroy();
                spawner.addFruit(newFruit);
                spawner.deleteFruit(bodyA.id);
                spawner.deleteFruit(bodyB.id);
            }
        };

        this.matter.world.on('collisionstart', merger);

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