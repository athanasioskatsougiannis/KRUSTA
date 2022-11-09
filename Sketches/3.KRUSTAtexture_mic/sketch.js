let mic;

let angle1 = 0;


//let words = 20; //The number of words -- including the last one
//let words;
//let fontSize = 50; //The size of the text
let word1 = "It is that special crispy sound"; //The first word
let word2 = "when we bite into the first slice"; //The second word
let Rtext = ["It is that special crispy sound", "when we bite into the first slice", "CRUST PIZZA SECRET", "Red sauce, & pomodoro, & marinara, & gravy"]; //The first word
let noiseOffset = 1 / 170; //The amount the noise changes for each word (how wiggly it is)
let noiseSize; //The magnitude/size of the noise/wiggles (0 for no noise)

let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];
//let colorsTXT = ['#53C9AD', '#8243D9', '#4955C1', '#EDA05A', '#F4647A'];


var offset = 0;

function preload() {
  myfont = loadFont('Orleans-Thin-Trial.otf');
}

function setup() {
  createCanvas(800, 800);
  
  

  mic = new p5.AudioIn();
  mic.start();
  
  noiseSize = random (100,1000);
  //let fontSize = random (0,200);
  //let words = random (1,5);

  //background(255);
  //fill(0);
  background(random(colors));
  fill(random(colors));  
  

  //textSize(fontSize);
  textAlign(CENTER, CENTER);
  textFont(myfont);
  
  TextR = random(Rtext);
  

  
  /*for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
		text(word1, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2, word);
	}

	text(word2, map(noise(offset,(height - height / (words + 1)) * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2 + (textWidth(word1) - textWidth(word2)) / 2, height - height / (words + 1));  
*/
}

function draw() {
  background(255);
    
  let ang1 = radians(angle1);
  let x1 = width / 2 + 10 * cos(ang1);
  
  textSize(1 + mic.getLevel() * 500);
  
  words = (2  + mic.getLevel() * 500);
    for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
		text(TextR, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2 , word);
	}
  
  //+ x1
    angle1 += 2;

  
}


function keyPressed() {
	if (key == ' '){
		offset += 13451;
		setup();
	}
	if(key == 's' ) save();
}


