const width = 600;
const height = 600;
const bredth = 3;
const depth = 6;
const radius = 20;
const time = 10;

var to_visit_b = [[0,0]];
var to_visit_d = [[0,0]];

function setup() {
    createCanvas(width, height);
    frameRate(time/bredth*depth);
    ellipseMode(RADIUS);
    background(0);
}

function draw() {
    if (to_visit_d.length > 0) {
        let current = to_visit_d.pop();
        if ( current[0]+1 < depth ) {
            for ( let i = bredth-1; i >= 0; i--) {
                let n = current[1]*bredth + i; 
                to_visit_d.push([current[0]+1, n]);   
            }
        }
        fill('blue');
        stroke('blue');
        strokeWeight(4);
        let N = bredth**current[0];
        let x = width/( N + 1 )*(current[1] + 1);
        let y = height/(depth + 1)*(current[0] + 1);
        let r = radius/N;
        ellipse(x+r,y,r);
        if ( current[0] > 0 ) {
            strokeWeight(ceil(12*r/radius));
            let N = bredth**(current[0] - 1);
            let rp = radius/N;
            let xp = width/( N + 1 )*(floor(current[1]/bredth) + 1);
            let yp = height/(depth + 1)*(current[0]);
            line(xp+rp, yp, x+r, y);
        }
    }
    if (to_visit_b.length > 0) {
        let current = to_visit_b.splice(0,1)[0];
        if ( current[0] + 1 < depth ) {
            for ( let i = 0; i < bredth; i++) {
                let n = current[1]*bredth + i; 
                to_visit_b.push([current[0]+1, n]);   
            }
        }
        fill('red');
        stroke('red');
        let N = bredth**current[0];
        let x = width/( N + 1 )*(current[1] + 1);
        let y = height/(depth + 1)*(current[0] + 1);
        let r = radius/N;
        ellipse(x-r,y,r);
        if ( current[0] > 0 ) {
            strokeWeight(ceil(12*r/radius));
            let N = bredth**(current[0] - 1);
            let rp = radius/N;
            let xp = width/( N + 1 )*(floor(current[1]/bredth) + 1);
            let yp = height/(depth + 1)*(current[0]);
            line(xp-rp, yp, x-r, y);
        }
    }
}
