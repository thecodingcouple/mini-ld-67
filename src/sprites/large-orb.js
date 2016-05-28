import { Sprite } from 'phaser';

export class LargeOrb extends Phaser.Sprite {
    constructor(game, x, y) {
        let square = game.add.bitmapData(32, 32);
        square.ctx.beginPath();
        square.ctx.rect(0, 0, 32, 32);
        square.ctx.fillStyle = '#ff0000';
        square.ctx.fill();
        
        super(game, x, y, square);
        
        //super(game, x, y, 'large-orb');
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.immovable = true;
        this.body.moves = false;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}