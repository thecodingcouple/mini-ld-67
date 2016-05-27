import { Phaser } from 'phaser';

export class Player extends Phaser.Sprite {
    
    
    constructor(game, x, y) {
        super(game, x, y, 'player');
        
        this.footsteps = this.game.add.audio('footsteps');
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
                
        this.body.drag.set(50);
        this.body.maxVelocity.set(500);  
        this.body.collideWorldBounds = true; 
    }
    
    move(cursors) {        
        if(cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 25, this.body.acceleration);
            
            // play footsteps sound effect while walking
            if(!this.footsteps.isPlaying) {  
                this.footsteps.play();
            }
        } else if(cursors.down.isDown) {       
            this.game.physics.arcade.accelerationFromRotation(this.rotation, -25, this.body.acceleration);            
            
            // play footsteps sound effect while walking
            if(!this.footsteps.isPlaying) {  
                this.footsteps.play();
            }
        } else {
            this.body.acceleration.set(0);            
            
            // stop footsteps sound effect when movement stops
            if(this.footsteps.isPlaying) {                
                this.footsteps.stop();
            }
        }     
        
        if(cursors.left.isDown) {
            this.body.angularVelocity = -50;
        } else if(cursors.right.isDown) {
            this.body.angularVelocity = 50;
        } else {
            this.body.angularVelocity = 0;
        }
    }
}