const height = 600;
const width = 900;
const radius = 20;
const total_obstacles = 60;
const object_density = 2.5;
const level_width = total_obstacles*width/object_density;
const game_speed = -3;

var obstacles = [];
var tail = [];
var score = 0;
var main_circle, playing, started;

function mousePressed(m_event){
        started = true;
        playing = true;
        main_circle.state.ay = -0.1; 
}

function mouseReleased(){
        main_circle.state.ay = 0.1; 
}

function setup(){
    createCanvas(width, height);
    
    let main_c = color(246, 246, 121);
    var state = {vx:0, vy:0, ax:0, ay:-0.1};
    var style = {c_fill:main_c};
    main_circle = new Circle(width/3, height/2, radius, state, style);

    let ob_c = color(222, 184, 135);
    space = {vx:game_speed, vy:0, ax:0, ay:0};
    style = {c_fill:ob_c};
    for (let i=0; i < total_obstacles; i++) {
        let pos_x = (i+2)*level_width/total_obstacles + random(40);
        let pos_y = random(60, height-60);
        let rec_h = height - pos_y;
        if (random(-1, 1) <= 0) {
            rec_h = -pos_y;
        }
        obstacles.push(new Rect(pos_x, pos_y, 30, rec_h, space, style));
    }
}

function game_over() {
    playing = false;
    console.log("GAME OVER MAN!");
    console.log("total score:" + score);
    noLoop();
}

function show_score() {
            noStroke();
            fill(255);
            textAlign(RIGHT);
            textSize(32);
            text(score, width - 10, 32);
}

function start_screen() {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(64);
        text("Click to start", width/2, height/2);
}

function end_screen() {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(64);
        text("GAME OVER: " + score, width/2, height/2);
}

function game_step(){
        tail.push(createVector(main_circle.x, main_circle.y)); 
        move(main_circle);
        for (let i=0; i < obstacles.length; i++) {
            move(obstacles[i]);
        }
        score++;
}

function draw_objects(){
    if ( main_circle.y < (0 + main_circle.r) | main_circle.y > (height - main_circle.r)) {
            game_over();
    }
    for (let i=0; i < obstacles.length; i++) {
            obstacles[i].show();
            if (obstacles[i].circleCollision(main_circle)) {
                    game_over();
            }
    }
    stroke(main_circle.c_fill);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i=0; i < tail.length; i++) {
        vertex(tail[i].x, tail[i].y);
        tail[i].x += game_speed;    
    }
    endShape();
    strokeWeight(1);
}

function draw(){
    sky = color(102, 210, 255)
    background(sky);
    
    draw_objects();
    main_circle.show();
    if ( playing & started ) {
        show_score();
        game_step();
    } else if ( started ) {
        end_screen();
    } else {
        start_screen();
    }
}
