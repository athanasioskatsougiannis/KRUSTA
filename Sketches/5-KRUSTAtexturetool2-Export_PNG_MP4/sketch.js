// For() loop - Type - Line
//////////////////////////////

var unitCount;
var rowCount;
var waveSize, waveLength, waveOffset, waveSpeed;
var txt;
var bkgdColor = '#BDA88C';
var foreColor = '#FB5100';

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
  //inpStart = String(ipnAnimStart.value()*2);
  //inpEnd = String(ipnAnimEnd.value());
    
    
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

  createP(tracking).position(918, 254).style('font-size','13px').style('font-family','sans-serif').style('background','white');

}

function createControlPanel() {
  createP('Control Panel').position(width + 40, 3).style('font-size','16px').style('font-family','sans-serif').style('text-decoration','underline');

  inp = createInput('CRUST PIZZA SECRET');
  inp.position(width + 40, 65);
  inp.size(270,25);  

  createP('Canvas size').position(width + 210, 560).style('font-size','13px').style('font-family','sans-serif');
  selC = createSelect();
  selC.position(width + 210, 597);
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


  //export
  buttonPNG = createButton('Export Image');
  buttonPNG.position(width + 40, 370).style('background','white').style('border','1px solid #7a7e82').style('border-radius','2px').style('padding','5px 5px');
  buttonPNG.mousePressed(savePNG);

  createP('Font colour').position(width + 40, 490).style('font-size','13px').style('font-family','sans-serif');
  FcolorPicker = createColorPicker('#222823'); FcolorPicker.position(width + 40, 525).style('padding','0px').style('width', '70px');

  createP('Background colour').position(width + 40, 560).style('font-size','13px').style('font-family','sans-serif');
  BGcolorPicker = createColorPicker('#FB5100'); BGcolorPicker.position(width + 40, 595).style('padding','0px').style('width', '70px');
  
  //Doesn't work —- Creates nice weird but unexpected results
  //createP('Background image').position(width + 210, 560).style('font-size','13px').style('font-family','sans-serif');
  //BGimage = createFileInput(handleFile); BGimage.position(width + 210, 597).style('padding','0px');
  

  //wave
  createP('Font Size').position(width + 40, 115).style('font-size','13px').style('font-family','sans-serif');
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 40, 150);
  fontSizeSlider.style('width','100px');

  //
  createP('Line Count').position(width + 40, 170).style('font-size','13px').style('font-family','sans-serif');
  rowCountSlider = createSlider(1, 50, 10);
  rowCountSlider.position(width + 40, 205);
  rowCountSlider.style('width','100px');

  
  //
  createP('Wave Size').position(width + 210, 115).style('font-size','13px').style('font-family','sans-serif');
  waveSizeSlider = createSlider(0, 300, 120);
  waveSizeSlider.position(width + 210, 150);
  waveSizeSlider.style('width','100px');

  //
  createP('Tracking').position(width + 40, 230).style('font-size','13px').style('font-family','sans-serif');
  trackingSlider = createSlider(10, 100, 60);
  trackingSlider.position(width + 40, 265);
  trackingSlider.style('width','100px');
  
  //
  createP('Wave Length').position(width + 210, 170).style('font-size','13px').style('font-family','sans-serif');
  waveLengthSlider = createSlider(0, 5, 4.5, 0.01);
  waveLengthSlider.position(width + 210, 205);
  waveLengthSlider.style('width','100px');
  
  //
  createP('Wave Offset').position(width + 210, 230).style('font-size','13px').style('font-family','sans-serif');
  waveOffsetSlider = createSlider(0, 2, 0.5, 0.01);
  waveOffsetSlider.position(width + 210, 265);
  waveOffsetSlider.style('width','100px');
  
  //
  createP('Wave Speed').position(width + 210, 290).style('font-size','13px').style('font-family','sans-serif');
  waveSpeedSlider = createSlider(0, 0.1, 0.03, 0.01);
  waveSpeedSlider.position(width + 210, 320);
  waveSpeedSlider.style('width','100px');

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

