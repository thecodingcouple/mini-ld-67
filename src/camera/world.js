import { Ray } from './ray';
import { Phaser } from 'phaser';

export class World {
    constructor(tileMap, wallTextureKey) {
        this.tileMap = tileMap;
        this.wallTextureKey = wallTextureKey;
    }
    
    getTile(x, y) {
        return this.tileMap.layers[0].tilemap.getTile(x, y);
    }
    
    getWallTexture() {
        return Phaser.Cache.getImage(this.wallTextureKey);
    }
}