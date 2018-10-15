const width = 600;
const height = 600;
const radius = 5;

var buildings = [];
var players = [];
var turn = 0;
var aiming = true;
var force, proj;

function mouseClicked() {
    aiming = false;
    let x = players[turn].x + radius;
    let y = players[turn].y - 30;
    proj = new Circle(x, y, radius, 
                      {vx:force.x/50, vy:force.y/50, ax:0, ay:0.1}, 
                      {c_fill:players[turn].c_fill});
    turn = (turn+1)%2;
}

function endScreen(killed) {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(64);
        text("Player " + (killed) + " was killed", width/2, height/2);
}

function setup() {
    createCanvas(width, height);
    let length = 0;
    while ( length < width ){
        let y = random(width/2, 3*width/4);
        let h = width - y;
        let w = random(100, 150);
        let c = color(random(100,200));
        buildings.push(new Rect(length, y, w, h, {}, {c_line:c, c_fill:c}));
        length += w;
    }
    for (let i=0; i < 2; i++) {
        let pos = random(buildings);
        let w = 30;
        let h = 60;
        let x = pos.x + 0.5*pos.w - w/2;
        let y = pos.y - h;
        if ( i == 1 && x == players[0].x ) {
            i--;
        } else {
            players.push(new Rect(x, y, w, h, {}, {c_fill:color(255*(1 - i), 30, i*255)}));
        }
    }

}

function draw() {
    var killed = -1;
    background(color(50, 100, 255));
    rectMode(CORNER);
    for ( let i=0; i<buildings.length; i++ ) {
        buildings[i].show();
    }
    for ( let i=0; i<players.length; i++ ) {
        players[i].show();
    }
    if (aiming) {
        let x = players[turn].x + 15;
        let y = players[turn].y + 30;
        strokeWeight(4);
        stroke(players[(turn + 1)%2].c_fill);
        line(x, y, mouseX, mouseY);
        force = createVector(mouseX - x, mouseY - y);
        strokeWeight(1);
    } else {
        move(proj);
        proj.show();
        for ( let i=0; i<buildings.length; i++ ) {
            if (buildings[i].circleCollision(proj)) {
                aiming = true;
            }
        }
        for ( let i=0; i<players.length; i++ ) {
            if (players[i].circleCollision(proj)) {
                killed = i;
            }
        }
    }
    if ( killed >= 0 ) {
        noLoop();
        endScreen(killed + 1);
    }
}
