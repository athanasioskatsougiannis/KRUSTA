let mic;
let amp;
let xoff = 0;
let xstep = 3;
let colorsBG;
let colorsF;
let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];

let scaleRatio = 1;
let exportRatio = 8;
let myScaledCanvas;
let canvas;
let a0Paper = {
  width: 9920,
  height: 7016
}

let img, img1;
let K, R, U, S, T, A;

function preload() {
  myfont = loadFont('Assets/Orleans-Thin-Trial.otf');
  img = loadImage('Assets/logo.png');
  img1 = loadImage('Assets/logo1.png');

  //K = loadSVG('Assets/KRUSTA-Logo_K.svg');
  K = loadImage('Assets/KRUSTA-Logo_K.svg');
  R = loadImage('Assets/KRUSTA-Logo_R.svg');
  U = loadImage('Assets/KRUSTA-Logo_U.svg');
  S = loadImage('Assets/KRUSTA-Logo_S.svg');
  T = loadImage('Assets/KRUSTA-Logo_T.svg');
  A = loadImage('Assets/KRUSTA-Logo_A.svg');

}


function setup() {
  //createCanvas(900, 600);
  let w = a0Paper.width / exportRatio;
  let h = a0Paper.height / exportRatio;

  myScaledCanvas = createGraphics(w, h, SVG);
  canvas = createCanvas(w, h, SVG);

  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();


  //myScaledCanvas.textFont(myfont);
  //myScaledCanvas.textSize(150);
  colorsBG = random(colors); 
  colorsF = random(colors); 
  
  
  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);


}

function draw() {
  // Clear myScaledCanvas each frame
  myScaledCanvas.clear();

  myScaledCanvas.push();
  // Transform (scale) all the drawings
  myScaledCanvas.scale(scaleRatio);
  drawMyDesign();
  myScaledCanvas.pop();

  //myScaledCanvas.circle(width/2, height/2, 100);

  // Draw myScaledCanvas to canvas
  image(myScaledCanvas, 0, 0);
}

function exportHighResolution() {
  scaleRatio = exportRatio;

  // Re-create myScaledCanvas with exportRatio and re-draw
  myScaledCanvas = createGraphics(scaleRatio*width, scaleRatio*height);
  //setup();
  draw();

  // Get timestamp to name the ouput file
  let timestamp = new Date().getTime();

  // Save as PNG
  save(myScaledCanvas, str(timestamp), 'png');

  // Reset scaleRation back to 1, re-create buffer, re-draw
  scaleRatio = 1;
  myScaledCanvas = createGraphics(width, height);
  //setup();
  draw();
}


function keyPressed() {
	if (key === ' '){
		setup();
	}
  	if(key === 's' || key === 'S') exportHighResolution();
  
}

//=================================================================

function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."
  // Make all the drawing to the myScaledCanvas instead of canvas

  myScaledCanvas.background(colorsBG);
  myScaledCanvas.fill(colorsF); 
  myScaledCanvas.noStroke();
  
  // adjust map values to taste; actual levels
  let level = amp.getLevel();

  // tend to be between 0 and 0.5
  let barHeight = map(level, 0, 0.25, 0, height);
  myScaledCanvas.rect(10, height - barHeight, 3, barHeight)

  myScaledCanvas.textFont(myfont);
  myScaledCanvas.textSize(150);

  //myScaledCanvas.image(img,350,326,690,291);

  myScaledCanvas.image(K,276, 390 - barHeight * 0.3);
  myScaledCanvas.image(R,382, 390 - barHeight * 0.5);
  myScaledCanvas.image(U,482, 390 - barHeight * 0.65);
  myScaledCanvas.image(S,580, 390 - barHeight * 0.65);
  myScaledCanvas.image(T,668, 390 - barHeight * 0.5);
  myScaledCanvas.image(A,759, 390 - barHeight * 0.3);
  

  //myScaledCanvas.image(K,291, 390);
  //K.myScaledCanvas.stroke('#BDA88C');
  //K.myScaledCanvas.query('path')[1].attribute('fill', '#red');
  
}

/*
// arguments: filename, link text, chart we created
createPngLink('KRUSTAlogo.png', 'Export PNG, ', chart);

// arguments: filename, link text, the chart, and its settings
createSvgLink('KRUSTAlogo.svg', 'SVG', chart, options);*/