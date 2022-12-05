let mic;
let angle1 = 0;


//let words = 20; //The number of words -- including the last one
let noiseOffset = 1 / 170; //The amount the noise changes for each word (how wiggly it is)
let noiseSize; //The magnitude/size of the noise/wiggles (0 for no noise)
var offset = 0;

//let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];

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
  Thin = loadFont('Orleans-Thin-Trial.otf');
  Regular = loadFont('Orleans-Roman-Trial.otf');
  Medium = loadFont('Orleans-Medium-Trial.otf');
}

function setup() {
  //createCanvas(800, 800);
  canvas = createCanvas(w, h);;
  canvas.position(20, 20);

  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();
  
  // Create the control Panel.
  createControlPanel();

  //Start mic recording
  mic = new p5.AudioIn();
  mic.start();  
}

function draw() {

  inpText = String(inp.value());
  inpStart = String(inpFontStart.value());
  inpEnd = String(inpFontEnd.value());

  inpStartL = String(inpLinesStart.value());
  inpEndL = String(inpLinesEnd.value());

  inpStartO = String(inpOffsetStart.value());
  inpEndO = String(inpOffsetEnd.value());
    
  fontSize = fontSizeSlider.value();
  linesNum = lineCountSlider.value();
  noiseSize = offsetSlider.value();

  
  MICorNOT();
  myCheckedEventFont();
  createP(fontSize).position(925, 480).style('background','white');
  myCheckedEventLines();
  createP(linesNum).position(925, 560).style('background','white');
  myCheckedEventOffset();
  createP(noiseSize).position(925, 640).style('background','white');

  BGcolor = BGcolorPicker.value();
  Fcolor = FcolorPicker.value();

  //Add a custom Background image
  if (img) {
    image(img, 0, 0, width, height);
  }else {
    //Add Background color
    background(BGcolor);
  }

  fill(Fcolor);

  mySelectFONT();
  textAlign(CENTER, CENTER);

  
  //Audio or Not
  //textSize(1 + mic.getLevel() * 500);
  //textSize(fontSize);
  //let words = (2  + mic.getLevel() * 500);
  //let words = (linesNum);

  for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
    text(inpText, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2 , word);
  }
  
  angle1 += 2;
}





function createControlPanel() {

  inp = createInput('It is that special crispy sound');
  inp.position(width + 40, 190);
  inp.size(390,25);  
  //inp = document.getElementById(inpFrame);

  //Canvas size
  createP('Canvas size').position(width + 40, 230);
  selC = createSelect();
  selC.position(width + 40, 265);
  selC.option('Square');
  selC.option('Wide');
  selC.option('Tall');
  selC.selected('Square');
  selC.changed(setCanvasSize);


  //Presets
  createP('Presets').position(width + 210, 230);

  MotionReset = createButton('Reset'); MotionReset.position(width + 210, 265);
  MotionReset.mousePressed(MotionR);

  MotionOne = createButton('A'); MotionOne.position(width + 270, 265);
  MotionOne.mousePressed(MotionA);

  MotionTwo = createButton('B'); MotionTwo.position(width + 300, 265);
  MotionTwo.mousePressed(MotionB);

  MotionThree = createButton('C'); MotionThree.position(width + 330, 265);
  MotionThree.mousePressed(MotionC);


  //////Mic\\
  createP('Mic').position(width + 402, 230);
  createP('Yes').position(width + 420, 253);
  MicYesButton = createCheckbox('', false); MicYesButton.position(width + 397, 265);
  MicYesButton.changed(MICorNOT);
  //MicYesButton = createButton('Yes'); MicYesButton.position(width + 402, 265);
  //MicYesButton.mousePressed(MICorNOT);
  //////Mic\\

  createP('Background colour').position(width + 40, 295);
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 330).style('padding','0px').style('width', '70px');
  
  createP('Background image').position(width + 210, 295);
  BGimage = createFileInput(handleFile); BGimage.position(width + 210, 335).style('padding','0px');
  
  createP('Font colour').position(width + 40, 370);
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 40, 410).style('padding','0px').style('width', '70px');

  createP('Font').position(width + 210, 370);
  selF = createSelect();
  selF.position(width + 210, 410);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);

  
  /////Font size\\
  createP('Font Size').position(width + 40, 460);
  fontSizeSlider = createSlider(0,100,40,0.01);
  fontSizeSlider.position(width + 40, 500);

  //Animation options
  createP('Custom').position(width + 230, 481);
  checkboxFontAnimP = createCheckbox('', false); checkboxFontAnimP.position(-100, 0);
  checkboxFontAnimP.changed(myCheckedEventFont);
  checkboxFontAnimC = createCheckbox('', false); checkboxFontAnimC.position(width + 210, 494);
  checkboxFontAnimC.changed(myCheckedEventFont);

  inpFontStart = createInput('');
  inpFontStart.position(width + 290, 493);
  inpFontStart.size(30,15);  

  inpFontEnd = createInput('');
  inpFontEnd.position(width + 340, 493);
  inpFontEnd.size(30,15); 
  /////Font size\\

  //Lines number\\
  createP('Lines Number').position(width + 40, 541);
  lineCountSlider = createSlider(0,150,30);
  lineCountSlider.position(width + 40, 580);

  //Animation options
  createP('Custom').position(width + 230, 560);
  checkboxLinesAnimP = createCheckbox('', false); checkboxLinesAnimP.position(-100, 0);
  checkboxLinesAnimP.changed(myCheckedEventLines);
  checkboxLinesAnimC = createCheckbox('', false); checkboxLinesAnimC.position(width + 210, 574);
  checkboxLinesAnimC.changed(myCheckedEventLines);

  inpLinesStart = createInput('');
  inpLinesStart.position(width + 290, 573);
  inpLinesStart.size(30,15);  

  inpLinesEnd = createInput('');
  inpLinesEnd.position(width + 340, 573);
  inpLinesEnd.size(30,15);   
  //Lines number\\

  //Offset\\
  createP('Offset').position(width + 40, 620);
  offsetSlider = createSlider(0,10000,160,0.1);
  offsetSlider.position(width + 40, 660);

  buttonREGENone = createButton('Regenerate').style('font-size','9px').style('padding','1px 4px');
  buttonREGENone.position(width + 85, 635);
  buttonREGENone.mousePressed(REGENone);

  //Animation options
  createP('Custom').position(width + 230, 640);
  checkboxOffsetAnimP = createCheckbox('', false); checkboxOffsetAnimP.position(-100, 0);
  checkboxOffsetAnimP.changed(myCheckedEventOffset);
  checkboxOffsetAnimC = createCheckbox('', false); checkboxOffsetAnimC.position(width + 210, 653);
  checkboxOffsetAnimC.changed(myCheckedEventOffset);

  inpOffsetStart = createInput('');
  inpOffsetStart.position(width + 290, 652);
  inpOffsetStart.size(30,15);  

  inpOffsetEnd = createInput('');
  inpOffsetEnd.position(width + 340, 652);
  inpOffsetEnd.size(30,15); 
  //Offset\\

  createP('Save').position(width + 40, 700);
  checkboxC = createCheckbox('', false); checkboxC.position(width + 88, 747);
  checkboxC.changed(myCheckedEventC);

  
}

