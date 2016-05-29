import { Phaser } from 'phaser';

export class Ghost extends Phaser.Sprite {
    constructor(game, x, y, frames) {        
        super(game, x, y, 'ghost');
                
        this.animations.add('confused', [4, 9, 14, 19]);
        this.animations.add('float', frames);
        this.animations.play('float', 1.5, true);        
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.enableBody = true;
        this.body.collideWorldBounds = true;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.immovable = true;
        this.body.width -= 10;
        this.body.height -= 10;        
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }
    
    beginFleeing() {        
        this.animations.play('confused', 1.5, true);
    }
    
    stopFleeing() {        
        this.animations.play('float', 1.5, true);
    }
}