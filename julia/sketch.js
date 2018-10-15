const width = 300;
const height = 300;
const max_it = 100;
const num = 1;
const c = [-0.4, 0.6]

const x_ = [-1.5, 1]
const y_ = [-1, 1]

var img, corner;
var zoom = true;
var dragging = false;

function setup(){
    createCanvas(width, height);
    img = createImage(height, width);
    img.loadPixels();

    colorMode(HSB, 255);
}

function f(z, c, n) {
    let r = z.slice();
    for (let j=0; j<n; j++) {
        r = complexTimes(r, z)
    }
    r[0] += c[0];
    r[1] += c[1];
    return r
}

function complexTimes(c, d) {
    let r = c[0]*d[0] - c[1]*d[1];
    let i = c[0]*d[1] + c[1]*d[0];
    return [r, i]
}

function conjugateSq(c) {
    return c[0]*c[0] + c[1]*c[1]
}

function mousePressed() {
    corner = [map(mouseX, 0, width, x_[0], x_[1]),
              map(mouseY, 0, height, y_[1], y_[0]),
              map(mouseX, 0, width, x_[0], x_[1]),
              map(mouseY, 0, height, y_[1], y_[0]),
             ]
             
    dragging = true;
}

function mouseDragged() {
    corner[2] = map(mouseX, 0, width, x_[0], x_[1]);
    corner[3] = map(mouseY, 0, height, y_[1], y_[0]);
}

function mouseReleased() {
    corner[2] = map(mouseX, 0, width, x_[0], x_[1]);
    corner[3] = map(mouseY, 0, height, y_[1], y_[0]);
    
    x_[0] = Math.min(corner[0], corner[2]);
    x_[1] = Math.max(corner[0], corner[2]);
    y_[0] = Math.min(corner[1], corner[3]);
    y_[1] = Math.max(corner[1], corner[3]);

    dragging = false;
    zoom = true;
}

function doubleClicked() {
    x_[0] = -1.5;
    x_[1] = 1;
    y_[0] = -1;
    y_[1] = 1;
}

function draw(){
    background(0);
    if ( zoom ) {
        for (let i=0; i<width; i++) {
            for (let j=0; j<width; j++) {
                var x = map(i, 0, width, x_[0], x_[1]);
                var y = map(j, 0, height, y_[1], y_[0]);
                var z = [x, y];
                let it=0
                for (; it<max_it; it++) {
                    z = f(z, c, num);
                    if (conjugateSq(z)>=2) {
                        break;
                    }
                }
                let col = color(0);
                if ( it < max_it ){
                    col = color(((0.5 - it/max_it)*255)%256, 200, 255)
                }
                img.set(i, j, col);
            }
        }
        img.updatePixels();
        zoom = false;
    }
    image(img,0,0);
    if ( dragging ) {
        noFill();
        strokeWeight(3);
        stroke(255);
        rectMode(CORNERS);
        rect(map(corner[0], x_[0], x_[1], 0, width), 
             map(corner[1], y_[0], y_[1], height, 0), 
             map(corner[2], x_[0], x_[1], 0, width), 
             map(corner[3], y_[0], y_[1], height, 0),
             );
    }
}
