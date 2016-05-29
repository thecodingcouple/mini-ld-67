import { Phaser } from 'phaser';

export class GameOver extends Phaser.State {
    create() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: '#bd3500', 
            fill: '#bd3500' 
        };
        
        
        let background = this.game.add.sprite(0, 0, 'background');
        background.scale.setTo(3, 3); 
        
        this.game.add.text(80, 525, 'Game Over', textStyle);
        
        textStyle.stroke = '#d43c01';
        textStyle.fill = '#d43c01';
        this.game.add.text(80.5, 525.5, 'Game Over', textStyle);
        
        textStyle.stroke = '#3f2618';
        textStyle.fill = '#3f2618';
        textStyle.fontSize = 60;
        textStyle.align = 'center';
        this.game.add.text(400, 30, 'Ghosts At\n42nd Street', textStyle);   
        
        textStyle.stroke = '#cb8e18';
        textStyle.fill = '#cb8e18';
        this.game.add.text(400, 30, 'Ghosts At\n42nd Street', textStyle);
        
        let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onDown.addOnce( () => this.game.state.start('menu'));
        
        this.gameOverAudio = this.game.add.audio('gameover');
        this.game.sound.setDecodedCallback(this.gameOverAudio, this.startAudio, this);
    }
    
    startAudio() {
        this.gameOverAudio.play();
    }
    
    shutdown() {
        this.gameOverAudio.stop();
    }
}