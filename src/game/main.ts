import { AUTO, Game } from 'phaser';
import { Boot } from './scenes/Boot';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: '100%',
    height: '100%',
    parent: 'game-container',
    input: true,
    backgroundColor: '#028af8',
    physics: {
        default: 'matter', matter: {
            debug: {
                showAxes: false, showAngleIndicator: true, angleColor: 0xe81153,

                showBounds: false, boundsColor: 0xffffff,

                showVelocity: true, velocityColor: 0x00aeef,

                showCollisions: true, collisionColor: 0xf5950c,
                
                showBody: true, showStaticBody: true, showInternalEdges: true,

                renderFill: false, renderLine: true,

                fillColor: 0x106909, fillOpacity: 1, lineColor: 0x28de19, lineOpacity: 1, lineThickness: 1,

                staticFillColor: 0x0d177b, staticLineColor: 0x1327e4,

                showSleeping: true, staticBodySleepOpacity: 1, sleepFillColor: 0x464646, sleepLineColor: 0x999a99,

                showSensors: true, sensorFillColor: 0x0d177b, sensorLineColor: 0x1327e4,

                showPositions: true, positionSize: 4, positionColor: 0xe042da,

                showJoint: true, jointColor: 0xe0e042, jointLineOpacity: 1, jointLineThickness: 2,

                pinSize: 4, pinColor: 0x42e0e0,

                springColor: 0xe042e0,

                anchorColor: 0xefefef, anchorSize: 4,

                showConvexHulls: true, hullColor: 0xd703d0,

            }, gravity: { x: 0, y: 1 },
        },
    },
    scene: [Boot, Preloader, MainMenu],
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

};

export default StartGame;