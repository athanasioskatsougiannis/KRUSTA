// Full Generator
//////////////////////////////

let inpText;
let fontSize;
let tracking;
let lineCount;
let leading;
let yWave, yWaveSize, yWaveLength, yWaveOffset, yWaveSpeed;
let num = 1;


// Extract files to a folder. Open PowerShell to that folder and use this command:
// ffmpeg -r 60 -f image2 -s 200x200 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
// ffmpeg -i output.mp4 -pix_fmt rgb24 -s 200x200 output4.gif
/*var fps = 60;
var capturer = new CCapture({
  format: 'webm',
  framerate: fps,
  verbose: true
});*/


///////
//Scaling canvas
let scaleRatio = 1;
let exportRatio = 8.5;
let myScaledCanvas;
let canvas;
let a0Paper = {
  width: 9920,
  height: 7016
}

function preload() {
  //myfont = loadFont('Orleans-Thin-Trial.otf');
  Thin = loadFont('Orleans-Thin-Trial.otf');
  Regular = loadFont('Orleans-Roman-Trial.otf');
  Medium = loadFont('Orleans-Medium-Trial.otf');
}

function setup() {
  let w = a0Paper.width / exportRatio;
  let h = a0Paper.height / exportRatio;

  myScaledCanvas = createGraphics(w, h, SVG);
  canvas = createCanvas(w, h, SVG);
  canvas.position(20, 20);

  // Adjust according to screens pixel density.
  exportRatio /= pixelDensity();

  //ccCapture
  //frameRate(fps);
	//capturer.start();

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
}

function exportHighResolutionPDF() {
  pdf = createPDF();
  pdf.beginRecord();

  scaleRatio = exportRatio;

  //translate(width/4,height/2.8); //webgl
  //translate(-(inpText.length-1)*tracking/4,-(lineCount-1)*leading/3); //svg


  // Re-create myScaledCanvas with exportRatio and re-draw
  myScaledCanvas = createGraphics(scaleRatio*width, scaleRatio*height);
  draw();

  // Save as PNG
  //save();
  //save(myScaledCanvas, "KRUSTAlogo-Variation_", '.png');
  pdf.save({ filename: "KRUSTAwaveTexture-Variation_" + num });
  num++;

  // Reset scaleRation back to 1, re-create buffer, re-draw
  scaleRatio = 1;
  myScaledCanvas = createGraphics(width, height);
  
  setup();
  draw();
}

//=================================================================
function drawMyDesign() {
  // Draw your design in this function -- into the scaled canvas.
  // Notice how all drawing functions begin with "myScaledCanvas."
  // Make all the drawing to the myScaledCanvas instead of canvas
    
  inpText = String(inp.value());
    
  fontSize = fontSizeSlider.value();
  tracking = trackingSlider.value();
  lineCount = lineCountSlider.value();
  leading = leadingSlider.value();
  
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  yWaveOffset = yWaveOffsetSlider.value();
  yWaveSpeed = yWaveSpeedSlider.value();
  
  //background('#4E1F16');
  myScaledCanvas.background('#f0f0f0');

  // Figure out the height of text 
  let fontHeight = 7/10 * fontSize;
  
  // Center matrix
  myScaledCanvas.translate(width/2,height/2);
  
  // Reposition matrix depending on width & height of the grid
  myScaledCanvas.translate(-(inpText.length-1)*tracking/2,-(lineCount-1)*leading/2);
  
  myScaledCanvas.noStroke();
  //textFont(myfont);
  mySelectFONT();
  myScaledCanvas.textSize(fontSize);
  myScaledCanvas.textAlign(CENTER);
  
  for(var j = 0; j<lineCount; j++){
    for(var i = 0; i < inpText.length; i++){
      yWave = sin(frameCount*yWaveSpeed + i*yWaveLength + j*yWaveOffset) * yWaveSize;
      yWavePost = sin(frameCount*yWaveSpeed + (i+1)*yWaveLength + j*yWaveOffset) * yWaveSize;
      let angleAdjust = atan2(yWavePost-yWave,tracking);
    
      //fill("#BDA88C");
      myScaledCanvas.fill("#000");
      myScaledCanvas.push();
      myScaledCanvas.translate(i*tracking,j*leading);
      
      myScaledCanvas.translate(0,yWave);
      //ellipse(0,0,5,5);
      myScaledCanvas.rotate(angleAdjust);
      // Reposition matrix to place the rotation point of the type in the middle of the X-Height (err... cap height)            
      myScaledCanvas.translate(0,fontHeight/2);
      myScaledCanvas.text(inpText.charAt(i),0,0);
      myScaledCanvas.pop();
    }
  }
  
}


function createControlPanel() {

  

  inp = createInput('It is that special crispy sound');
  inp.position(width + 40, 190);
  inp.size(390,25);  

  createP('Font').position(width + 370, 240);
  selF = createSelect();
  selF.position(width + 370, 275);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);
  


  //wave
  createP('Wave Size').position(width + 40, 240);
  yWaveSizeSlider = createSlider(0,100,20);
  yWaveSizeSlider.position(width + 40, 285);
  
  createP('Wave Length').position(width + 40, 310);
  yWaveLengthSlider = createSlider(0, PI, 2, 0.01);
  yWaveLengthSlider.position(width + 40, 355);
  
  createP('Wave Offset').position(width + 40, 385);
  yWaveOffsetSlider = createSlider(0, PI, 2.5, 0.01);
  yWaveOffsetSlider.position(width + 40, 425);
  
  createP('Wave Speed').position(width + 40, 455);
  yWaveSpeedSlider = createSlider(0, 0.25, 0.05, 0.01);
  yWaveSpeedSlider.position(width + 40, 495);


  
  createP('Font Size').position(width + 210, 240);
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 210, 285);
  
  createP('Tracking').position(width + 210, 310);
  trackingSlider = createSlider(0,100,23);
  trackingSlider.position(width + 210, 355);

  createP('Line Count').position(width + 210, 385);
  lineCountSlider = createSlider(0,50,9);
  lineCountSlider.position(width + 210, 425);

  createP('Leading').position(width + 210, 455);
  leadingSlider = createSlider(0,200,80);
  leadingSlider.position(width + 210, 495);


  //export
  buttonPDF = createButton('Export PDF/SVG');
  buttonPDF.position(width + 40, 555);
  buttonPDF.mousePressed(savePDF);
}

function savePDF(){
  exportHighResolutionPDF();
}

/*function saveMP4() {
  var startMillis;

  if (startMillis == null) {
    startMillis = millis();
  }
  var duration = 100000;

  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);
  
  if (t > 1) {
    noLoop();
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    return;
  }
	
	// ACTUAL DRAW FUNCTIONS HERE
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
}*/

function REGENone() {
  clear();
  offset += 13451;
	draw();
}

function REGEN() {
  offset += 13451;
	draw();
}

function mySelectFONT() {
  let selFONT = selF.value();
  console.log(selFONT);

  if (selFONT == 'Thin') {
    myScaledCanvas.textFont(Thin);
  } else if (selFONT == 'Regular') {
    myScaledCanvas.textFont(Regular);
  } else if (selFONT == 'Medium') {
    myScaledCanvas.textFont(Medium);
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