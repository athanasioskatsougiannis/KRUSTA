// For() loop - Type - Line
//////////////////////////////

var unitCount;
var rowCount;

var waveSize, waveLength, waveOffset, waveSpeed;

var txt;

var txtSize = 60;

var xSpace = 40;

var bkgdColor = '#BDA88C';
var foreColor = '#FB5100';

function preload() {
  //font1 = loadFont('WorkSans-Regular.ttf');
  font2 = loadFont('Orleans-Medium-Trial.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  txtInput = createInput('CRUST PIZZA SECRET');
  txtInput.position(10,30);
  
  rowCountSlider = createSlider(1, 50, 10);
  rowCountSlider.position(10, 190);
  
  waveSizeSlider = createSlider(0, 300, 120);
  waveSizeSlider.position(10,70);
  waveSizeSlider.style('width','100px');
  
  waveLengthSlider = createSlider(0, 5, 4.5, 0.01);
  waveLengthSlider.position(10,100);
  waveLengthSlider.style('width','100px');
  
  waveOffsetSlider = createSlider(0, 2, 0.5, 0.01);
  waveOffsetSlider.position(10,130);
  waveOffsetSlider.style('width','100px');
  
  waveSpeedSlider = createSlider(0, 0.1, 0.03, 0.01);
  waveSpeedSlider.position(10,160);
  waveSpeedSlider.style('width','100px');
}

function draw() {
  background(bkgdColor);
  orbitControl();
  
  textFont('Helvetica');
  textSize(12);
  textAlign(LEFT);
  
  noStroke();
  fill(foreColor);
  
  push();
    translate(-width/2, -height/2);
    text("Wave Size", 120, 85);    
    text("Wave Length", 120, 115);
    text("Wave Offset", 120, 145);
    text("Wave Speed", 120, 175);    
  pop();
  
  // Connect the slider values to the wave variables
  txt = txtInput.value();

  unitCount = txt.length;
  waveSize = waveSizeSlider.value();
  waveLength = waveLengthSlider.value();
  waveOffset = waveOffsetSlider.value();
  waveSpeed = waveSpeedSlider.value();
  
  rowCount = rowCountSlider.value();
    
  // Reposition  matrix depending on length of the line
  translate( -(unitCount-1) * xSpace/2, -(rowCount-1) * txtSize/2);
  
  textFont(font2);
  textSize(txtSize);
  textAlign(CENTER);
  
  for(var j = 0; j < rowCount; j++){
    for(var i = 0; i < unitCount; i++){
      var waveZ = sin(i * waveLength + j * waveOffset + frameCount * waveSpeed) * waveSize;

      push();
        // position origin along the line
        translate(i*xSpace, j*txtSize);

        // move the origin along the new wave variable
        translate(0, 0, waveZ);  

        // ellipse(0, 0, 4, 4);
        text(txt.charAt(i), 0, 0);
      pop();
    }
  }

}


function keyPressed() {
	
	if(key == 's' ) save();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}