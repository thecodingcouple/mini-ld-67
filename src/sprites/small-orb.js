import { Sprite } from 'phaser';

export class SmallOrb extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'small-orb');
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.immovable = true;
        this.body.moves = false;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
}