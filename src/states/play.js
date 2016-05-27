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
        
        let square = this.game.add.bitmapData(32, 32);
        square.ctx.beginPath();
        square.ctx.rect(0, 0, 32, 32);
        square.ctx.fillStyle = '#ff0000';
        square.ctx.fill();
        
        this.sprite = this.game.add.sprite(200, 200, square);
        
        // enabling arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = new Player(this.game, 40, 40);
        this.game.add.existing(this.player);
    }
    
    create() {
        this.backgroundAudio = this.game.add.audio('backgroundAudio');
        this.game.sound.setDecodedCallback(this.backgroundAudio, this.startAudio, this);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
    }
    
    update() {
        this.player.move(this.cursors);
    }
    
    startAudio() {
        this.backgroundAudio.loopFull();
    }
    
    shutdown() {
        this.backgroundAudio.stop();
    }
}