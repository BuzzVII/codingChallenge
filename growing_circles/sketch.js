const height = 800;
const width = 1000;

var circles = [];
var h_count = 0;

function mouseMoved() {
        add_circle(mouseX, mouseY);
}

function add_circle(pos_x, pos_y){
    let ob_c = color(h_count, 200, 255);
    let draw_style = {c_line:ob_c};
    circles.push(new Circle(pos_x, pos_y, 1, {}, draw_style));
    h_count = (h_count+1) % 256 
}

function setup(){
    createCanvas(width, height);
    colorMode(HSB, 255);
}

function draw(){
    background(0);
    strokeWeight(4);
    for (let i=0; i < circles.length; i++) {
            circles[i].show();
    }
    for (let i=circles.length; i > 0; i--) {
            let j = i-1;
            circles[j].r += 1;
            let c = circles[j].c_line;
            let new_c = color(hue(c), saturation(c), brightness(c)-1);
            circles[j].c_line = new_c;
            if (brightness(c) == 0){
                    circles.splice(j, 1);
            }
    }
}
