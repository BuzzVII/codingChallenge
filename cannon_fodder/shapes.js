function move(obj) {
        if (obj.state) {
            obj.x += obj.state.vx;
            obj.y += obj.state.vy;
            obj.state.vx += obj.state.ax; 
            obj.state.vy += obj.state.ay;
        }
}

class Rect {
    constructor(x, y, w, h, state, style){
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.state = state;
            if (style.c_line){
                    this.c_line = style.c_line;
            } else {
                    this.c_line = false;
            }
            if (style.c_fill) {
                    this.c_fill = style.c_fill;
            } else {
                    this.c_fill = false;
            }
    }

    show() {
            noFill();
            if (this.c_fill) {
                fill(this.c_fill);
            }
            noStroke();
            if (this.c_line) {
                stroke(this.c_line);
            }
            rect(this.x, this.y, this.w, this.h)
    }

    getPos(){
        return createVector(this.x, this.y);
    }

    getVel(v){
        let vx = this.state.vx;
        let vy = this.state.vy;
        return createVector(vx, vy);
    }

    getAcc(a){
        let ax = this.state.ax;
        let ay = this.state.ay;
        return createVector(ax, ay);
    }

    setVel(v){
        this.state.vx = v.x;
        this.state.vy = v.y;
    }

    setAcc(a){
        this.state.ax = a.x;
        this.state.ay = a.y;
    }

    circleCollision(other){
            let hit = false;
            let d1 = dist(other.x, other.y, this.x, this.y);
            let d2 = dist(other.x, other.y, this.x + this.w, this.y);
            let d3 = dist(other.x, other.y, this.x, this.y + this.h);
            let d4 = dist(other.x, other.y, this.x + this.w, this.y + this.h);
            let min_x = (this.w < 0 ? this.x + this.w:this.x);
            let max_x = (this.w < 0 ? this.x:this.x + this.w);
            let e1 = (other.x + other.r) >= min_x;
            let e2 = (other.x - other.r) <= max_x;
            let min_y = (this.h < 0 ? this.y + this.h:this.y)
            let max_y = (this.h < 0 ? this.y:this.y + this.h)
            let e3 = (other.y + other.r) >= min_y;
            let e4 = (other.y - other.r) <= max_y;
            let inside = e1 && e2 && e3 && e4;
            let corner = (d1 <= other.r) || (d2 <= other.r) || (d3 <= other.r) || (d4 <= other.r);
            if (corner||inside){
                hit = {l:(other.x + other.r) <= min_x,
                       r:(other.x - other.r) >= max_x, 
                       u:(other.y + other.r) <= min_y, 
                       d:(other.y - other.r) >= max_y, 
                       c:corner};
            }
            return hit;
    }
}


class Circle{
    
    constructor(x, y, r, state, style){
            this.x = x;
            this.y = y;
            this.r = r;
            this.state = state;
            //TODO: fix so that black can be used
            if (style.c_line){
                    this.c_line = style.c_line;
            } else {
                    this.c_line = false;
            }
            if (style.c_fill) {
                    this.c_fill = style.c_fill;
            } else {
                    this.c_fill = false;
            }
    }

    getPos(){
        return createVector(this.x, this.y);
    }

    getVel(v){
        let vx = this.state.vx;
        let vy = this.state.vy;
        return createVector(vx, vy);
    }

    getAcc(a){
        let ax = this.state.ax;
        let ay = this.state.ay;
        return createVector(ax, ay);
    }

    setVel(v){
        this.state.vx = v.x;
        this.state.vy = v.y;
    }

    setAcc(a){
        this.state.ax = a.x;
        this.state.ay = a.y;
    }

    collision(other){
            let d = dist(this.x, this.y, other.x, other.y);
            return d <= this.r + other.r;
    }

    show(){
            noFill();
            if (this.c_fill){
                fill(this.c_fill);
            }
            noStroke();
            if (this.c_line) {
                stroke(this.c_line);
            }
            ellipseMode(RADIUS)
            ellipse(this.x, this.y, this.r)
    }

}


