let song;

function setup() {
  song = loadSound('assets/pop.mp3');
  createCanvas(720, 200);
  background(255, 0, 0);
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        song.play();
      }
}
