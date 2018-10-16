const width = 600;
const height = 600;

var t0 = 0;
var s_old=0;

function setup() {
    createCanvas(width, height);
    colorMode(HSB, 1);
}

function draw() {
    push();
    background(0);
    translate(width/2, height/2);

    var R = width/2;
    var hr = hour();
    var m = minute();
    var mil = millis();
    var s = second();
    if (s != s_old) {
       t0 = mil;
       mil = 0;
       s_old = s;
    } else {
        mil -= t0;
        mil /= 1000;
    }
    s += mil;
    m += s/60;
    hr += m/60;
    var r_m = map(m, 0, 60, 0, R);
    var r_s = map(s, 0, 60, 0, r_m);
    
    angle = map(hr%12, 0, 12, 0, 2*PI);
    rotate(angle);
    
    var x1 = cos(-PI/2);
    var y1 = sin(-PI/2);
    var x2 = 0.5*cos(120/180*PI);
    var y2 = 0.5*sin(120/180*PI);
    var x3 = 0.5*cos(PI - 120/180*PI);
    var y3 = 0.5*sin(PI - 120/180*PI);
    var c0 = map(angle, 0, 2*PI, 0, 1);
    
    noStroke;
    h_s = map(r_s, 0, R, 0, 1);
    h_s = (h_s + c0)%1;
    fill(h_s,0.2,0.8);
    triangle(r_s*x1, r_s*y1, r_s*x2, r_s*y2, r_s*x3, r_s*y3);
    noFill();
    strokeWeight(4);
    h_m = map(r_s, 0, R, 0, 1);
    h_m = (h_m + c0)%1;
    stroke(h_m,0.2,0.8);
    triangle(r_m*x1, r_m*y1, r_m*x2, r_m*y2, r_m*x3, r_m*y3);
    stroke(c0,0.2,0.8);
    triangle(R*x1, R*y1, R*x2, R*y2, R*x3, R*y3);
    pop();
}
