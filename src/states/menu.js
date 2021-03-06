import { Phaser } from 'phaser';

export class Menu extends Phaser.State {
    preload() {
        let textStyle = { 
            font: '45px Arial',
            stroke: '#5f3424', 
            fill: '#5f3424' 
        };        
        
        let background = this.game.add.sprite(0, 0, 'background');
        background.scale.setTo(3, 3); 
        
        this.game.add.text(80, 525, 'Press ENTER to continue.', textStyle);
        
        textStyle.stroke = '#3f2618';
        textStyle.fill = '#3f2618';
        this.game.add.text(80.5, 525.5, 'Press ENTER to continue.', textStyle);
        
        textStyle.stroke = '#3f2618';
        textStyle.fill = '#3f2618';
        textStyle.fontSize = 60;
        textStyle.align = 'center';
        this.game.add.text(400, 30, 'Ghosts At\n42nd Street', textStyle);   
        
        textStyle.stroke = '#cb8e18';
        textStyle.fill = '#cb8e18';
        this.game.add.text(400, 30, 'Ghosts At\n42nd Street', textStyle);      
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