import { Phaser } from 'phaser';

export class Menu extends Phaser.State {
    preload() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: 'blue', 
            fill: 'blue' 
        };
        
        this.game.add.text(80, 150, 'Menu', textStyle);
    }
    
    create() {
        this.openingAudio = this.game.add.audio('openingAudio');
        this.game.sound.setDecodedCallback(this.openingAudio, this.startAudio, this);
        
        let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onDown.addOnce( () => this.game.state.start('play'));
    }
    
    startAudio() {
        this.openingAudio.loopFull();
    }    
    
    shutdown() {
        this.openingAudio.stop();
    }
}