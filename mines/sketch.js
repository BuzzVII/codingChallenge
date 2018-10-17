const width = 600;
const height = 600;
const w = 10, h = 10;

var mine_field = new Array((w+2)*(h+2));
var cleared = new Array((w+2)*(h+2));
var flag = new Array((w+2)*(h+2));
var mine_count = new Array((w+2)*(h+2));
var win = false;
var lose = false;
var endText = 'Cleared';

function setup() {
    createCanvas(width, height);
    mine_count.fill(0);
    cleared.fill(false);
    flag.fill(false);

    for (let i=0; i<w; i++) {
        for (let j=0; j<h; j++) {
            let k = (i+1)+(j+1)*(w+2);
            mine_field[k] = random(1) > 0.8;
            if (mine_field[k]) {
                for (let n = -1; n <= 1; n++) {
                    for (let m = -1; m <= 1; m++) {
                        mine_count[k + n + m*(w+2)] += 1;
                    }
                }
            }
        }
    }
}


function mouseClicked() {
    if (mouseX >= 0 & mouseX < width & mouseY >= 0 & mouseY < height) {
        let x = ceil(mouseX/width*w);
        let y = ceil(mouseY/height*h);
        let k = x+y*(w+2);
        if (keyIsPressed && keyCode == CONTROL ) {
            flag[k] = true;
        } else {
            lose = mine_field[k];
            toClear = [k];
            while(toClear.length > 0) {
                let i = toClear.pop();
                cleared[i] = true;
                if (mine_count[i]==0) {
                    for (let n = -1; n <= 1; n++) {
                        for (let m = -1; m <= 1; m++) {
                            let j = i + n + m*(w+2);
                            if (!cleared[j]) {
                                toClear.push(j);
                            }
                        }
                    }
                   
                }
            }
        }
    }
}

function gameOver(good) {
        endText = good?'Cleared':'KABOOOM!!';
        noStroke();
        fill('blue');
        textAlign(CENTER);
        textSize(64);
        text(endText, width/2, height/2);
}

function draw() {
    background(150);
    stroke(0);
    win = true;
    for (let i=0; i<w; i++) {
        for (let j=0; j<h; j++) {
            let k = (i+1)+(j+1)*(w+2);
            if (flag[k]) {
                fill('green');
            } else {
                fill(100);
            }
            push();
            if ( cleared[k]==1 ) {
                fill(200);
                if (mine_field[k]) {
                    fill('red');
                }
            }
            rect(i*width/w, j*height/h, width/w, height/h);
            if (!mine_field[k]) {
                win &= cleared[k];
                if (cleared[k]) {
                    push()
                    noStroke();
                    fill(0);
                    textSize(20);
                    textAlign(CENTER, CENTER);
                    text(mine_count[k], (i+0.5)*width/w, (j+0.5)*height/h);
                    pop(); 
                }
            }
            pop();
        }
    }
    if (win || lose) {
        for (let i=0; i<w; i++) {
            for (let j=0; j<h; j++) {
                let k = (i+1)+(j+1)*(w+2);
                if (mine_field[k]) {
                    push()
                    noStroke();
                    fill(0);
                    ellipseMode(RADIUS);
                    ellipse((i+0.5)*width/w, (j+0.5)*height/h, 20);
                    pop(); 
                }
            }
        }
        gameOver(win);
        noLoop();
    }
}
