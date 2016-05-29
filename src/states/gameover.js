import { Phaser } from 'phaser';

export class GameOver extends Phaser.State {
    create() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: '#5f3424', 
            fill: '#5f3424' 
        };
        
        
        let background = this.game.add.sprite(0, 0, 'background');
        background.scale.setTo(3, 3); 
        
        this.game.add.text(80, 525, 'Game Over', textStyle);
        
        textStyle.stroke = '#3f2618';
        textStyle.fill = '#3f2618';
        this.game.add.text(80.5, 525.5, 'Game Over', textStyle);
        
        let enterKey = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        enterKey.onDown.addOnce( () => this.game.state.start('menu'));
        
        this.gameOverAudio = this.game.add.audio('gameover');
        this.game.sound.setDecodedCallback(this.gameOverAudio, this.startAudio, this);
    }
    
    startAudio() {
        this.gameOverAudio.loopFull();
    }
    
    shutdown() {
        this.gameOverAudio.stop();
    }
}