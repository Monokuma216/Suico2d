import { BodyType, Vector } from 'matter';
import { Scene } from 'phaser';
import { type FruitsList } from '../interfaces';
import { convertColorToHex } from '../utils/Convertors.ts';
import { fruitsUtility } from '../utils/fruits';
import MatterPhysics = Phaser.Physics.Matter.MatterPhysics;

const RADIUS: number = 136;

export class Fruit {
    name: keyof FruitsList;
    size: number;
    radius: number;
    color: string;

    scene: Phaser.Scene;
    matter: MatterPhysics;

    ball?: Phaser.Physics.Matter.Sprite;
    body?: BodyType;
    sprite?: Phaser.GameObjects.Sprite;

    constructor(name: keyof FruitsList, scene: Scene) {
        const { color, size } = fruitsUtility.getFruitByName(name);

        this.name = name;
        this.size = size;
        this.color = color;

        this.scene = scene;
        this.matter = scene.matter;

        this.radius = RADIUS * (this.size / 10);
    }

    createSprite(position: Vector) {
        this.sprite = this.scene.add.sprite(position.x, position.y, 'ball');
        this.sprite.setTint(convertColorToHex(this.color));
        this.sprite.setScale(this.size / 10, this.size / 10);
    }

    createPhysics(position: Vector) {
        if (this.sprite) {
            position = this.sprite.getCenter();
            this.sprite.destroy();
        }

        const ball = this.matter.add.sprite(position.x, position.y, 'ball', undefined, {
            shape: { type: 'circle', radius: RADIUS },
            label: `${this.name}Fruit`,
            friction: 0.1,
            mass: this.size,
            restitution: 0.5,
        });

        ball.metadata = { name: this.name, size: this.size };

        ball.setTint(convertColorToHex(this.color));
        ball.setScale(this.size / 10);
        this.ball = ball;
        this.body = ball.body as BodyType;
    }

    checkNearBody(bodys: BodyType[]) {
        if (!this.body) return;
        return this.matter.query.region(bodys, this.body.bounds);
    }

    destroy() {
        if (!this.ball) { return; }
        this.ball.destroy();
    }
}