import { Phaser } from 'phaser';

export class Ghost extends Phaser.Sprite {
    constructor(game, x, y) {
        let square = game.add.bitmapData(32, 32);
        square.ctx.beginPath();
        square.ctx.rect(0, 0, 32, 32);
        square.ctx.fillStyle = '#fa4400ff';
        square.ctx.fill();
        
        super(game, x, y, square);
        
        // super(game, x, y, 'ghost');
    }
}