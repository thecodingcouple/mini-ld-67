import { Phaser } from 'phaser';

export class Ghost extends Phaser.Sprite {
    constructor(game, x, y) {
        let square = game.add.bitmapData(32, 32);
        square.ctx.beginPath();
        square.ctx.rect(0, 0, 32, 32);
        square.ctx.fillStyle = '#ffbcb1';
        square.ctx.fill();
        
        super(game, x, y, square);
        
        // super(game, x, y, 'ghost');
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.body.collideWorldBounds = true;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.immovable = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}