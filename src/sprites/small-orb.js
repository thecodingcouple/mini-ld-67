import { Sprite } from 'phaser';

export class SmallOrb extends Phaser.Sprite {
    constructor(game, x, y) {
        // let square = game.add.bitmapData(32, 32);
        // square.ctx.beginPath();
        // square.ctx.rect(0, 0, 32, 32);
        // square.ctx.fillStyle = '#ff00ff';
        // square.ctx.fill();
        
        // super(game, x, y, square);
        
        super(game, x, y, 'orb');
        
        this.animations.add('float', [0,1,2,3]);
        this.animations.play('float', 3, true);
        
        this.scale.setTo(0.5, 0.5); 
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.immovable = true;
        this.body.moves = false;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}