import { Phaser } from 'phaser';

export class Player extends Phaser.Sprite {
    
    
    constructor(game, x, y) {
        super(game, x, y, 'player');
        
        // this.game.physics.box2d.enable(this);
    }
}