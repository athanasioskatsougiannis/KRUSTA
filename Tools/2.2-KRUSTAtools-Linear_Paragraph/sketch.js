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
  //let words = random (20,30);
  let words = random (1,2);
  


  
  myScaledCanvas.noStroke();  
  mySelectCOLOUR();
  mySelectFONTsize();
  mySelectFONT();
  myScaledCanvas.textAlign(CENTER, TOP);

  //var h = 10;
  var output = '';
  console.log(myTextArea.value());
  let inpText = myTextArea.value();
  let myText = split(inpText, ', ');
  for (let i = 0; i < myText.length; i++) {
    myScaledCanvas.text(myText[i], 50, 60+i*40, width - (random(2,600)), height-100);
    //h += textWidth(myText[i]);
  }
    
}

function createControlPanel() {
  
  //Here is the sketch for the paragraph text
  //myTextArea = createElement('textarea','It is that special crispy sound'); 
  //myTextArea = createElement('textarea', 'Pizza is a dish of Italian origin consisting of a usually round, cheese, tomato, sausage, anchovies, mushrooms, onions, olives, vegetables, meat, ham, then baked at a high temperature, traditionally in a wood-fired oven.');
  myTextArea = createElement('textarea', 'PIZZA  IS    A       DISH, OF ITALIAN ORIGIN, CONSISTING    OF A USUALLY ROUND, CHEESE, TOMATO, SAUSAGE, ANCHOVIES, MUSHROOMS, ONIONS, OLIVES, VEGETABLES, MEAT, HAM, THEN BAKED, AT A HIGH TEMPERATURE, TRADITIONALLY, IN A WOOD-FIRED, OVEN.');
  myTextArea.attribute("rows","30");
  myTextArea.attribute("cols","32");
  myTextArea.position(width + 40, 190);
  myTextArea.size(390,150);
  createP('Hint: <br> <em>Create new line by adding a comma(,) after a word/sentence <br> or add spaces to give more air.</em.').position(width + 40, 345).style('font-size','11.5px').style('line-height','12px');


  createP('Font').position(width + 40, 410);
  selF = createSelect();
  selF.position(width + 40, 445);
  selF.option('Thin');
  selF.option('Regular');
  selF.option('Medium');
  selF.selected('Thin');
  selF.changed(mySelectFONT);

  createP('Font size').position(width + 185, 410);
  selFS = createSelect();
  selFS.position(width + 185, 445);
  selFS.option('Random');
  selFS.option('Small');
  selFS.option('Big');
  selFS.selected('Random');
  selFS.changed(mySelectFONTsize);

  createP('Colour').position(width + 335, 410);
  selC = createSelect();
  selC.position(width + 335, 445);
  selC.option('Monochrome');
  selC.option('Colour');
  selC.selected('Monochrome');
  selC.changed(mySelectCOLOUR);

  createP('Generate new composition').position(width + 40, 485);
  buttonREGENone = createButton('Single');
  buttonREGENone.position(width + 40, 520);
  buttonREGENone.mousePressed(REGENone);

  buttonREGEN = createButton('Array');
  buttonREGEN.position(width + 110, 520);
  buttonREGEN.mousePressed(REGEN);

  buttonPDF = createButton('Export PDF/SVG');
  buttonPDF.position(width + 40, 605);
  buttonPDF.mousePressed(savePDF);


  
}

function savePDF(){
  exportHighResolutionPDF();
}

function REGENone() {
  clear();
  offset += 13451;
  //setup();
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


  