let x, x1, y, y1, qty, drop;
let r, g, b;
let drops = [];

let xoff = 0.0;
let xincrement = 0.01;

class Drop {
  constructor(x) {
    this.x = x;
    this.y = 100;
    this.yoff = random(0.02);
    this.yincrement = random(0.3);
  }

  displace() {
    this.y = noise(this.yoff) * height;
  }
  
  increaseYoff() {
    this.yoff += this.yincrement;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(50);   
  noStroke();
  for(let i= 0 ; i<=100; i++) {
    drops.push(new Drop(random(width)));
  }
  qty=20;
  x1=0;
  frameRate(120);
}


function draw() {

  // Crear un fondo traslúcido
  fill(0, 20);
  rect(0, 0, width, height);

  let x = random(0, width);  

  // Obtener un valor de ruido basado en xoff y escalarlo
  // según el ancho de la ventana
  //let x = noise(xoff) * width;
  //let y = noise(xoff) * height;

  // Incrementar xoff en cada ciclo
  xoff += xincrement;

  // Dibujar la elipse en la coordenada producida por el ruido Perlin
  createShadeOfBlue();
  fill(r, g, b);

  ellipse(x, height / 2, 64, 64);

  if (frameCount>=200 && frameCount<=400) {
    if (frameCount===200) {
      
      drops.push(new Drop(x));
      print("There are this many drops:" + drops.length);
      
    }

    for (let drop of drops) {
      drop.increaseYoff();
      drop.displace();
      fillDrop(drop);
      ellipse(drop.x, drop.y, 30, 30);
    }
  }


  if (frameCount>400) {
    qty++;
    frameCount=0;
  }
}

function windowResized() {
  setup();
}

function createShadeOfBlue() {
  r = random(100);
  g = random(100);
  b = random(108, 255);
}

function fillDrop(drop) {
  let col = map(drop.y, 200, height/3, 255, 200);
  fill(col, 20);
}
