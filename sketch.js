let sound;
let fft;
let sketch = 0
let drawFirst = true

function mouseClicked(){
if(sketch == 0){sketch = 1} else {sketch = 0}}

function preload() {
  my = loadSound("traccia1.mp3");
  ja = loadSound("traccia2.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  my.loop();
  ja.loop();
  angleMode(DEGREES);
  cursor(CROSS)

}

function draw() {
  if (drawFirst) {
    draw1();
    my.setVolume(1)
    ja.setVolume(0.3)
  } else {
    draw2();
    my.setVolume(0.3)
    ja.setVolume(1)
  }
}


function draw2() {
  background(0);
  let spectrum = fft.analyze();
  let bassEnergy = fft.getEnergy("bass");
  let midEnergy = fft.getEnergy("mid");
  strokeWeight(2);

  translate(width / 2, height / 2);
  
   noStroke()
  stroke(bassEnergy%255)
  circle(0, 0, 300)
  
  stroke(bassEnergy*0.5%255)
  circle(0, 0, 330)
  
  stroke(bassEnergy*0.2%255)
  circle(0, 0, 370)
  noFill();

  for (let i = 0; i < 360; i += 30) {
    beginShape();
    for (let j = 0; j < spectrum.length; j++) {
      let r = map(spectrum[j], 90, 255, 90, 1);
      let x = r * cos(i + j);
      let y = r * sin(i + j);
      stroke(255);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
      rotate(frameCount/10)
  for (let i = 0; i < spectrum.length; i++) {
    let lev = spectrum[i];
    let r = map(lev, 1000, 255, 100, 200-bassEnergy/20);
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(lev*2);
    ellipse(x, y, 5, 5);
  }
      rotate(-frameCount/5)
    for (let i = 0; i < spectrum.length; i++) {
    let lev = spectrum[i];
    let r = map(lev, 1000, 255, 100, 230-bassEnergy/50)
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(lev*1.5);
    ellipse(x, y, 5, 5);
  }
      rotate(frameCount/7)
    for (let i = 0; i < spectrum.length; i++) {
    let lev = spectrum[i];
    let r = map(lev, 1000, 255, 100, 260)
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(lev);
    ellipse(x, y, 5, 5);
  }
        rotate(-frameCount/12)
    for (let i = 0; i < spectrum.length; i++) {
    let lev = spectrum[i];
    let r = map(lev, 1000, 255, 100, 290)
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(lev*0.5);
    ellipse(x, y, 5, 5);
  }

}



function draw1() {
  let spettro = fft.analyze();

  // Determine the part of the sound
  let lowFreqEnergy = fft.getEnergy("bass");
  let midFreqEnergy = fft.getEnergy("mid");
  let highFreqEnergy = fft.getEnergy("treble");
  
  let soundPart = "default";
  
  if (lowFreqEnergy > midFreqEnergy && lowFreqEnergy > highFreqEnergy) {
    soundPart = "bum";
  } else if (midFreqEnergy > lowFreqEnergy && midFreqEnergy > highFreqEnergy) {
    soundPart = "bumcha";
  } else if (highFreqEnergy = lowFreqEnergy && highFreqEnergy > midFreqEnergy) {
    soundPart = "cha";
  }

  // Change background color based on sound part
  if (soundPart == "bum") {
    background(32, 32, 0); // dark red
  } else if (soundPart == "bumcha") {
    background(192, 155, 240); // violet
  } else if (soundPart == "cha") {
    background(120, 210, 250); // light blue
  } else {
    background(0); // default black
  }

  noFill();
  strokeWeight(2);

  translate(width / 2, height / 2);

  for (let i = 0; i < 360; i += 40) {
    beginShape();
    for (let j = 0; j < spettro.length; j++) {
      let r = map(spettro[j], 80, 255, 200, 40);
      let x = r * cos(i + j);
      let y = r * sin(i + j);
      stroke(255);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  rotate(frameCount);
  for (let i = 0; i < spettro.length; i++) {
    let ampiezza = spettro[i];
    let r = map(ampiezza, 1000, 155, 100, 300);
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(map(ampiezza, 0, 255, 0, 255), 100, 255);
    ellipse(x, y, 5, 5);
  }

  rotate(frameCount / 2);
  for (let i = 0; i < spettro.length; i++) {
    let ampiezza = spettro[i];
    let r = map(ampiezza, 2000, 1000, 200, 300);
    let x = r * cos(i * 10);
    let y = r * sin(i * 10);
    stroke(map(ampiezza, 0, 255, 0, 255), 100, 255);
    ellipse(x, y, 5, 5);
  }

  rotate(frameCount * 3);
  for (let i = 0; i < spettro.length; i++) {
    let ampiezza = spettro[i];
    let r = map(ampiezza, 2000, 1100, 1000, 300);
    let x = r * cos(i * 30);
    let y = r * sin(i * 30);
    stroke(map(ampiezza, 0, 25, 0, 255), 8000, 255);
    ellipse(x, y, 10, 10);
  }
}

function mousePressed() {
  drawFirst = !drawFirst;
}