import { Vector } from 'matter';
import { Scene } from 'phaser';
import { type FruitsList } from '../interfaces';
import { convertColorToHex } from '../utils/Convertors.ts';
import { fruitsUtility } from '../utils/fruits';
import MatterPhysics = Phaser.Physics.Matter.MatterPhysics;

export class Fruit {
    name: keyof FruitsList;
    size: number;

    color: string;
    matter: MatterPhysics;
    scene: Phaser.Scene;
    ball: Phaser.Physics.Matter.Sprite;
    sprite: Phaser.GameObjects.Sprite;

    constructor(name: keyof FruitsList, scene: Scene) {
        const { color, size } = fruitsUtility.getFruitByName(name);

        this.name = name;
        this.size = size;
        this.color = color;
        this.scene = scene;
        this.matter = scene.matter;
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
            shape: { type: 'circle', radius: 136 },
            label: `${this.name}Fruit`,
            friction: 0.1,
            mass: this.size,
            restitution: 0.5,
        });

        ball.metadata = { name: this.name, size: this.size };

        ball.setTint(convertColorToHex(this.color));
        ball.setScale(this.size / 10, this.size / 10);
        this.ball = ball;
    }

    private getCirclePoints(numSegments: number = 90, radius: number = 45) {
        const vertices = [];
        const step: number = 360 / numSegments;
        for (let i = 0; i < numSegments; i++) {
            const angle = Phaser.Math.DegToRad(i * step); // Угол в радианах
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            vertices.push({ x, y });
        }
        return vertices;
    }

    destroy() {
        if (!this.ball) { return; }
        this.ball.destroy();
    }
}