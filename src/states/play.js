import { Phaser } from 'phaser';
import { Player } from '../sprites/player';
import { SmallOrb } from '../sprites/small-orb';
import { LargeOrb } from '../sprites/large-orb';
import { Ghost } from '../sprites/ghost';

export class Play extends Phaser.State {
    preload() {
        let textStyle = { 
            font: '45px Arial',
            alight: 'center', 
            stroke: 'blue', 
            fill: 'blue' 
        };
        
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
        for(let x = 0; x < 15; x++) {
            let smallOrb = new SmallOrb(this.game, this.game.world.randomX, this.game.world.randomY);
            this.orbs.add(smallOrb);    
        }
        
        // add large orbs
        for(let x = 0; x < 1; x++) {
            let largeOrb = new LargeOrb(this.game, this.game.world.randomX, this.game.world.randomY);
            this.orbs.add(largeOrb);    
        }
        
        // add ghosts
        let cyanGhost = [0, 5, 10, 15];
        let redGhost = [1, 6, 11, 16];
        let pinkGhost = [2, 7, 12, 17];
        let yellowGhost = [3, 8, 13, 18];
        
        let ghostFrames = [cyanGhost, redGhost, pinkGhost, yellowGhost];
        
        this.ghosts = this.game.add.group();
        for(let x = 0; x < 4; x++) {
            let ghost = new Ghost(this.game, this.game.world.randomX, this.game.world.randomY, ghostFrames[x]);
            this.ghosts.add(ghost);
        }
    }
    
    update() {
        this.player.move(this.cursors);
        
        this.game.physics.arcade.collide(this.player, this.orbs, this.acquireOrb, null, this);
        this.game.physics.arcade.collide(this.player, this.ghosts, this.ghostTouchesPlayer, null, this);
    }
    
    acquireOrb(player, orb) {
        if(orb instanceof LargeOrb) {
            if(this.largeOrbSoundEffect.isPlaying) {
                this.largeOrbSoundEffect.restart();
            } else {
                this.largeOrbSoundEffect.play();
            }
            
            this.ghosts.callAll('beginFleeing');
            
        } else {
            this.smallOrbSoundEffect.play();
        }
        
        orb.destroy();
        
        // player wins the game!
        if(this.orbs.children.length === 0) {
            this.game.state.start('victory');
        }
    }
    
    ghostTouchesPlayer(player, ghost) {
        this.game.state.start('gameover');
    }
    
    startAudio() {
        this.backgroundAudio.loopFull();
    }
    
    shutdown() {
        this.backgroundAudio.stop();
    }
}