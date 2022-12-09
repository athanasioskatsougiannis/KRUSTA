// Full Generator
//////////////////////////////

let inpText;
let fontSize;
let tracking;
let lineCount;
let leading;
let yWave, yWaveSize, yWaveLength, yWaveOffset, yWaveSpeed;
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

function preload() {
  Thin = loadFont('Orleans-Thin-Trial.otf');
  Regular = loadFont('Orleans-Roman-Trial.otf');
  Medium = loadFont('Orleans-Medium-Trial.otf');
}

/*P5Capture.setDefaultOptions({
  width: 3840,
  height: 3840
});*/


function setup() {

  myScaledCanvas = createGraphics(w, h);
  canvas = createCanvas(w, h);
  canvas.position(20, 20);

  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();
  
  // Create the control Panel.
  createControlPanel();
}

function draw() {
  
  // Clear myScaledCanvas each frame
  myScaledCanvas.clear();

  myScaledCanvas.push();
  // Transform (scale) all the drawings
  myScaledCanvas.scale(scaleRatio);
  drawMyDesign();
  myScaledCanvas.pop();

  // Draw myScaledCanvas to canvas
  image(myScaledCanvas, 0, 0);

  createP(yWaveLength).position(1095, 540).style('background','white');


}


//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."
  // Make all the drawing to the myScaledCanvas instead of canvas
    
  inpText = String(inp.value());
  inpStart = String(ipnAnimStart.value()*2);
  inpEnd = String(ipnAnimEnd.value());
    
  fontSize = fontSizeSlider.value();
  tracking = trackingSlider.value();
  lineCount = 1;
  leading = 0;
  
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  
  BGcolor = BGcolorPicker.value();
  Fcolor = FcolorPicker.value();

  
  
  //Add a custom Background image
  if (img) {
    myScaledCanvas.image(img, 0, 0, width, height);
    //myScaledCanvas.image(img, 0, 0);
  }else {
    //Add Background color
    myScaledCanvas.background(BGcolor);
  }
 
  // Figure out the height of text 
  let fontHeight = 7/10 * fontSize;
  
  // Center matrix
  myScaledCanvas.translate(width/2,height/2);
  
  // Reposition matrix depending on width & height of the grid
  myScaledCanvas.translate(-(inpText.length-1)*tracking/2,-(lineCount-1)*leading/2);
  
  myScaledCanvas.noStroke();
  mySelectFONT();
  myScaledCanvas.textSize(fontSize);
  myScaledCanvas.textAlign(CENTER);

  myCheckedEvent();

  //for(var j = 0; j<lineCount; j++){
    for(var i = 0; i < inpText.length; i++){
      yWave = sin(i*yWaveLength) * yWaveSize;
      //yWavePost = sin(frameCount*yWaveSpeed + (i+1)*yWaveLength + 2*yWaveOffset) * yWaveSize;
      //myCheckedRotation(); //If I put the rotation function here there are nice effects
      //let angleAdjust = atan2(yWavePost-yWave,tracking);

      myScaledCanvas.fill(Fcolor);
      myScaledCanvas.push();
      myScaledCanvas.translate(i*tracking,2*leading);
      myScaledCanvas.translate(0,yWave);
      //myCheckedRotation();
      //myScaledCanvas.rotate(angleAdjust*20);
      // Reposition matrix to place the rotation point of the type in the middle of the X-Height (err... cap height)            
      myScaledCanvas.translate(0,fontHeight/2);
      myScaledCanvas.text(inpText.charAt(i),0,0);
      myScaledCanvas.pop();
    }
  //}
  
}


function createControlPanel() {

  inp = createInput('KRUSTA');
  inp.position(width + 40, 190);
  inp.size(390,25);  

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



 
  createP('Background colour').position(width + 40, 295);
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 330).style('padding','0px').style('width', '70px');
   
 
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

  //Letters' rotation feature
  //createP('Rotation').position(width + 370, 370);
  //checkboxR = createCheckbox('', false); checkboxR.position(width + 360, 400).style('padding','6px').style('border-radius','2px');
  //checkboxR.changed(myCheckedRotation);

  //Wave
  //Left column
  createP('Wave Size').position(width + 40, 460);
  yWaveSizeSlider = createSlider(0,350,100);
  yWaveSizeSlider.position(width + 40, 500);
  yWaveSizeSlider.style('width','100px');
   
  createP('Wave Length').position(width + 40, 520);
  yWaveLengthSlider = createSlider(-PI, 0, -0.518, 0.01);
  yWaveLengthSlider.position(width + 40, 560);
  yWaveLengthSlider.style('width','100px');


  //Right column
  createP('Font Size').position(width + 210, 460);
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 210, 500);
  fontSizeSlider.style('width','100px');
  

  createP('Tracking').position(width + 210, 520);
  trackingSlider = createSlider(0,100,23,0.01);
  trackingSlider.position(width + 210, 560);
  trackingSlider.style('width','100px');

  //Animation options
  createP('Wide').position(width + 387, 522);
  checkboxW = createCheckbox('', false); checkboxW.position(width + 360, 530).style('padding','6px').style('border-radius','2px');
  checkboxW.changed(myCheckedEvent);

  createP('Tall').position(width + 457, 522);
  checkboxT = createCheckbox('', false); checkboxT.position(width + 430, 530).style('padding','6px').style('border-radius','2px');
  checkboxT.changed(myCheckedEvent);

  createP('Custom').position(width + 387, 550);
  checkboxCustom = createCheckbox('', false); checkboxCustom.position(width + 360, 557).style('padding','6px').style('border-radius','2px');
  checkboxCustom.changed(myCheckedEvent);  

  ipnAnimStart = createInput('');
  ipnAnimStart.position(width + 440, 562);
  ipnAnimStart.size(30,15);  

  ipnAnimEnd = createInput('');
  ipnAnimEnd.position(width + 490, 562);
  ipnAnimEnd.size(30,15); 
  /////Tracking\\





  createP('Save').position(width + 40, 700);
  checkboxC = createCheckbox('', false); checkboxC.position(width + 88, 747);
  checkboxC.changed(myCheckedEventC);


}


