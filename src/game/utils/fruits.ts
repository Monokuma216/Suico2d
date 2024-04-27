import { BodyType } from 'matter';
import { Scene } from 'phaser';
import { type FruitsList } from '../interfaces';
import { Fruit } from '../models/fruit.ts';

const fruits: FruitsList = {
    apple: { size: 1, color: '#c0ff02', nextFruit: 'banana' },
    banana: { size: 2, color: '#e8e802', nextFruit: 'grapefruit' },
    grapefruit: { size: 3, color: '#ed8012', nextFruit: 'kiwi' },
    kiwi: { size: 4, color: '#ff4040', nextFruit: 'lemon' },
    lemon: { size: 5, color: '#ed1280', nextFruit: 'lychee' },
    lychee: { size: 6, color: '#bf00bf', nextFruit: 'mandarin' },
    mandarin: { size: 7, color: '#8012ed', nextFruit: 'mango' },
    mango: { size: 8, color: '#4040ff', nextFruit: 'orange' },
    orange: { size: 9, color: '#1280ed', nextFruit: 'peach' },
    peach: { size: 10, color: '#00bfbf', nextFruit: 'pear' },
    pear: { size: 11, color: '#12ed80', nextFruit: 'pineapple' },
    pineapple: { size: 12, color: '#40ff40' },
};

function getNextFruit(name: keyof FruitsList) {
    return fruits[name].nextFruit;
}

function getFruitList() {
    return Object.keys(fruits).map((key) => ({ name: key as keyof FruitsList, ...fruits[key as keyof FruitsList] }));
}

function getFruitByName(name: keyof FruitsList) {
    return fruits[name];
}

function merging(a: BodyType, b: BodyType, scene: Scene) {
    const name: keyof FruitsList | undefined = a.label.split('Fruit')[0] as keyof FruitsList;
    if (name === undefined) return;

    const nextFruit = fruitsUtility.getNextFruit(name);
    if (nextFruit === undefined) return;

    const middlePoint = scene.matter.vector.create((a.position.x + b.position.x) / 2, (a.position.y + b.position.y) / 2);
    const fruit = new Fruit(nextFruit, scene);
    fruit.createPhysics(middlePoint);
    return fruit;
}

export const fruitsUtility = {
    fruits, getNextFruit, getFruitList, getFruitByName, merging,
};