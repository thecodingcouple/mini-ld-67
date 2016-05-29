import { Sprite } from 'phaser';

export class LargeOrb extends Phaser.Sprite {
    constructor(game, x, y) {
        
        super(game, x, y, 'orb');
        
        this.animations.add('float', [0,1,2,3]);
        this.animations.play('float', 3, true);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.immovable = true;
        this.body.moves = false;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}