let values = [];
let w = 1.5;
let deg = 1;
let hfac = 8;
let states = [];
let inc = 0.1;
let colinc = 10;
angleMode(DEGREES);

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function mapColors(val, maxVal){
    let mapped = val * (255 / maxVal);
     let colors = new Array;
    colors[0] = mapped; 
    colors[1] = abs(90 - mapped);
    colors[2] = abs(120 - mapped);
    ret = color(colors[0], colors[1], colors[2]);
    return ret;
}

function draw() {
    hfac = hfac +  inc;
    deg = deg + 1;
    if ((hfac > 10) || (hfac < 2)){inc = inc * -1};
    rectHeight = height / 6;
    w = width / 900;
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
    values[i] = ((height/8) * sin(radians(i+deg)*2)) + (height / 2);
    states[i] = -1;
    }
    background(250,200,100);
    for (let i = 0; i < values.length; i++) {
        noStroke();
        angleMode
        rotate(0.000001);
        fill(mapColors(i, values.length));
        rect(i * w, height - values[i], w, rectHeight - ((rectHeight) * sin(radians(i + (1.1*i) - i))));
    }
    for (let i = 0; i < values.length; i++) {
        noStroke();
        fill(mapColors(i, values.length));
        rect(i * w, height - values[i], w, -1 *(rectHeight - ((rectHeight) * sin(radians(i + (1.1*i) - i)))));
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
