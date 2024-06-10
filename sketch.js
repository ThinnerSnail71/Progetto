// Questo codice può essere totalmente sostituito con
// un codice già pronto o può essere usato come base
// per uno sketch che cambia visualizzazione in relazione
// alle parti del brano audio definite con addCue().
//
// Per maggiori informazioni:
// https://codesthesia.net/brera/cg/laboratorio/progetto/
//
// Crediti musicali:
// https://freemusicarchive.org/music/Bauchamp/Loop_Mania_Sampler_Pack/130_od_beat


let sound;
let soundPart;  // parte corrente dell'audio
let fft;
let centro;


function preload() {
  sound = loadSound("NOMEAUDIO.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  fft = new p5.FFT();

  sound.addCue(0.01, cueReached, "bum");   // parte "bum" all'inizio (0.0 sembra far perdere la notifica al riavvio)
  sound.addCue(4.2, cueReached, "bumcha"); // parte "bumcha" a partire dal secondo 4,2
  sound.addCue(7.8, cueReached, "cha");    // parte "cha" a partire dal secondo 7,8

  sound.playMode("restart"); // evita sovrapposizioni audio
  sound.setVolume(0.5); // solo per non spaventare la nonna
  sound.loop(); // audio che parte subito

  setupResizable();
}

function cueReached(val) {
  soundPart = val;
}

function setupResizable() {
  centro = createVector(width/2, height/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupResizable();
}


function draw() {
  
  fft.analyze();  // analizza frequenze (per getEnergy())
  
  // sfondo (in base alla parte dell'audio)
  if (soundPart == "bum") {
    background(192, 32, 0); // rosso scuro
  } else if (soundPart == "bumcha") {
    background(192, 155, 240); // violetto
  } else if (soundPart == "cha") {
    background(120, 210, 250); // azzurro
  }

  // cerchio spesso (se parte dell'audio è "bum" o "bumcha")
  if (soundPart == "bum" || soundPart == "bumcha") {
    let eBass = fft.getEnergy("bass");
    let diamBass = map(eBass, 0, 255, 0, 400);
    strokeWeight(12);
    stroke(0);
    circle(centro.x, centro.y, diamBass);
  }

  // cerchio sottile (se parte dell'audio è "bumcha" o "cha")
  if (soundPart == "bumcha" || soundPart == "cha") {
    let eTreble = fft.getEnergy("treble");
    let diamTreble = map(eTreble, 0, 255, 0, 800);
    strokeWeight(2);
    stroke(255);
    circle(centro.x, centro.y, diamTreble);
  }
}


// FUNZIONI CHIAMATE ATTRAVERSO ICONA ALTOPARLANTE

function attivaAudio() {  // se l'audio viene riattivato...
  sound.loop(); // riavvia il brano
}

function disattivaAudio() {  // se l'audio viene disattivato...
  sound.pause(); // metti in pausa il brano
}
