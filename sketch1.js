let seed = 0;
let currentPattern = 2;
let song;


function setup() {
    const canvasSizeInput = select('#canvasSize');
    const initialSize = parseInt(canvasSizeInput.value(), 10);
    const canvas = createCanvas(initialSize, initialSize);
    song = loadSound('assets/pop.mp3');

    canvasSizeInput.input(() => {
      const newSize = parseInt(canvasSizeInput.value(), 10);
      changeCanvasSize(newSize);
    });
  
    canvasSizeInput.elt.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * -10;
      const newSize = parseInt(canvasSizeInput.value(), 10) + delta;
      canvasSizeInput.value(newSize);
      changeCanvasSize(newSize);
    });
  
    const togglePatternButton = select('#togglePattern');
    togglePatternButton.mousePressed(() => {
      currentPattern = currentPattern === 1 ? 2 : 1;
      redraw();
    });
  }


 

  function generateUniqueFilename() {
    const timestamp = new Date().getTime();
    return `pattern_${timestamp}.png`;
  }
  
  
function changeCanvasSize(newSize) {
    resizeCanvas(newSize, newSize);
    redraw();
  }
  
function mousePressed() {
    seed = Math.random() * 100000; // Generate a new random seed
    if (mouseButton === LEFT) {
        song.play();
        redraw();
      }
  }
  

function draw() {
  background(255);
  seed = Math.random() * 100000;
  generatePattern();
  noLoop();
}

function seededRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generatePattern1() {
  const gridSize = 10;
  const squareSize = width / gridSize;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      push();
      translate(x * squareSize + squareSize / 2, y * squareSize + squareSize / 2);
      rotate(seededRandom() * TWO_PI);
      const c = color(seededRandom() * 255, seededRandom() * 255, seededRandom() * 255);
      fill(c);
      rectMode(CENTER);
      rect(0, 0, squareSize * 0.8, squareSize * 0.8);
      pop();
    }
  }
}

function generatePattern2() {
  const gridSize = 10;
  const cellSize = width / gridSize;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      push();
      translate(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);

      const shapeType = Math.floor(seededRandom() * 3);
      const rotation = seededRandom() * TWO_PI;
      const sizeFactor = seededRandom() * 0.8;
      const strokeWidth = seededRandom() * 10;
      const fillColor = color(
        seededRandom() * 255,
        seededRandom() * 255,
        seededRandom() * 255
      );
      const strokeColor = color(
        seededRandom() * 255,
        seededRandom() * 255,
        seededRandom() * 255
      );

      rotate(rotation);
      fill(fillColor);
      stroke(strokeColor);
      strokeWeight(strokeWidth);

      switch (shapeType) {
        case 0: // Draw a circle
          ellipse(0, 0, cellSize * sizeFactor);
          break;
        case 1: // Draw a rectangle
          rectMode(CENTER);
          rect(0, 0, cellSize * sizeFactor, cellSize * sizeFactor);
          break;
        case 2: // Draw lines
          line(-cellSize * sizeFactor / 2, 0, cellSize * sizeFactor / 2, 0);
          line(0, -cellSize * sizeFactor / 2, 0, cellSize * sizeFactor / 2);
          break;
      }
      pop();
    }
  }
}

function generatePattern() {
  if (currentPattern === 1) {
    generatePattern1();
  } else {
    generatePattern2();
  }
}
