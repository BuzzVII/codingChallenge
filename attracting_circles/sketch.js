const width = 900;
const height = 900;
const total_circles = 100;
const radius = 100;
const r_min = 4;
const r_max = 20;
const v_max = 1;

var circles = [];
var mouse_circle = [];

function mouseMoved() {
        mouse_circle.x = mouseX;
        mouse_circle.y = mouseY;
}

function add_circle(pos_x, pos_y, r){
    let c = color(random(255), 100, 255);
    let draw_style = {c_line:color(0), c_fill:c};
    let state = {vx:0, vy:0, ax:0, ay:0};
    circles.push(new Circle(pos_x, pos_y, r, state, draw_style));
}

function setup(){
    createCanvas(width, height);

    mouse_circle = new Circle(-100, 100, radius, {}, {c_fill:color(255)})
    
    colorMode(HSB, 255);
    for (let i=0; i<total_circles; i++){
            add_circle(random(width), random(height), random(r_min, r_max));
    }
}

function getCOM() {
    var com = createVector(0,0);
    for (let i=0; i < circles.length; i++) {
            circles[i].show();
            com = com.add(circles[i].getPos());         
    }
    com.div(total_circles);
    return com;
}

function draw(){
    background(255);
    strokeWeight(1);
    mouse_circle.show();

    var com = getCOM();
    for (let i=0; i < circles.length; i++) {
            let v = circles[i].getVel();
            let a = circles[i].getAcc();
            let pos = circles[i].getPos();
            let d = createVector(0,0);
            if (circles[i].collision(mouse_circle)) {
                d = pos.sub(mouse_circle.getPos());
                d.setMag(v_max);
                a.x = 0;
                a.y = 0;
            } else {
                d.x = v.x;
                d.y = v.y;
                a.x = 0;
                a.y = 0;
                pos.sub(com).mult(-1);
                if ( v.angleBetween(pos) > 0.1 || v.mag() < v_max ) {
                    a = pos;
                    a.setMag(0.1);
                    let temp = createVector(v.x, v.y);
                    temp.setMag(0.05);
                    a.sub(temp);
                }
            }
            for (let j=0; j < circles.length; j++) {
                if ( i!=j && circles[i].collision(circles[j])) {
                        pos1 = circles[i].getPos();
                        pos2 = circles[j].getPos();
                        d = pos1.sub(pos2);
                        d.normalize();
                        d.mult(v.mag());
                }
            }
            circles[i].setVel(d);
            circles[i].setAcc(a);
            move(circles[i]);
    }
}
