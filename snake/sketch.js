const width = 300;
const height = 300;
const blocks = 15;
const game_speed = 5;

var snake;
var fruit = [];
var direction = 'U';
var growing = false;
var game_over = false;
var score = 0;

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = 'L';
  } else if (keyCode === RIGHT_ARROW) {
    direction = 'R';
  } else if (keyCode === UP_ARROW) {
    direction = 'U';
  } else if (keyCode === DOWN_ARROW) {
    direction = 'D';
  }
}

function step(s) {
    e = s.length - 1;
    h = [s[e][0], s[e][1]];
    if (direction === 'R') {
        h[0] += 1;
    } else if (direction === 'L') {
        h[0] -= 1;
    } else if (direction === 'U') {
        h[1] += 1;
    } else if (direction === 'D') {
        h[1] -= 1;
    }
    if ( h[0] == -1 | h[0] == blocks | h[1] == -1 | h[1] == blocks ) {
        game_over = true;
    } else {
        s.push(h);
    }
    for (let i=0; i < s.length; i++) {
        for (let j=0; j < s.length; j++) {
            if (i != j & s[i][0] == s[j][0] & s[i][1] == s[j][1]) {
                game_over = true;
            }
        }
    }
    if (!growing) {
        s.splice(0,1);
    } else {
        growing = false;
    }
}

function showFruit() {
    let w = width/blocks;
    let h = height/blocks;
    let x = map(fruit[0], 0, blocks, 0, width);
    let y = map(fruit[1], -1, blocks-1, height, 0);
    noStroke;
    fill('red');
    ellipseMode(CORNER);
    ellipse(x, y, w, h);
}

function eatFruit() {
    e = snake.length - 1;
    if (snake[e][0] == fruit[0] & snake[e][1] == fruit[1]) {
        growing = true;
        fruit = [floor(random(0, blocks)), floor(random(0, blocks))]
        score += 10
    }
}

function setup(){
    createCanvas(width, height);
    
    frameRate(game_speed);

    fruit = [floor(random(0, blocks)), floor(random(0, blocks))]
    snake = [[round(blocks/2), round(blocks/2)]];
}

function endScreen() {
        noStroke();
        fill(255);
        textAlign(CENTER);
        textSize(16);
        text("GAME OVER: " + score, width/2, height/2);
}

function draw(){
    background(0);
    showFruit();
    fill(color(100, 150, 50));
    noStroke;
    for (let i=0; i < snake.length; i++) {
        let x = map(snake[i][0], 0, blocks, 0, width);
        let y = map(snake[i][1], -1, blocks-1, height, 0);
        rect(x, y, width/blocks, height/blocks);
    }
    step(snake);
    if (game_over) {
        endScreen();
        noLoop();
    } else {
        eatFruit();
        score++;
    }
}
