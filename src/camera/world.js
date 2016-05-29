import { Ray } from './ray';
import { Phaser } from 'phaser';

export class World {
    constructor(tileMap) {
        this.textureMap = {};
        
        this.tileMap = tileMap;
        
        let mapLength = this.tileMap.layers[0].data.length;
        let mapWidth = this.tileMap.layers[0].data[0].length;
        let array = [];
        let mapArray = [];
        for (let y = 0; y < mapLength; y++) {
            array[y] = [];
            mapArray[y] = [];
            for (let x = 0; x < mapWidth; x++) {
                array[y][x] = this.tileMap.layers[0].data[y][x].index;
                if (array[y][x] < 0) {
                    array[y][x] = 0;
                }

                mapArray[y].push(array[y][x]);
                
            }
        }
        
        this.mapArray = mapArray;
    }
    
    getTile(x, y) {
        x = Math.floor(x);
        y = Math.floor(y)
        if (y < 0 || y > this.mapArray.length - 1 || x < 0 || x > this.mapArray[y].length - 1) {
            return -1;
        }
        return this.mapArray[y][x];
    }
    
    convertWorldX(x) {
        return x / this.tileMap.tileWidth;
    }
    
    convertWorldY(y) {
        return y / this.tileMap.tileHeight;
    }
    
    addTexture(index, image) {
        this.textureMap[index] = image;
    }
    
    getTexture(index) {
        return this.textureMap[index];
    }
}