// For() loop - Type - Line
//////////////////////////////

var unitCount;
var rowCount;
var waveSize, waveLength, waveOffset, waveSpeed;
var txt;
var bkgdColor = '#BDA88C';
var foreColor = '#FB5100';
let num = 1;

function preload() {
  //myfont = loadFont('Orleans-Thin-Trial.otf');
  Thin = loadFont('Orleans-Thin-Trial.otf');
  Regular = loadFont('Orleans-Roman-Trial.otf');
  Medium = loadFont('Orleans-Medium-Trial.otf');
}

function setup() {
  createCanvas(windowWidth-300, windowHeight, WEBGL);
  //createCanvas(3000, 3000, WEBGL);
  createControlPanel();

}

function draw() {
  //background('#f0f0f0');
  background('#fff');
  orbitControl();
  
  // Connect the slider values to the wave variables
  txt = inp.value();
  unitCount = txt.length;
  fontSize = fontSizeSlider.value();
  waveSize = waveSizeSlider.value();
  waveLength = waveLengthSlider.value();
  waveOffset = waveOffsetSlider.value();
  waveSpeed = waveSpeedSlider.value();
  rowCount = rowCountSlider.value();
  xSpace = trackingSlider.value();
  
  mySelectFONT();
  textSize(fontSize);
  textAlign(CENTER);
  noStroke();
  fill("#000");

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
        text(txt.charAt(i), 0, 0);
      pop();
    }
  }

}

function createControlPanel() {
  createP('Control Panel').position(width + 40, 3).style('font-size','16px').style('font-family','sans-serif').style('text-decoration','underline');

  //export
  buttonPDF = createButton('Export PNG');
  buttonPDF.position(width + 40, 60);
  buttonPDF.mousePressed(savePNG);

  /*buttonMP4 = createButton('Export MP4');
  buttonMP4.position(width + 145, 60);
  buttonMP4.mousePressed(saveMP4);*/

  inp = createInput('CRUST PIZZA SECRET');
  inp.position(width + 40, 117);
  inp.size(270,25);  

  createP('Select font').position(width + 210, 340).style('font-size','13px').style('font-family','sans-serif');
  selF = createSelect();
  selF.position(width + 210, 380);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);

  //wave
  createP('Font Size').position(width + 40, 165).style('font-size','13px').style('font-family','sans-serif');
  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(width + 40, 200);
  fontSizeSlider.style('width','100px');

  //
  createP('Line Count').position(width + 40, 280).style('font-size','13px').style('font-family','sans-serif');
  rowCountSlider = createSlider(1, 50, 10);
  rowCountSlider.position(width + 40, 315);
  rowCountSlider.style('width','100px');

  
  //
  createP('Wave Size').position(width + 210, 165).style('font-size','13px').style('font-family','sans-serif');
  waveSizeSlider = createSlider(0, 300, 120);
  waveSizeSlider.position(width + 210, 200);
  waveSizeSlider.style('width','100px');

  //
  createP('Tracking').position(width + 40, 220).style('font-size','13px').style('font-family','sans-serif');
  trackingSlider = createSlider(10, 100, 60);
  trackingSlider.position(width + 40, 255);
  trackingSlider.style('width','100px');
  
  //
  createP('Wave Length').position(width + 210, 220).style('font-size','13px').style('font-family','sans-serif');
  waveLengthSlider = createSlider(0, 5, 4.5, 0.01);
  waveLengthSlider.position(width + 210, 255);
  waveLengthSlider.style('width','100px');
  
  //
  createP('Wave Offset').position(width + 210, 280).style('font-size','13px').style('font-family','sans-serif');
  waveOffsetSlider = createSlider(0, 2, 0.5, 0.01);
  waveOffsetSlider.position(width + 210, 315);
  waveOffsetSlider.style('width','100px');
  
  //
  createP('Wave Speed').position(width + 40, 340).style('font-size','13px').style('font-family','sans-serif');
  waveSpeedSlider = createSlider(0, 0.1, 0.03, 0.01);
  waveSpeedSlider.position(width + 40, 375);
  waveSpeedSlider.style('width','100px');

}

function savePNG(){
  //exportHighResolutionPDF();
  save("KRUSTAwaveTexture-Variation_");
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


function keyPressed() {
	if(key == 's' ) save({ filename: "KRUSTAwaveTexture-Variation_" + num });
  num++;;
}

/*function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}*/