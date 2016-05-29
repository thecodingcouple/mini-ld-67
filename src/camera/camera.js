import { World } from "./world";
import { Phaser } from "phaser";

export class Camera {
    constructor(bitmapData, world, fieldOfView, numberOfRays) {
        this.world = world;
        this.bitmapData = bitmapData;
        this.fieldOfView = fieldOfView || 0.8;
        this.scale = (bitmapData.width + bitmapData.height) / 1200;
        this.columnWidth = bitmapData.width / numberOfRays;
    }
    
    render(sprite) {
        this._drawColumns(sprite);
    }
    
    _drawColumns(sprite) {    
        this.bitmapData.ctx.save();
        for (let col = 0; col < this.numberOfRays; col++) {
            let x = col / this.numberOfRays - 0.5;
            let angle = Math.atan2(x, this.fieldOfView);
            
            let ray = new Ray(sprite.x, sprite.y, angle, 14, this.world);
            this._drawColumn(col, ray, angle);
        }
        this.bitmapData.ctx.restore();
    }
    
    _drawColumn(column, ray, angle) {
        let left = Math.floor(this.columnWidth * column);
        let width = Math.ceil(this.columnWidth);
        let hit = -1;
      
        while (++hit < ray.points.length && ray.points[hit].height <= 0);
        
        for (let s = ray.point.length - 1; s >= 0; s--) {
            let step = ray[s];
            if (s === hit) {
                let wallTexture = this.world.getWallTexture();
                let textureX = Math.floor(wallTexture.width * step.offset);
                let projection = this._projectColumn(step.height, angle, step.distance);
                this.bitmapData.ctx(wallTexture, textureX, 0, 1, wallTexture.height, left, projection.top, width, projection.height); 
            }
        }
    }
    
    _projectColumn(height, angle, distance) {
        var z = distance * Math.cos(angle);
        var wallHeight = this.bitmapData.height * height / z;
        var bottom = this.bitmapData.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    }
    
}