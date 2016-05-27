import { Phaser } from 'phaser';

export class Ghost extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'ghost');
    }
}