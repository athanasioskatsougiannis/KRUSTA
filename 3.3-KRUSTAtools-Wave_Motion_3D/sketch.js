// For() loop - Type - Line
//////////////////////////////


let inpText;
let fontSize;
let tracking;
let lineCount;
let leading;
var unitCount;
var rowCount;
var waveSize, waveLength, waveOffset, waveSpeed;

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
  //createCanvas(windowWidth-300, windowHeight, WEBGL);
  canvas = createCanvas(w, h, WEBGL);;
  canvas.position(20, 20);

  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();
  
  // Create the control Panel.
  createControlPanel();

}

function draw() {
  inpText = String(inp.value());
  inpStart = String(ipnAnimStart.value()*2);
  inpEnd = String(ipnAnimEnd.value());
    
    
  BGcolor = BGcolorPicker.value();
  Fcolor = FcolorPicker.value();

  //Add a custom Background image
  if (img) {
    //Doesn't work —- Creates nice weird but unexpected results
    //image(img,-width,-height)
  }else {
    //Add Background color
    background(BGcolor);
  }

  //background('#fff');
  orbitControl();
  
  // Connect the slider values to the wave variables
  unitCount = inpText.length;
  fontSize = fontSizeSlider.value();
  tracking = trackingSlider.value();
  waveSize = waveSizeSlider.value();
  waveLength = waveLengthSlider.value();
  waveOffset = waveOffsetSlider.value();
  waveSpeed = waveSpeedSlider.value();
  rowCount = rowCountSlider.value();
  xSpace = trackingSlider.value();  
  
  
  // Center matrix
  //translate(width/2,height/2);
  
  // Reposition matrix depending on width & height of the grid
  //translate(-(inpText.length-1)*tracking/2,-(lineCount-1)*leading/2);
  
  noStroke();
  mySelectFONT();
  textSize(fontSize);
  textAlign(CENTER);

  fill(Fcolor);


  // Reposition  matrix depending on length of the line
  translate( -(unitCount-1) * xSpace/2, -(rowCount-1) * fontSize/2);

  
  for(var j = 0; j < rowCount; j++){
    for(var i = 0; i < unitCount; i++){
      var waveZ = sin(i * waveLength + j * waveOffset + frameCount * waveSpeed) * waveSize;

      push();
        // position origin along the line
        translate(i*xSpace, j*fontSize);

        // move the origin along the new wave variable
        translate(0, 0, waveZ);  

        // ellipse(0, 0, 4, 4);
        text(inpText.charAt(i), 0, 0);
        pop();
    }
  }

  createP(tracking).position(1090, 510).style('background','white');
  createP(waveSize).position(917, 390).style('background','white');
  myCheckedEvent();
  myCheckedEventWS();

}

