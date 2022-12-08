let mic;
let amp;
let xoff = 0;
let xstep = 3;

let easing = 60;
let x = 1;
var bins = 16, smoothing = 0.935;

let input;
let img;
let BGcolor;
let Fcolor;
let angle = 0;
var pressed = false;
let checkboxW;
let checkboxT;

///////
//Scaling canvas
let scaleRatio = 1;
let exportRatio = 5;
let myScaledCanvas;
let canvas;
let squareFrame = {
  width: 3840,
  height: 3840
}
let wideFrame = {
  width: 3840,
  height: 2160
}
let tallFrame = {
  width: 2160,
  height: 3840
}

let w = squareFrame.width / exportRatio;
let h = squareFrame.height / exportRatio;
/////

function preload() {
  logoFont = loadFont('Orleans-Thin-Trial.otf');
}

function setup() {
  //createCanvas(800, 800);
  canvas = createCanvas(w, h);;
  canvas.position(20, 20);

  textFont(logoFont);
  textSize(150);
  
  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();
  
  // Create the control Panel.
  createControlPanel();

  //Start mic recording
  mic = new p5.AudioIn();
  mic.start();  
  amp = new p5.Amplitude(smoothing, bins);
  amp.setInput(mic); 
}


function draw() {
  
  /*
  inpText = String(inp.value());
  inpStart = String(inpFontStart.value());
  inpEnd = String(inpFontEnd.value());
  */
  
  BGcolor = BGcolorPicker.value();
  Fcolor = FcolorPicker.value();
  noStroke();
  background(BGcolor);
  fill(Fcolor);
  textAlign(CENTER, CENTER);


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
  
  
  /*
  text('K', 150, 400 - mic.getLevel() * 100);
  text('R', 250, 400 - mic.getLevel() * 2000);
  text('U', 335, 400 - mic.getLevel() * 4000);
  text('S', 450, 400 - mic.getLevel() * 4000);
  text('T', 540, 400 - mic.getLevel() * 2000);
  text('A', 630, 400 - mic.getLevel() * 100);
  */
  
  text('K', 140, 400 - barHeight * 0.3);
  text('R', 250, 400 - barHeight * 0.5);
  text('U', 340, 400 - barHeight * 0.65);
  text('S', 450, 400 - barHeight * 0.65);
  text('T', 540, 400 - barHeight * 0.5);
  text('A', 630, 400 - barHeight * 0.3);
  
  
}

function createControlPanel() {

  /*inp = createInput('It is that special crispy sound');
  inp.position(width + 40, 190);
  inp.size(390,25);  */

  //Canvas size
  createP('Canvas size').position(width + 40, 230);
  selC = createSelect();
  selC.position(width + 40, 265);
  selC.option('Square');
  selC.option('Wide');
  selC.option('Tall');
  selC.selected('Square');
  selC.changed(setCanvasSize);

  createP('Background colour').position(width + 40, 295);
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 330).style('padding','0px').style('width', '70px');
    
  createP('Font colour').position(width + 210, 295);
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 210, 330).style('padding','0px').style('width', '70px');


  createP('Save').position(width + 40, 365);
  buttonPNG = createButton('Export Image');
  buttonPNG.position(width + 210, 400).style('background','white').style('border','1px solid #7a7e82').style('border-radius','2px').style('padding','5px 5px');
  buttonPNG.mousePressed(savePNG);
  checkboxC = createCheckbox('', false); checkboxC.position(width + 88, 413);
  checkboxC.changed(myCheckedEventC); 
}

function savePNG(){
  save("KRUSTAwaveTexture-Variation_");
}


function setCanvasSize() {
  let selCANVAS = selC.value();
  //console.log(selCANVAS);

  if (selCANVAS == 'Square') {
    wS = squareFrame.width / 5;
    hS = squareFrame.height / 5;
    redraw();
    canvas = createCanvas(wS, hS);
    canvas.position(20, 20);
    } 
    else if (selCANVAS == 'Wide') {
    wW = wideFrame.width / 5;
    hW = wideFrame.height / 5;
    redraw();
    canvas = createCanvas(wW, hW);
    canvas.position(20, 20);
    } 
    else if (selCANVAS == 'Tall') {
    wT = tallFrame.width / 5;
    hT = tallFrame.height / 5;
    redraw();
    canvas = createCanvas(wT, hT);
    canvas.position(20, 20);
  }
}

function myCheckedEventC() {
  if (checkboxC.checked() && selC.value() == 'Square') {
    P5Capture.setDefaultOptions({
      width: 3840,
      height: 3840
    });
    console.log('Checking C');
  } else if (checkboxC.checked() && selC.value() == 'Wide') {
    P5Capture.setDefaultOptions({
      width: 3840,
      height: 2160
    });
    console.log('Checking C');
  } else if (checkboxC.checked() && selC.value() == 'Tall') {
    P5Capture.setDefaultOptions({
      width: 2160,
      height: 3840
    });
    console.log('Checking C'); 
  } else {
    console.log('Unchecking');
  }
}

function handleFile(file) {
  //print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}


function myCheckedEvent() {
  if (checkboxC.checked() && selC.value() == 'Square') {
    P5Capture.setDefaultOptions({
      width: 3840,
      height: 3840
    });
  }
}
