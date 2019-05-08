let font,
  fontsize = 60;
phrase = 0;
i = 0;
gap = 30;
charr = []
let phrases = [
    'hey there, buddy...',
    "hows's things???",
    "wow. pippy really is a great pup!!!!!!!!!!!!!!!!!!!!!!!!!!!"
]

function setup() {
    createCanvas(windowWidth, windowHeight);    
    textFont("inconsolata");
    textSize(fontsize);
    textAlign(CENTER, CENTER);
}

function draw() {
    windowResized()
    frameRate(7)
    background(160);
    var char
    for(char = 0; char <= i; char++) {
        text(phrases[phrase].charAt(char), 20 + gap * char, 40);
    }
    rect(10 + gap * char, 10, 5, 50)
    fill(0,0,0)
    i++;
    if (i == phrases[phrase].length) {
        phrase++;
        i = 0;
    }
    if (phrase == phrases.length) {
        phrase = 0;
         i = 0;
    }
}



function windowResized() {
    const { marginLeft, marginRight } = getComputedStyle(canvas.parentElement),
    w = windowWidth - round(float(marginLeft) + float(marginRight));
    resizeCanvas(w, windowHeight, true);
}

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }