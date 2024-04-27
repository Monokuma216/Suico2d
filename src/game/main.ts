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
        default: 'matter', matter: { debug: false, gravity: { x: 0, y: 1 } },
    },
    scene: [Boot, Preloader, MainMenu],
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

};

export default StartGame;