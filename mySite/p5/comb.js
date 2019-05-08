let x = 0;
let y = 0;

function setup() {
  createCanvas(1920, 1080);
  noStroke();
}

function draw() {
  background(0);
  x = x + 0.1;
  y = (sin(radians(x)) * 180) + 200
  for(z=1;z<360;z++){
    for(i = 1; i < 3; i+=.1)
    {
      fill(int(i * 70),255-(int(i*70)),255,120);
      ellipse(i*4+z*4+y*4+x*4-820, ((sin(z+y)/i)*400)+400, 30- i *8, i*8);
    }
  }
}