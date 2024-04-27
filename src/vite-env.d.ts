/// <reference types="vite/client" />

declare namespace Phaser.GameObjects {
    interface Sprite {
        metadata?: any; // You can specify a more specific type if you know what it will be
    }
}