function mySelectFONT() {
  let selFONT = selF.value();
  //console.log(selFONT);

  if (selFONT == 'Thin') {
    myScaledCanvas.textFont(Thin);
  } else if (selFONT == 'Regular') {
    myScaledCanvas.textFont(Regular);
  } else if (selFONT == 'Medium') {
    myScaledCanvas.textFont(Medium);
  }
}

function setCanvasSize() {
  let selCANVAS = selC.value();
  //console.log(selCANVAS);

  if (selCANVAS == 'Square') {
    wS = squareFrame.width / 5;
    hS = squareFrame.height / 5;
    myScaledCanvas.reset();
    myScaledCanvas.redraw();
    myScaledCanvas = createGraphics(wS, hS);
    canvas = createCanvas(wS, hS);

    /*P5Capture.setDefaultOptions({
      width: 3840,
      height: 3840
    });*/

    } 
    else if (selCANVAS == 'Wide') {
    wW = wideFrame.width / 5;
    hW = wideFrame.height / 5;
    myScaledCanvas.reset();
    myScaledCanvas.redraw();
    myScaledCanvas = createGraphics(wW, hW);
    canvas = createCanvas(wW, hW);

    /*P5Capture.setDefaultOptions({
      width: 3840,
      height: 2160
    });*/

    } 
    else if (selCANVAS == 'Tall') {
    wT = tallFrame.width / 5;
    hT = tallFrame.height / 5;
    myScaledCanvas.reset();
    myScaledCanvas.redraw();
    myScaledCanvas = createGraphics(wT, hT);
    canvas = createCanvas(wT, hT);

    /*P5Capture.setDefaultOptions({
      width: 2160,
      height: 3840
    });*/

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

function MotionA() {
  myScaledCanvas.reset();
  if (selC.value() == 'Tall') {
    checkboxW.checked(false);
    checkboxT.checked(true);
  } else { checkboxW.checked(true);  }
	fontSizeSlider.value(17);  lineCountSlider.value(13);
	leadingSlider.value(57); yWaveSizeSlider.value(0);
	yWaveLengthSlider.value(0); yWaveOffsetSlider.value(0); yWaveSpeedSlider.value(0);
  BGcolorPicker.value('#FB5100'); FcolorPicker.value('#222823');
}

function MotionTrackingW() {
  let t = map(sin(angle),-1,1,8,23);
  trackingSlider.value(t);
  angle += 0.03;
  console.log(t);
}

function MotionTrackingT() {
  let t = map(sin(angle),-1,1,8,13);
  trackingSlider.value(t);
  angle += 0.04;
  console.log(t);
}

function MotionTrackingCustom() {
  let t = map(sin(angle),-1,1,inpStart/2,inpEnd);
  trackingSlider.value(t);
  angle += 0.04;
  console.log(t);
}

function myCheckedEvent() {
  if (checkboxW.checked()) {
    MotionTrackingW();
    console.log('Checking W');
  } else if (checkboxT.checked()){
    MotionTrackingT();
    console.log('Checking T');
  } else if (checkboxCustom.checked()){
    MotionTrackingCustom();
    console.log('Checking T'); 
  } else {
    console.log('Unchecking');
  }
}

function MotionB() {
  myScaledCanvas.reset();
	fontSizeSlider.value(27); trackingSlider.value(23); checkboxW.checked(false); checkboxT.checked(false);
  lineCountSlider.value(9); leadingSlider.value(80); yWaveSizeSlider.value(20);
	yWaveLengthSlider.value(PI); yWaveOffsetSlider.value(1); yWaveSpeedSlider.value(0.01);
  BGcolorPicker.value('#BDA88C'); FcolorPicker.value('#4E1F16');
} 

function MotionC() {
  myScaledCanvas.reset();
	fontSizeSlider.value(40); trackingSlider.value(23); checkboxW.checked(false); checkboxT.checked(false);
  lineCountSlider.value(8); leadingSlider.value(70); yWaveSizeSlider.value(150);
	yWaveLengthSlider.value(1.2); yWaveOffsetSlider.value(3); yWaveSpeedSlider.value(0.01);
  BGcolorPicker.value('#222823'); FcolorPicker.value('#BDA88C');
} 

function MotionR() {
  myScaledCanvas.reset();
  BGcolorPicker.value('#FB5100'); FcolorPicker.value('#222823');
}

function myCheckedRotation() {
  if (checkboxR.checked()) {
    let angleAdjust = atan2(yWavePost-yWave,tracking);
    myScaledCanvas.rotate(angleAdjust*20);
  } else {
    myScaledCanvas.rotate(0);
  }
}


//Scaling canvas
///////


////////// BONUS!
////////// Replace the sin() function with this function and you can
////////// organize all the offsets and have access to a slope value
function sinEngine(aCount,aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}