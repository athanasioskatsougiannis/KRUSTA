let mic;
let amp;
let xoff = 0;
let xstep = 3;

let easing = 60;
let x = 1;
var bins = 16, smoothing = 0.935;


let colorsBG;
let colorsF;
let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];
function preload() {
  myfont = loadFont('Orleans-Thin-Trial.otf');
}


function setup() {
  createCanvas(900, 600);


  textFont(myfont);
  textSize(150);
  colorsBG = random(colors); 
  colorsF = random(colors); 
  
  
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic); 
   fft = new p5.FFT(smoothing, bins);
  fft.setInput(mic);
}
function draw() {
  
  background(000);
  
  
  noStroke();
  fill(40);
  let level = amp.getLevel();
  // adjust map values to taste; actual levels
  // tend to be between 0 and 0.5
  let barHeight = map(level, 0, 0.25, 0, height);
  rect(10, height - barHeight, 3, barHeight)
  /*rect(xoff, height - barHeight, xstep, barHeight);
  xoff += xstep;
  if (xoff > width) {
    xoff = 0;
  }*/
  
  
  /*text('K', 150, 400 - mic.getLevel() * 100);
  text('R', 250, 400 - mic.getLevel() * 2000);
  text('U', 335, 400 - mic.getLevel() * 4000);
  text('S', 450, 400 - mic.getLevel() * 4000);
  text('T', 540, 400 - mic.getLevel() * 2000);
  text('A', 630, 400 - mic.getLevel() * 100);
  
  text('K', 140, 400 - barHeight * 0.3);
  text('R', 250, 400 - barHeight * 0.5);
  text('U', 340, 400 - barHeight * 0.65);
  text('S', 450, 400 - barHeight * 0.65);
  text('T', 540, 400 - barHeight * 0.5);
  text('A', 630, 400 - barHeight * 0.3);*/

  let targetX = barHeight;
  let dx = targetX - x;
  x += dx * easing;
  
  text('K', 140, 400 - barHeight * 0.3);
  text('R', 250, 400 - barHeight * 0.5);
  text('U', 340, 400 - barHeight * 0.65);
  text('S', 450, 400 - x * 0.65);
  text('T', 540, 400 - x * 0.5);
  text('A', 630, 400 - x * 0.3);
  
  
}


function keyPressed() {
	if (key === ' '){
		setup();
	}
  	if(key === 's' || key === 'S') save();
}
