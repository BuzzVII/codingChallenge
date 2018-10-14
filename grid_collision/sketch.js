const height = 600;
const width = 600;
const grid_r = 5;
const spacing = 30;
const radius = 2;

var main_circle, growing;
var grid = [];

function mousePressed(m_event){
    let temp_circle = new Circle(m_event.x - 10, m_event.y - 10, radius, {}, {});
    let collision = false;
    for (let i=0; i < grid.length; i++){
            collision |= temp_circle.collision(grid[i]);
            if (collision) { break; }
    }
    if (!collision){
        main_circle.r = radius;
        main_circle.x = m_event.x - 10;
        main_circle.y = m_event.y - 10;
        growing = true;
    }
}

function mouseReleased(){
    growing = false;
}

function setup(){
    createCanvas(width, height);
    cursor(CROSS);
    
    let grid_c = color(255,0,0);
    let main_c = color(246, 246, 121);

    var draw_style = {c_line:main_c};
    main_circle = new Circle(width/2, height/2, radius, {}, draw_style);
    
    draw_style = {c_fill:grid_c}
    for (let i = spacing; i < height; i += spacing){ 
        for (let j = spacing; j < width; j += spacing){
                if ( random(1) > 0.75 ) {
                    grid.push(new Circle(j, i, grid_r + random(0,4), {}, draw_style));
                }
        }
    }
}

function draw(){
    background(0);
    for (let i = 0; i < grid.length; i++) {
            grid[i].show();
            if (main_circle.collision(grid[i])){
                growing = false
            }
    }
    main_circle.show();
    if ( growing ) {
        main_circle.r += 1;
    } 
}
