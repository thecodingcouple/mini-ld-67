export class Ray {
    constructor(originX, originY, angle, range, world) {
        this.sin = Math.sin(angle);
        this.cos = Math.cos(angle);
        this.world = world;
        this.range = range;
        this.points = this._buildRay({x: originX, y: originY, height: 0, distance: 0});
    }
    
    _buildRay(rayPoint) {
        let stepX = this._stepToGridline(this.sin, this.cos, rayPoint.x, rayPoint.y);
        let stepY = this._stepToGridline(this.cos, this.sin, rayPoint.y, rayPoint.x, true);
        
        let nextStep = stepX.lengthSquared < stepY.lengthSquared 
            ? this._checkForWall(stepX, 1, 0, rayPoint.distance, stepX.y) 
            : this._checkForWall(stepY, 0, 1, rayPoint.distance, stepY.x);
            
        if (nextStep.distance > this.range) {
            return [rayPoint]; 
        } else {
            return [rayPoint].concat(this._buildRay(nextStep));
        }
    }
    
    _stepToGridline(rise, run, originX, originY, isHorizontal) {
        let x = originX;
        let y = originY;
        if (run === 0) return {lengthSquared: Infinity};
            var dx = run > 0 
                ? Math.floor(x + 1) - x 
                : Math.ceil(x - 1) - x;
                
            var dy = dx * (rise / run);
            return {
                x: isHorizontal ? y + dy : x + dx,
                y: isHorizontal ? x + dx : y + dy,
                lengthSquared: dx * dx + dy * dy
            };
    }
    
    _checkForWall(step, shiftX, shiftY, distance, offset) {
        var dx = this.cos < 0 ? shiftX : 0;
        var dy = this.sin < 0 ? shiftY : 0;
        step.index = this.world.getTile(step.x - dx, step.y - dy);
        step.height = step.index ? 1 : 0;
        step.distance = distance + Math.sqrt(step.lengthSquared);
        
        step.offset = offset - Math.floor(offset);
        return step;
    }
}