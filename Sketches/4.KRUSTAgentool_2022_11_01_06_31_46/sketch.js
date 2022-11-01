// Full Generator
//////////////////////////////

let inpText;
let fontSize;
let tracking;
let lineCount;
let leading;

let img;

let yWave, yWaveSize, yWaveLength, yWaveOffset, yWaveSpeed;

function preload() {
  //fontMenu = loadFont('Orleans-Thin-Trial.otf');
  fontGenerator = loadFont('Orleans-Thin-Trial.otf');
  
    img = loadImage('pasta.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  inp = createInput('It is that special crispy sound');
  inp.position(30,30);

  fontSizeSlider = createSlider(0,100,40);
  fontSizeSlider.position(30,90);
  fontSizeSlider.style('width','100px');
  
  trackingSlider = createSlider(0,100,23);
  trackingSlider.position(30,120);
  trackingSlider.style('width','100px');

  lineCountSlider = createSlider(0,50,9);
  lineCountSlider.position(30,150);
  lineCountSlider.style('width','100px');
  
  leadingSlider = createSlider(0,200,80);
  leadingSlider.position(30,180);
  leadingSlider.style('width','100px');
  
  yWaveSizeSlider = createSlider(0,100,20);
  yWaveSizeSlider.position(30,240);
  yWaveSizeSlider.style('width','100px');
  
  yWaveLengthSlider = createSlider(0, PI, 2, 0.01);
  yWaveLengthSlider.position(30,270);
  yWaveLengthSlider.style('width','100px');
  
  yWaveOffsetSlider = createSlider(0, PI, 2.5, 0.01);
  yWaveOffsetSlider.position(30,300);
  yWaveOffsetSlider.style('width','100px');
  
  yWaveSpeedSlider = createSlider(0, 0.25, 0.05, 0.01);
  yWaveSpeedSlider.position(30,330);
  yWaveSpeedSlider.style('width','100px');
  
}

function draw() {
     
  background('#4E1F16');
  
  var op = map(mouseX, width/2, width, 0, 255)
  tint(255, op);
//  image(img, 0, 0, width, height)
  image(img, 0, 0);

  
  

  inpText = String(inp.value());
  
  textFont('Helvetica');
  textSize(10);
  textAlign(LEFT);
  
  text("Font Size",30,90);
  text("Tracking",30,120);
  text("Line Count",30,150);
  text("Leading",30,180);
  
  text("Y Wave Size",30,240);
  text("Y Wave Length",30,270);
  text("Y Wave Offset",30,300);       
  text("Y Wave Speed",30,330);       

  fontSize = fontSizeSlider.value();
  tracking = trackingSlider.value();
  lineCount = lineCountSlider.value();
  leading = leadingSlider.value();
  
  yWaveSize = yWaveSizeSlider.value();
  yWaveLength = yWaveLengthSlider.value();
  yWaveOffset = yWaveOffsetSlider.value();
  yWaveSpeed = yWaveSpeedSlider.value();
  
  // Figure out the height of text 
  let fontHeight = 7/10 * fontSize;
  
  // Center matrix
  translate(width/2,height/2);
  
  // Reposition matrix depending on width & height of the grid
  translate(-(inpText.length-1)*tracking/2,-(lineCount-1)*leading/2);
  
  noStroke();
  textFont(fontGenerator);
  textSize(fontSize);
  textAlign(CENTER);
  
  for(var j = 0; j<lineCount; j++){
    for(var i = 0; i < inpText.length; i++){
      yWave = sin(frameCount*yWaveSpeed + i*yWaveLength + j*yWaveOffset) * yWaveSize;
      yWavePost = sin(frameCount*yWaveSpeed + (i+1)*yWaveLength + j*yWaveOffset) * yWaveSize;
      let angleAdjust = atan2(yWavePost-yWave,tracking);
    
      fill("#BDA88C");
      push();
        translate(i*tracking,j*leading);
      
        translate(0,yWave);
//        ellipse(0,0,5,5);
        rotate(angleAdjust);
      // Reposition matrix to place the rotation point of the type in the middle of the X-Height (err... cap height)    
        translate(0,fontHeight/2);
        text(inpText.charAt(i),0,0);
      pop();
    }
  }
}


function mousePressed() {
  
}


////////// BONUS!
////////// Replace the sin() function with this function and you can
////////// organize all the offsets and have access to a slope value
function sinEngine(aCount,aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}