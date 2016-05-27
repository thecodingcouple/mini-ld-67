import { Phaser } from 'phaser';

export class Player extends Phaser.Sprite {
    
    
    constructor(game, x, y) {
        super(game, x, y, 'player');
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
                
        this.body.drag.set(50);
        this.body.maxVelocity.set(500);  
        this.body.collideWorldBounds = true; 
    }
    
    move(cursors) {        
        if(cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 150, this.body.acceleration);
        } else if(cursors.down.isDown) {       
            this.game.physics.arcade.accelerationFromRotation(this.rotation, -150, this.body.acceleration);
        } else {
            this.body.acceleration.set(0);
        }     
        
        if(cursors.left.isDown) {
            this.body.angularVelocity = -150;
        } else if(cursors.right.isDown) {
            this.body.angularVelocity = 150;
        } else {
            this.body.angularVelocity = 0;
        }
    }
}