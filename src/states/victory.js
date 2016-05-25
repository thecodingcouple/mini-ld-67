import { Phaser } from 'phaser';

export class Victory extends Phaser.State {
    create() {
        this.openingAudio = this.game.add.audio('openingAudio');
        this.game.sound.setDecodedCallback(this.openingAudio, this.startAudio, this);
    }
    
    startAudio() {
        this.openingAudio.loopFull();
    }
    
    shutdown() {
        this.openingAudio.stop();
    }
}