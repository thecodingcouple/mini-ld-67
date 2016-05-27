import { Phaser } from 'phaser';
import { Player } from '../sprites/player';

export class Play extends Phaser.State {
    preload() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: 'blue', 
            fill: 'blue' 
        };
        
        this.game.add.text(80, 150, 'playing...', textStyle);
        
        // enabling BOX2D physics
        // this.game.physics.startSystem(Phaser.Physics.BOX2D);
        
        this.player = new Player(this.game, 40, 40);
        this.game.add.existing(this.player);
    }
    
    create() {
        this.backgroundAudio = this.game.add.audio('backgroundAudio');
        this.game.sound.setDecodedCallback(this.backgroundAudio, this.startAudio, this);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
    }
    
    update() {
        // let velocity = 400;
        // this.player.body.setZeroVelocity();
        
        // if(cursors.up.isDown) {
        //     this.player.body.moveUp(velocity);
        // }
        
        // if(cursors.down.isDown) {
        //     this.player.body.moveDown(velocity);
        // }
        
        // if(cursors.left.isDown) {
        //     this.player.body.moveLeft(velocity);
        // }
        
        // if(cursors.right.isDown) {
        //     this.player.body.moveRight(velocity);
        // }
    }
    
    startAudio() {
        this.backgroundAudio.loopFull();
    }
    
    shutdown() {
        this.backgroundAudio.stop();
    }
}