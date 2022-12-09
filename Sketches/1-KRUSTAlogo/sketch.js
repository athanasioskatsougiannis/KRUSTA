let mic;
let amp;
var bins = 16, smoothing = 0.94;

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
  
  //Input text
  inpText = String(inp.value());
  inpStart = String(inpWaveStart.value());
  inpEnd = String(inpWaveEnd.value());
  wave = waveSlider.value();
  createP(wave).position(885, 265).style('background','white');  
  
  fontSize = fontSizeSlider.value();
  BGcolor = BGcolorPicker.value();
  Fcolor = FcolorPicker.value();
  noStroke();


  //Add a custom Background image
  if (img) {
   image(img, 0, 0, width, height);
   //myScaledCanvas.image(img, 0, 0);
  }else {
   //Add Background color
   background(BGcolor);
  }  

  textSize(fontSize);
  fill(Fcolor);
  textAlign(CENTER);


  myCheckedEventWave();
 
  
}

function createControlPanel() {
  
  checkboxText = createCheckbox('', false); checkboxText.position(width + 135, 168);
  checkboxText.changed(myCheckedEventWave);
  inp = createInput('');
  inp.position(width + 40, 190);
  inp.size(390,25);

  inpWaveStart = createInput('');
  inpWaveStart.position(width + 165, 285);
  inpWaveStart.size(27,15);  

  inpWaveEnd = createInput('');
  inpWaveEnd.position(width + 210, 285);
  inpWaveEnd.size(27,15); 


  createP('Custom').position(width + 180, 245);
  checkboxWaveAnimC = createCheckbox('', false); checkboxWaveAnimC.position(width + 160, 258);
  checkboxWaveAnimC.changed(myCheckedEventWave);
  createP('Mic').position(width + 305, 245);
  checkboxWaveAnimM = createCheckbox('', false); checkboxWaveAnimM.position(width + 285, 258);
  checkboxWaveAnimM.changed(myCheckedEventWave);
  

  //Canvas size
  /*createP('Canvas size').position(width + 40, 245);
  selC = createSelect();
  selC.position(width + 40, 280);
  selC.option('Square');
  selC.option('Wide');
  selC.option('Tall');
  selC.selected('Square');
  selC.changed(setCanvasSize);*/


  createP('Wave').position(width + 40, 245);
  waveSlider = createSlider(0,400,90,0.01);
  waveSlider.position(width + 40, 285);
  waveSlider.style('width','68px');
  
  createP('Font colour').position(width + 40, 310);
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 40, 345).style('padding','0px').style('width', '70px');

  createP('Font Size').position(width + 170, 310);
  fontSizeSlider = createSlider(0,180,150);
  fontSizeSlider.position(width + 170, 350);
  fontSizeSlider.style('width','100px');

  createP('BG colour').position(width + 40, 385);
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 420).style('padding','0px').style('width', '70px');
  
  createP('BG image').position(width + 170, 385);
  BGimage = createFileInput(handleFile); BGimage.position(width + 170, 420).style('padding','0px');
    


  createP('Save').position(width + 40, 460);
  buttonPNG = createButton('Export Image');
  buttonPNG.position(width + 210, 495).style('background','white').style('border','1px solid #7a7e82').style('border-radius','2px').style('padding','5px 5px');
  buttonPNG.mousePressed(savePNG);
  checkboxC = createCheckbox('', false); checkboxC.position(width + 88, 508);
  checkboxC.changed(myCheckedEventC); 
}

function savePNG(){
  save("KRUSTAwaveTexture-Variation_");
}


function setCanvasSize() {
  //let selCANVAS = selC.value();
  //console.log(selCANVAS);
  wS = squareFrame.width / 5;
  hS = squareFrame.height / 5;
  redraw();
  canvas = createCanvas(wS, hS);
  canvas.position(20, 20);

  /*if (selCANVAS == 'Square') {
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
  }*/
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

function myCheckedEventWave() {
  if (checkboxWaveAnimM.checked()) {
    checkboxWaveAnimC.checked(false);
    let level = amp.getLevel();
    // adjust map values to taste; actual levels
    // tend to be between 0 and 0.5
    let barHeight = map(level, 0, 0.25, 0, height);
    rect(2, height - barHeight, 3, barHeight);

    text('K', 140, height/2+80 - barHeight * 0.2);
    text('R', 240, height/2+80 - barHeight * 0.4);
    text('U', 343, height/2+80 - barHeight * 0.65);
    text('S', 443, height/2+80 - barHeight * 0.65);
    text('T', 540, height/2+80 - barHeight * 0.4);
    text('A', 630, height/2+80 - barHeight * 0.2);

  } else if (checkboxWaveAnimC.checked()){
    checkboxWaveAnimM.checked(false);

    redraw();
    let t = map(sin(angle),-1,1,inpStart,inpEnd);
    waveSlider.value(t);
    angle += 0.015;

    text('K', 140, height/2+80 - wave * 0.2);
    text('R', 240, height/2+80 - wave * 0.4);
    text('U', 343, height/2+80 - wave * 0.65);
    text('S', 443, height/2+80 - wave * 0.65);
    text('T', 540, height/2+80 - wave * 0.4);
    text('A', 630, height/2+80 - wave * 0.2);
  } else if (checkboxText.checked()) {
    let level = amp.getLevel();
    let barHeight = map(level, 0, 0.25, 0, height);
    rect(2, height - barHeight, 3, barHeight);

    for(var i = 0; i < inpText.length; i++){
      fill(Fcolor);
      push();
      translate(i*85+200, 400+i*(-barHeight));
      text(inpText.charAt(i),0,0);
      pop();
    }
  } else {
    text('K', 140, height/2+80 - wave * 0.2);
    text('R', 240, height/2+80 - wave * 0.4);
    text('U', 343, height/2+80 - wave * 0.65);
    text('S', 443, height/2+80 - wave * 0.65);
    text('T', 540, height/2+80 - wave * 0.4);
    text('A', 630, height/2+80 - wave * 0.2);
  }
}
