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

  createP(tracking).position(1095, 194).style('font-size','13px').style('font-family','sans-serif').style('background','white');


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
  lineCount = lineCountSlider.value();
  leading = leadingSlider.value();
  
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  yWaveOffset = yWaveOffsetSlider.value();
  yWaveSpeed = yWaveSpeedSlider.value();
  
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

  for(var j = 0; j<lineCount; j++){
    for(var i = 0; i < inpText.length; i++){
      yWave = sin(frameCount*yWaveSpeed + i*yWaveLength + j*yWaveOffset) * yWaveSize;
      yWavePost = sin(frameCount*yWaveSpeed + (i+1)*yWaveLength + j*yWaveOffset) * yWaveSize;
      let angleAdjust = atan2(yWavePost-yWave,tracking);
    
      myScaledCanvas.fill(Fcolor);
      myScaledCanvas.push();
      myScaledCanvas.translate(i*tracking,j*leading);
      
      myScaledCanvas.translate(0,yWave);
      myScaledCanvas.rotate(angleAdjust);
      // Reposition matrix to place the rotation point of the type in the middle of the X-Height (err... cap height)            
      myScaledCanvas.translate(0,fontHeight/2);
      myScaledCanvas.text(inpText.charAt(i),0,0);
      myScaledCanvas.pop();
    }
  }
  
}


function createControlPanel() {
  createP('Control Panel').position(width + 40, 3).style('font-size','16px').style('font-family','sans-serif').style('text-decoration','underline');

  inp = createInput('It is that special crispy sound');
  inp.position(width + 40, 65);
  inp.size(270,25);  

  ipnAnimStart = createInput('');
  ipnAnimStart.position(width + 370, 205);
  ipnAnimStart.size(30,15);  

  ipnAnimEnd = createInput('');
  ipnAnimEnd.position(width + 420, 205);
  ipnAnimEnd.size(30,15); 

  createP('Presets').position(width + 40, 350).style('font-size','13px').style('font-family','sans-serif');
  MotionOne = createButton('A'); MotionOne.position(width + 40, 385).style('padding','6px').style('border-radius','2px').style('font-size','13px').style('font-family','sans-serif');
  MotionOne.mousePressed(MotionA); 
  //Animation checkboxes
  checkboxW = createCheckbox('', false); checkboxW.position(width + 260, 175).style('padding','6px').style('border-radius','2px')
  checkboxW.changed(myCheckedEvent);
  checkboxT = createCheckbox('', false); checkboxT.position(width + 285, 175).style('padding','6px').style('border-radius','2px')
  checkboxT.changed(myCheckedEvent);
  checkboxCustom = createCheckbox('', false); checkboxCustom.position(width + 360, 175).style('padding','6px').style('border-radius','2px')
  checkboxCustom.changed(myCheckedEvent);
  MotionTwo = createButton('B'); MotionTwo.position(width + 70, 385).style('padding','6px').style('border-radius','2px').style('font-size','13px').style('font-family','sans-serif');
  MotionTwo.mousePressed(MotionB);
  MotionThree = createButton('C'); MotionThree.position(width + 100, 385).style('padding','6px').style('border-radius','2px').style('font-size','13px').style('font-family','sans-serif');
  MotionThree.mousePressed(MotionC);

  createP('Canvas size').position(width + 40, 425).style('font-size','13px').style('font-family','sans-serif');
  selC = createSelect();
  selC.position(width + 40, 460);
  selC.option('Square');
  selC.option('Wide');
  selC.option('Tall');
  selC.selected('Square');
  selC.changed(setCanvasSize);

  checkboxC = createCheckbox('', false); checkboxC.position(width + 255, 376).style('padding','6px').style('border-radius','2px')
  checkboxC.changed(myCheckedEventC);
  
  createP('Font').position(width + 210, 490).style('font-size','13px').style('font-family','sans-serif');
  selF = createSelect();
  selF.position(width + 210, 525);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);
  
  createP('Font colour').position(width + 40, 490).style('font-size','13px').style('font-family','sans-serif');
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 40, 525).style('padding','0px').style('width', '70px');

  createP('Background colour').position(width + 40, 560).style('font-size','13px').style('font-family','sans-serif');
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 595).style('padding','0px').style('width', '70px');
  
  createP('Background image').position(width + 210, 560).style('font-size','13px').style('font-family','sans-serif');
  BGimage = createFileInput(handleFile); BGimage.position(width + 210, 597).style('padding','0px');
  


  //wave
  createP('Font Size').position(width + 210, 115).style('font-size','13px').style('font-family','sans-serif');
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 210, 150);
  fontSizeSlider.style('width','100px');
  
  createP('Tracking').position(width + 210, 170).style('font-size','13px').style('font-family','sans-serif');
  trackingSlider = createSlider(0,100,23,0.01);
  trackingSlider.position(width + 210, 205);
  trackingSlider.style('width','100px');

  createP('Line Count').position(width + 210, 230).style('font-size','13px').style('font-family','sans-serif');
  lineCountSlider = createSlider(0,50,8);
  lineCountSlider.position(width + 210, 265);
  lineCountSlider.style('width','100px');
  
  createP('Leading').position(width + 210, 290).style('font-size','13px').style('font-family','sans-serif');
  leadingSlider = createSlider(0,200,70);
  leadingSlider.position(width + 210, 320);
  leadingSlider.style('width','100px');
  
  createP('Wave Size').position(width + 40, 115).style('font-size','13px').style('font-family','sans-serif');
  yWaveSizeSlider = createSlider(0,100,100);
  yWaveSizeSlider.position(width + 40, 150);
  yWaveSizeSlider.style('width','100px');
  
  createP('Wave Length').position(width + 40, 170).style('font-size','13px').style('font-family','sans-serif');
  yWaveLengthSlider = createSlider(0, PI, 1.2, 0.01);
  yWaveLengthSlider.position(width + 40, 205);
  yWaveLengthSlider.style('width','100px');
  
  createP('Wave Offset').position(width + 40, 230).style('font-size','13px').style('font-family','sans-serif');
  yWaveOffsetSlider = createSlider(0, PI, 3, 0.01);
  yWaveOffsetSlider.position(width + 40, 265);
  yWaveOffsetSlider.style('width','100px');
  
  createP('Wave Speed').position(width + 40, 290).style('font-size','13px').style('font-family','sans-serif');
  yWaveSpeedSlider = createSlider(0, 0.25, 0.01, 0.01);
  yWaveSpeedSlider.position(width + 40, 320);
  yWaveSpeedSlider.style('width','100px');

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