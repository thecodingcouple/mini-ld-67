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
        
        this.game.load.audio('openingAudio', ['../assets/mystery_manor.mp3', '../assets/mystery_manor.ogg']);
        this.game.load.audio('backgroundAudio', ['../assets/horror_ambient.mp3', '../assets/horror_ambient.ogg']);
        this.game.load.audio('footsteps', '../assets/stepstone_1.wav');
    }
    
    create() {        
        this.game.state.start('menu');
    }
}