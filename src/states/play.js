import { Phaser } from 'phaser';
import { Player } from '../sprites/player';
import { SmallOrb } from '../sprites/small-orb';
import { LargeOrb } from '../sprites/large-orb';

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
        
        // sounds when orbs are acquired
        this.smallOrbSoundEffect = this.game.add.audio('lightAbsorption');   
        this.largeOrbSoundEffect = this.game.add.audio('powerUp');   
        
    }
    
    create() {
        this.backgroundAudio = this.game.add.audio('backgroundAudio');
        this.game.sound.setDecodedCallback(this.backgroundAudio, this.startAudio, this);
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        // add small orbs
        this.orbs = this.game.add.group();
        for(let x = 0; x < 5; x++) {
            let smallOrb = new SmallOrb(this.game, this.game.world.randomX, this.game.world.randomY);
            this.orbs.add(smallOrb);    
        }
        
        // add large orbs
        for(let x = 0; x < 5; x++) {
            let largeOrb = new LargeOrb(this.game, this.game.world.randomX, this.game.world.randomY);
            this.orbs.add(largeOrb);    
        }
        
    }
    
    update() {
        this.player.move(this.cursors);
        
        this.game.physics.arcade.overlap(this.player, this.orbs, this.acquireOrb, null, this);
    }
    
    acquireOrb(player, orb) {
        if(orb instanceof LargeOrb) {
            if(this.largeOrbSoundEffect.isPlaying) {
                this.largeOrbSoundEffect.restart();
            } else {
                this.largeOrbSoundEffect.play();
            }
        } else {
            this.smallOrbSoundEffect.play();
        }
        
        orb.destroy();
    }
    
    startAudio() {
        this.backgroundAudio.loopFull();
    }
    
    shutdown() {
        this.backgroundAudio.stop();
    }
}