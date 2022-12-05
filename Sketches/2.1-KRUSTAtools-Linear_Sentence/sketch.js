let noiseOffset = 1 / 170; //The amount the noise changes for each word (how wiggly it is)
let noiseSize; //The magnitude/size of the noise/wiggles (0 for no noise)
let CountColor = [];
let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];
var offset = 0;
let num = 1;

let scaleRatio = 1;
let exportRatio = 8.5;
let myScaledCanvas;
let canvas;
let a0Paper = {
  width: 9920,
  height: 7016
}

function preload() {
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

  noLoop();
}

function exportHighResolutionPDF() {
  pdf = createPDF();
  pdf.beginRecord();

  scaleRatio = exportRatio;

  // Re-create myScaledCanvas with exportRatio and re-draw
  myScaledCanvas = createGraphics(scaleRatio*width, scaleRatio*height);
  draw();

  // Save as PNG
  pdf.save({ filename: "KRUSTAtype-Variation_" + num });
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
  noiseSize = random (100,1000);
  let words = random (20,30);
  
  myScaledCanvas.noStroke();  
  mySelectCOLOUR();
  mySelectFONTsize();
  mySelectFONT();

  myScaledCanvas.textAlign(CENTER, CENTER);
  
  let inpText = inp.value();

  for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
		myScaledCanvas.text(inpText, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2, word);
	}
  
}

function createControlPanel() {

  inp = createInput('It is that special crispy sound');
  inp.position(width + 40, 190);
  inp.size(390,25);


  createP('Font').position(width + 40, 240);
  selF = createSelect();
  selF.position(width + 40, 275);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);

  createP('Font size').position(width + 185, 240);
  selFS = createSelect();
  selFS.position(width + 185, 275);
  selFS.option('Random');
  selFS.option('Small');
  selFS.option('Big');
  selFS.selected('Random');
  selFS.changed(mySelectFONTsize);

  createP('Colour').position(width + 335, 240);
  selC = createSelect();
  selC.position(width + 335, 275);
  selC.option('Monochrome');
  selC.option('Colour');
  selC.selected('Monochrome');
  selC.changed(mySelectCOLOUR);
  
  createP('Generate new composition').position(width + 40, 315);
  buttonREGENone = createButton('Single');
  buttonREGENone.position(width + 40, 350);
  buttonREGENone.mousePressed(REGENone);

  buttonREGEN = createButton('Array');
  buttonREGEN.position(width + 110, 350);
  buttonREGEN.mousePressed(REGEN);

  buttonPDF = createButton('Export PDF/SVG');
  buttonPDF.position(width + 40, 435);
  buttonPDF.mousePressed(savePDF);

}

function savePDF(){
  exportHighResolutionPDF();
}

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

function mySelectFONTsize() {
  let selFONTsize = selFS.value();
  console.log(selFONTsize);

  if (selFONTsize == 'Random') {
    let fontSize = random (1,80);
    myScaledCanvas.textSize(fontSize);
  } else if (selFONTsize == 'Small') {
    let fontSize = random (5,30);
    myScaledCanvas.textSize(fontSize);
  } else if (selFONTsize == 'Big') {
    let fontSize = random (30,100);
    myScaledCanvas.textSize(fontSize);
  }
}

function mySelectCOLOUR() {
  let selCOLOUR = selC.value();
  console.log(selCOLOUR);

  if (selCOLOUR == 'Monochrome') {
    myScaledCanvas.background('#f0f0f0');
    myScaledCanvas.fill('#000');
  } else if (selCOLOUR == 'Colour') {
    myScaledCanvas.background(random(colors));
    myScaledCanvas.fill(random(colors));
  }
}


function myTXTbox() {
  // Create anchor element.
  var a = document.createElement('a'); 
                  
  // Create the text node for anchor element.
  var link = document.createTextNode("This is link");
  
  // Append the text node to anchor element.
  a.appendChild(link); 
  
  // Set the title.
  a.title = "This is Link"; 
  
  //Set the href property.
  a.href = "./Sketches/2.2-KRUSTAtexture/index.html"; 
  
  // Append the anchor element to the body.
  document.body.prepend(a); 
}