function MICorNOT() {
  if (MicYesButton.checked()) {
    textSize(1 + mic.getLevel() * 800);
    words = (2  + mic.getLevel() * 500);
  }  else { 
    textSize(fontSize);
    words = (linesNum);
  }
}


function myCheckedEventFont() {
  if (checkboxFontAnimP.checked()) {
    let t = map(sin(angle),-1,1,0,100);
    fontSizeSlider.value(t);
    angle += 0.04;
    //console.log(t);
  } else if (checkboxFontAnimC.checked()){
    let t = map(sin(angle),-1,1,inpStart,inpEnd);
    fontSizeSlider.value(t);
    angle += 0.04;
    //console.log(t);
  }
}

function myCheckedEventLines() {
  if (checkboxLinesAnimP.checked()) { 
    let t = map(sin(angle),-1,1,1,100);
    lineCountSlider.value(t);
    angle += 0.01;
    //console.log(t);
  } else if (checkboxLinesAnimC.checked()){
    let t = map(sin(angle),-1,1,inpStartL,inpEndL);
    lineCountSlider.value(t);
    angle += 0.04;
    //console.log(t);
  }
}

function myCheckedEventOffset() {

  if (checkboxOffsetAnimP.checked()) { 
    let t = map(sin(angle),-1,1,30,1000);
    offsetSlider.value(t);
    angle += 0.02;
    //console.log(t);
  } else if (checkboxOffsetAnimC.checked()){
    let t = map(sin(angle),-1,1,inpStartO,inpEndO);
    offsetSlider.value(t);
    angle += 0.04;
    //console.log(t);
  }
}


function MotionA() {
  fontSizeSlider.value(50);
  checkboxFontAnimP.checked(false);
  checkboxLinesAnimP.checked(true);
  checkboxOffsetAnimP.checked(true);

  BGcolorPicker.value('#FB5100'); FcolorPicker.value('#222823');

}

function MotionB() {
  checkboxFontAnimP.checked(true);
  checkboxLinesAnimP.checked(false);
  checkboxOffsetAnimP.checked(true);
  BGcolorPicker.value('#BDA88C'); FcolorPicker.value('#4E1F16');
}

function MotionC() {
  fontSizeSlider.value(15);
  checkboxFontAnimP.checked(false);
  checkboxLinesAnimP.checked(true);
  checkboxOffsetAnimP.checked(true);
  BGcolorPicker.value('#222823'); FcolorPicker.value('#BDA88C');
}

function MotionR() {
  fontSizeSlider.value(20);
  offsetSlider.value(2000);
  checkboxFontAnimP.checked(false);
  checkboxLinesAnimP.checked(false);
  checkboxOffsetAnimP.checked(false);

  BGcolorPicker.value('#FB5100'); FcolorPicker.value('#222823');
}

function mySelectFONT() {
  let selFONT = selF.value();
  //console.log(selFONT);

  if (selFONT == 'Thin') {
    textFont(Thin);
  } else if (selFONT == 'Regular') {
    textFont(Regular);
  } else if (selFONT == 'Medium') {
    textFont(Medium);
  }
}

function REGENone() {
  clear();
  offset += 13451;
  //setup();
	draw();
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