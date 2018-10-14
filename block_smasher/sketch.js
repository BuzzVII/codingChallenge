const width = 600;
const height = 600;
const radius = 10;
const rows = 6;
const h = 30;
const w = 60;

var tiles = [];
var ball, paddle, score;

function add_tile(pos_x, pos_y){
    let c = color(random(255), 100, 255);
    let draw_style = {c_line:color(255), c_fill:c};
    tiles.push(new Rect(pos_x, pos_y, w, h, {show:true}, draw_style));
}

function setup(){
    createCanvas(width, height);

    ball = new Circle(width/2, height/2, radius, {vx:random(-3, 3), vy:-5, ax:0, ay:0}, 
                      {c_fill:color(255)});
    paddle = new Rect(width/2-w/2, height-h, w, h/2, 
                      {vx:0, vy:0, ax:0, ay:0}, {c_fill:color(200)});

    colorMode(HSB, 255);
    for (let i=0; i<width/w; i++) {
        for (let j=1; j<=rows; j++) {
            add_tile(i*w,j*h);
        }
    }
    score = 0;
}

function checkEdge() {
    if (ball.x < 0 | ball.x > width) {
        let v = ball.getVel();
        v.x = -v.x;
        ball.setVel(v);
    }
    if (ball.y < 0) {
        let v = ball.getVel();
        v.y = -v.y;
        ball.setVel(v);
    }
    if (paddle.x < 0 | paddle.x > width - w) {
        paddle.setVel(createVector(0,0));
    }
    
}

function checkPaddle() {
    let hit = paddle.circleCollision(ball);
    if (hit) {
        if ( hit.u | hit.d ) {
            let v = ball.getVel();
            v.y = -v.y;
            ball.setVel(v);
        }
        if ( hit.l | hit.r ) {
            let v = ball.getVel();
            v.x = -v.x;
            ball.setVel(v);
        }
    }
}

function checkHit() {
    for (let i=0; i<tiles.length; i++) {
        if (tiles[i].state.show ) {
            let hit = tiles[i].circleCollision(ball);
            if (hit) {
                tiles[i].state.show = false;
                if ( hit.u | hit.d ) {
                    let v = ball.getVel();
                    v.y = -v.y;
                    ball.setVel(v);
                }
                if ( hit.l | hit.r ) {
                    let v = ball.getVel();
                    v.x = -v.x;
                    ball.setVel(v);
                }
                score += 100;
            }
        }
    }
}

function movePaddle() {
    if (keyIsDown(LEFT_ARROW)) {
        paddle.setVel(createVector(-7,0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
        paddle.setVel(createVector(7,0));
    }
    move(paddle);
}

function gameOver() {
    let finished = true;
    for (let i=0; i<tiles.length; i++) {
        finished&=(!tiles[i].state.show);
    }
    if (finished) {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(64);
        text("Winnner: " + score, width/2, height/2);
        console.log('Game Over: you win'); 
        console.log('score: ' + score); 
        noLoop();
    }
    if (ball.y > height) {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(64);
        text("Game Over: " + score, width/2, height/2);
        finished = true;
        console.log('Game Over: you lose'); 
        console.log('score: ' + score); 
        noLoop();
    }
    return finished;
}

function showScore() {
    noStroke();
    fill(255);
    textAlign(RIGHT);
    textSize(28);
    text(score, width - 10, 28);
}

function draw(){
    background(0);
    strokeWeight(1);
    ball.show();
    paddle.show();
    for (let i=0; i<tiles.length; i++) {
        if (tiles[i].state.show) {
            tiles[i].show();
        }
    }
    if ( !gameOver() ) {
        checkHit();
        checkEdge();
        checkPaddle();
        movePaddle();
        move(ball);
        showScore();
        score ++;
    }
}