function createControlPanel() {

  inp = createInput('CRUST PIZZA SECRET');
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

  createP('Font').position(width + 210, 230);
  selF = createSelect();
  selF.position(width + 210, 265);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);

  createP('Background colour').position(width + 40, 295);
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 330).style('padding','0px').style('width', '70px');
   
  //Doesn't work —- Creates nice weird but unexpected results
  //createP('Background image').position(width + 210, 295);
  //BGimage = createFileInput(handleFile); BGimage.position(width + 210, 335).style('padding','0px');
  
  createP('Font colour').position(width + 210, 295);
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 210, 330).style('padding','0px').style('width', '70px');
 


  

  //Wave
  //Left column
  //
  createP('Wave Size').position(width + 40, 370);
  waveSizeSlider = createSlider(0, 300, 120);
  waveSizeSlider.position(width + 40, 410);

  checkboxWSize = createCheckbox('', false); checkboxWSize.position(width + 140, 378).style('padding','6px').style('border-radius','2px')
  checkboxWSize.changed(myCheckedEventWS);

  //
  createP('Wave Length').position(width + 40, 430);
  waveLengthSlider = createSlider(0, 5, 4.5, 0.01);
  waveLengthSlider.position(width + 40, 470);
  
  //
  createP('Wave Offset').position(width + 40, 490);
  waveOffsetSlider = createSlider(0, 2, 0.5, 0.01);
  waveOffsetSlider.position(width + 40, 530);
  
  //
  createP('Wave Speed').position(width + 40, 550);
  waveSpeedSlider = createSlider(0, 0.1, 0.03, 0.01);
  waveSpeedSlider.position(width + 40, 590);


  //
  createP('Font Size').position(width + 210, 370);
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 210, 410);

  //
  createP('Line Count').position(width + 210, 430);
  rowCountSlider = createSlider(1, 50, 10);
  rowCountSlider.position(width + 210, 470);

  //
  createP('Tracking').position(width + 210, 490);
  trackingSlider = createSlider(10, 100, 60);
  trackingSlider.position(width + 210, 530);

  //Animation options
  createP('Wide').position(width + 387, 492);
  checkboxW = createCheckbox('', false); checkboxW.position(width + 360, 500).style('padding','6px').style('border-radius','2px')
  checkboxW.changed(myCheckedEvent);

  createP('Tall').position(width + 457, 492);
  checkboxT = createCheckbox('', false); checkboxT.position(width + 430, 500).style('padding','6px').style('border-radius','2px')
  checkboxT.changed(myCheckedEvent);

  createP('Custom').position(width + 387, 520);
  checkboxCustom = createCheckbox('', false); checkboxCustom.position(width + 360, 527).style('padding','6px').style('border-radius','2px')
  checkboxCustom.changed(myCheckedEvent);  

  ipnAnimStart = createInput('');
  ipnAnimStart.position(width + 440, 532);
  ipnAnimStart.size(30,15);  

  ipnAnimEnd = createInput('');
  ipnAnimEnd.position(width + 490, 532);
  ipnAnimEnd.size(30,15); 
  /////Tracking\\

  
  
  
  //export
  createP('Save').position(width + 40, 620);
  buttonPNG = createButton('Export Image');
  buttonPNG.position(width + 210, 660).style('background','white').style('border','1px solid #7a7e82').style('border-radius','2px').style('padding','5px 5px');
  buttonPNG.mousePressed(savePNG);
  checkboxC = createCheckbox('', false); checkboxC.position(width + 88, 672);
  checkboxC.changed(myCheckedEventC);

  
}

function savePNG(){
  save("KRUSTAwaveTexture-Variation_");
}


function mySelectFONT() {
  let selFONT = selF.value();
  console.log(selFONT);

  if (selFONT == 'Thin') {
    textFont(Thin);
  } else if (selFONT == 'Regular') {
    textFont(Regular);
  } else if (selFONT == 'Medium') {
    textFont(Medium);
  }
}


function setCanvasSize() {
  let selCANVAS = selC.value();
  //console.log(selCANVAS);

  if (selCANVAS == 'Square') {
    wS = squareFrame.width / 5;
    hS = squareFrame.height / 5;
    setup();
    redraw();
    canvas = createCanvas(wS, hS, WEBGL);
    canvas.position(20, 20);

    } 
    else if (selCANVAS == 'Wide') {
    wW = wideFrame.width / 5;
    hW = wideFrame.height / 5;
    redraw();
    canvas = createCanvas(wW, hW, WEBGL);
    canvas.position(20, 20);

    } 
    else if (selCANVAS == 'Tall') {
    wT = tallFrame.width / 5;
    hT = tallFrame.height / 5;
    redraw();
    canvas = createCanvas(wT, hT, WEBGL);
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

function MotionTrackingW() {
  let t = map(sin(angle),-1,1,8,23);
  trackingSlider.value(t);
  angle += 0.02;
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

function myCheckedEventWS() {
  if (checkboxWSize.checked()) {
    let t = map(sin(angle),-1,1,0,300);
    waveSizeSlider.value(t);
    angle += 0.05;
    //console.log(t);
  }
}

function myCheckedEvent() {
  if (checkboxW.checked()) {
    MotionTrackingW();
    //console.log('Checking W');
  } else if (checkboxT.checked()){
    MotionTrackingT();
    //console.log('Checking T');
  } else if (checkboxCustom.checked()){
    MotionTrackingCustom();
    //console.log('Checking T'); 
  } else {
    //console.log('Unchecking');
  }
}

/*     
//Doesn't work —- Creates nice weird but unexpected results
function handleFile(file) {
  //print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
*/

