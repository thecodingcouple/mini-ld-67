import { Phaser } from 'phaser';

export class Load extends Phaser.State {
    preload() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: 'blue', 
            fill: 'blue' 
        };
        
        this.game.add.text(80, 150, 'loading...', textStyle);
        
        this.game.load.audio('openingAudio', ['assets/mystery_manor.mp3', 'assets/mystery_manor.ogg']);
        this.game.load.audio('backgroundAudio', ['assets/horror_ambient.mp3', 'assets/horror_ambient.ogg']);
        this.game.load.audio('footsteps', 'assets/stepstone_1.wav');
        this.game.load.audio('lightAbsorption', 'assets/light_absorption.wav');
        this.game.load.audio('powerUp', ['assets/fight.wav', 'assets/fight.ogg']);
        this.game.load.audio('gameover', 'assets/gameover.ogg');
        this.game.load.audio('victory', 'assets/victory.wav');
        this.game.load.audio('scream', ['assets/scream.mp3', 'assets/scream.ogg']);
        
        this.game.load.image('background', 'assets/grunge-tileset.png');
        
        this.game.load.spritesheet('orb', 'assets/orb.png', 32, 32, 4);
        this.game.load.spritesheet('ghost', 'assets/ghost.png', 32, 32, 20);
        
    }
    
    create() {        
        this.game.state.start('menu');
    }
}