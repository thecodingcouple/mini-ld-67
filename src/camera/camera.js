import { World } from "./world";
import { Ray } from "./ray";
import { Phaser } from "phaser";

export class Camera {
    constructor(canvas, world, fieldOfView, numberOfRays) {
        this.world = world;
        this.ctx = canvas.getContext('2d');
        this.height = canvas.height;
        this.width = canvas.width;
        this.fieldOfView = fieldOfView || 0.8;
        this.scale = (this.width + this.height) / 1200;
        this.columnWidth = this.width / numberOfRays;
        this.numberOfRays = numberOfRays;
    }
    
    render(sprite) {     
        this._drawColumns({x: this.world.convertWorldX(sprite.x), y: this.world.convertWorldY(sprite.y), direction: Phaser.Math.degToRad(sprite.angle)});
    }
    
    _drawColumns(player) {    
        this.ctx.save();
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let col = 0; col < this.numberOfRays; col++) {
            let x = col / this.numberOfRays - 0.5;
            let angle = Math.atan2(x, this.fieldOfView);
            
            let ray = new Ray(player.x, player.y, player.direction + angle, 14, this.world);
            this._drawColumn(col, ray, angle);
        }
        this.ctx.restore();
    }
    
    _drawColumn(column, ray, angle) {
        let left = Math.floor(this.columnWidth * column);
        let width = Math.ceil(this.columnWidth);
        let hit = -1;
      
        while (++hit < ray.points.length && ray.points[hit].height <= 0);
        
        for (let s = ray.points.length - 1; s >= 0; s--) {
            let step = ray.points[s];
            if (s === hit) {
                let wallTexture = this.world.getTexture(step.index);
                let textureX = Math.floor(wallTexture.width * step.offset);
                let projection = this._projectColumn(step.height, angle, step.distance);
                this.ctx.drawImage(wallTexture, textureX, 0, 1, wallTexture.height, left, projection.top, width, projection.height); 
            }
        }
    }
    
    _projectColumn(height, angle, distance) {
        var z = distance * Math.cos(angle);
        var wallHeight = this.height * height / z;
        var bottom = this.height / 2 * (1 + 1 / z);
        return {
            top: bottom - wallHeight,
            height: wallHeight
        };
    }
    
}