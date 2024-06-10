function setup() {
  // Non creare il canvas finché l'utente non interagisce
}

function startSketch() {
  createCanvas(windowWidth, windowHeight);
  background(200);

  // Nascondi il pulsante di avvio
  let startButton = document.getElementById('startButton');
  startButton.style.display = 'none';
}

function draw() {
  if (typeof windowWidth !== 'undefined') {
    ellipse(mouseX, mouseY, 50, 50);
  }
}

function windowResized() {
  if (typeof windowWidth !== 'undefined') {
    resizeCanvas(windowWidth, windowHeight);
  }
}

function attivaAudio() {
  console.log("Audio attivato");
}

function disattivaAudio() {
  console.log("Audio disattivato");
}

