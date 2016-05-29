import { Phaser } from 'phaser';

export class GameOver extends Phaser.State {
    create() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: 'blue', 
            fill: 'blue' 
        };
        
        this.game.add.text(80, 150, 'Game Over', textStyle);
        
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