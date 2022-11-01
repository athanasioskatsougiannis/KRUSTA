let mic;
//let words = 20; //The number of words -- including the last one
//let words;
//let fontSize = 50; //The size of the text
let word1 = "It is that special crispy sound"; //The first word
let word2 = "when we bite into the first slice"; //The second word
let Rtext = ["It is that special crispy sound", "when we bite into the first slice", "CRUST PIZZA SECRET", "Red sauce, & pomodoro, & marinara, & gravy"]; //The first word
let noiseOffset = 1 / 170; //The amount the noise changes for each word (how wiggly it is)
let noiseSize; //The magnitude/size of the noise/wiggles (0 for no noise)

let CountColor = [];
let colors = ['#4E1F16', '#FB5100', '#BDA88C', '#222823'];
//let colorsTXT = ['#53C9AD', '#8243D9', '#4955C1', '#EDA05A', '#F4647A'];


var offset = 0;

function preload() {
  myfont = loadFont('Orleans-Thin-Trial.otf');
}

function setup() {
  createCanvas(800, 800);

  //Open mic
  //mic = new p5.AudioIn();
  //mic.start();
  
  noiseSize = random (100,1000);
  let fontSize = random (1,80);
  let words = random (20,30);
  
  
  /*for (let i = 0; i < 2; i++) {
    CountColor[i] = int(random(4));
      console.log(CountColor[i]);

    background(colors[2]);
    fill(colors[4]);
  }*/

  background(random(colors));
  fill(random(colors));  
  


  textSize(fontSize);
  textAlign(CENTER, CENTER);
  textFont(myfont);
  
  TextR = random(Rtext);
  
  for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
		text(TextR, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2, word);
	}
  
  /*for (let word = height / (words + 1); word < height - height / (words + 1) - 0.01; word += height / (words + 1)) {
		text(word1, map(noise(offset,word * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2, word);
	}

	text(word2, map(noise(offset,(height - height / (words + 1)) * noiseOffset), 0, 1, -noiseSize, noiseSize) + width / 2 + (textWidth(word1) - textWidth(word2)) / 2, height - height / (words + 1));  
*/
}

function draw() {
  //background(255);
  //textSize(10 + mic.getLevel() * 1000);
  
  //words = (10  + mic.getLevel() * 2000);
  
  
  
}


function keyPressed() {
	if (key == ' '){
		offset += 13451;
		setup();
	}
	if(key == 's' ) save();
}


