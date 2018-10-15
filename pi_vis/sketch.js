const width = 600;
const height = 600;

function setup() {
    createCanvas(width, height);
    frameRate(1);
    ellipseMode(RADIUS);
    textAlign(CENTER);
    colorMode(HSB, 255);
}

function draw() {
    var r = width/3;
    background(0);
    noFill();
    stroke(0,255,255);
    strokeWeight(3);
    ellipse(width/2, height/2, r);
    let prev = 3;
    for (let i=1; i<frameCount; i++) {
        let digit = floor(PI*(10**i) - 10*(floor(PI*10**(i-1)))); 
        let theta = prev*2*PI/10;
        let x1 = r*cos(theta) + width/2;
        let y1 = r*sin(theta) + height/2;
        theta = digit*2*PI/10;
        let x2 = r*cos(theta) + width/2;
        let y2 = r*sin(theta) + height/2;
        
        stroke((5*i)%256, 255, 255);
        line(x1, y1, x2, y2);    
        prev = digit;
    }
    console.log(prev);
    fill(0,255,255);
    noStroke();
    textSize(16);
    for (let i=0; i<10; i++) {
        let theta = i*2*PI/10;
        let x = (r+16)*cos(theta) + width/2;
        let y = (r+16)*sin(theta) + height/2;
        text(i, x, y);
    }
}
