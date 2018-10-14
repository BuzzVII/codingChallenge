const height = 900;
const width = 900;
const radius = 20;
const total_cities = 11;
const batch = 800; 

var cities = [];
var order = [];
var iter;
var J;

function cost(c, o){
    let J = 0;
    for ( let i = 1; i < o.length; i++ ) {
        J += dist(c[o[i - 1]].x, c[o[i - 1]].y, c[o[i]].x, c[o[i]].y) 
    }
    return J
}

function rand_perm(length){
    let o_out = [];
    let ind = [];
    for (let i = 0; i < length; i++){
        ind.push(i);
    }
    for (let i = 0; i < length; i++){
        sel = random(ind);
        o_out.push(sel);
        for (let j = ind.length; j >= 0; j--) {
            if (ind[j] == sel) {
                ind.splice(j, 1);
            }
        }
    }
    return o_out;
}

function swap(o, i, j) {
        temp = o[i];
        o[i] = o[j];
        o[j] = temp;
}


function* perm(o, k) { 
        if (k == o.length) {
            yield o;
        } else {
            for ( let i = k; i < o.length; i++ ){
                swap(o, k, i);
                yield* perm(o, k+1);
                swap(o, k, i);
            }
        }
}


function setup(){
    createCanvas(width, height);
    
    let ob_c = color(222, 184, 135);
    let draw_style = {c_fill:ob_c};
    for (let i=0; i < total_cities; i++) {
        let pos_x = random(10, width-10);
        let pos_y = random(10, height-10);
        cities.push(new Circle(pos_x, pos_y, radius, {}, draw_style));
        order.push(i);
    }
    J = cost(cities, order.slice());
    iter = perm(order, 0);
}

function draw_objects(o){
    for (let i=0; i < cities.length; i++) {
            cities[i].show();
    }

    stroke(127);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i=0; i < order.length; i++) {
        vertex(cities[order[i]].x, cities[order[i]].y);
    }
    endShape();
    strokeWeight(1);

    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i=0; i < o.length; i++) {
        vertex(cities[o[i]].x, cities[o[i]].y);
    }
    endShape();
    strokeWeight(1);

    noStroke();
    fill(255);
    textAlign(RIGHT);
    textSize(32);
    text(J, width - 10, 32);
}

function draw(){
    grass = color(22, 255, 111)
    background(grass);
    //Random search
    if (false) {
        o = rand_perm(order.length);
    }
    let temp;
    for (let i = 0; i < batch; i++)
    {
        //iterate all permuations
        var o = iter.next().value;
        if (o) {
            temp = o;
            if (cost(cities, o) < J) { 
                order = o.slice();
                J = cost(cities, order);
                console.log(order + ' cost:' + J);
            }
        } else {
            temp = order;
            noLoop();
        }
    }
    draw_objects(temp);
}
