import { Scene } from 'phaser';
import { type FruitsList } from '../interfaces';
import { Fruit } from '../models/fruit.ts';
import { mainSettings } from '../settings/main';
import { fruitsUtility } from '../utils/fruits';
import MatterPhysics = Phaser.Physics.Matter.MatterPhysics;

const { TOP_MARGIN: topMargin, HEIGHT: height } = mainSettings.environment.arena;
const spawnHeight = height + topMargin;

export class Spawner {
    scene: Phaser.Scene;
    matter: MatterPhysics;
    isReadySpawn: boolean = true;
    isMouseMove: boolean = false;

    curFruit!: Fruit;
    spawnedFruits: Fruit[] = [];
    nextFruitName!: keyof FruitsList;

    constructor(scene: Scene) {
        this.scene = scene;
        this.matter = scene.matter;

        const startPos = { x: scene.game.canvas.width / 2, y: spawnHeight };

        const fruit = this.getNextFruit();
        this.curFruit = new Fruit(fruit.name, this.scene);
        this.curFruit.createSprite(startPos);

        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.input.on('pointerup', this.onPointerUp, this);
    }

    getNextFruit() {
        const availableCountFruits = 3;
        const allFruit = fruitsUtility.getFruitList();
        allFruit.length = availableCountFruits;
        return allFruit[Math.floor(Math.random() * allFruit.length)];
    }

    onPointerUp() {
        if (!this.isReadySpawn) return;
        if (this.isMouseMove) {
            this.isMouseMove = false;
            return;
        }

        const x = this.curFruit.sprite.getCenter().x;
        this.curFruit.createPhysics({ x, y: spawnHeight });
        this.addFruit(this.curFruit);
        this.isReadySpawn = false;

        this.scene.time.addEvent({
            delay: 1000, // Задержка в миллисекундах
            callback: () => {
                const fruit = this.getNextFruit();
                this.curFruit = new Fruit(fruit.name, this.scene);
                this.curFruit.createSprite({ x, y: spawnHeight });
                this.isReadySpawn = true;
            }, // Функция, которая будет вызываться
            callbackScope: this, // Контекст, в котором будет вызываться функция
            loop: false, // Функция будет вызываться повторно
        });
    }

    private onPointerMove(pointer: Phaser.Input.Pointer) {
        if (!pointer.isDown) return;
        if (!this.curFruit) return;
        if (!this.curFruit.sprite) return;
        this.isMouseMove = true;

        const x = pointer.worldX;
        this.curFruit.sprite.setPosition(x, spawnHeight);
    }

    addFruit(fruit: Fruit) {
        this.spawnedFruits.push(fruit);
    }
}