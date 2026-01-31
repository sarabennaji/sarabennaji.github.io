let positions = [];
let particles = [];
let lastExplosionTime = 0;
let explosionInterval = 2000;

// Colores predefinidos
const palette = ['#9dd6a0ff', '#faffa0ff', '#ff8d63ff', '#99c8ceff'];

function setup() {
  createCanvas(windowWidth, windowHeight).id('p5-canvas');
  noCursor();
  lastExplosionTime = millis();
}

function draw() {
  clear();

  // CURSOR Y TRAIL
  if (windowWidth >= 750) {
    positions.push({ x: mouseX, y: mouseY });
    if (positions.length > 150) positions.shift();

    stroke(135, 135, 135);
    noFill();
    strokeWeight(1);
    for (let i = 0; i < positions.length; i++) {
      drawCross(positions[i].x, positions[i].y);
    }

    strokeWeight(2);
    drawCross(mouseX, mouseY);
  }

  // EXPLOSIONES AUTOMÁTICAS
  if (millis() - lastExplosionTime > explosionInterval) {
    createExplosion(random(width * 0.2, width * 0.8), random(height * 0.2, height * 0.8));
    lastExplosionTime = millis();
  }

  // EXPLOSIONES ALEATORIAS AL MOVER EL CURSOR
  if (windowWidth >= 750) {
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      if (random() < 0.1 && millis() - lastExplosionTime > 300) {
        createExplosion(mouseX, mouseY);
        lastExplosionTime = millis();
      }
    }
  }

  // ACTUALIZACIÓN Y DIBUJO DE PARTÍCULAS
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

function drawCross(x, y) {
  line(x - 5, y, x + 5, y);
  line(x, y - 5, x, y + 5);
}

function mousePressed() {
  createExplosion(mouseX, mouseY);
}

function createExplosion(x, y) {
  for (let i = 0; i < 40; i++) {
    if (random() < 0.5) {
      particles.push(new CrossParticle(x, y));
    } else {
      particles.push(new DotParticle(x, y));
    }
  }
}

// PARTICULA EN CRUZ
class CrossParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    const angle = random(TWO_PI);
    const speed = random(0.5, 6);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.acc = createVector(0, 0.09);
    this.alpha = 255;
    this.size = random(6, 12);
    this.color = color(random(palette));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.x *= 0.97;
    this.alpha -= 2.5;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.color);
    strokeWeight(1.3);
    drawingContext.globalAlpha = this.alpha / 255;
    line(-this.size / 2, 0, this.size / 2, 0);
    line(0, -this.size / 2, 0, this.size / 2);
    pop();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// PARTICULA EN PUNTO
class DotParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    const angle = random(TWO_PI);
    const speed = random(0.5, 6);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.acc = createVector(0, 0.09);
    this.alpha = 255;
    this.size = random(2, 5);
    this.color = color(random(palette));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.x *= 0.97;
    this.alpha -= 2.5;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.color);
    drawingContext.globalAlpha = this.alpha / 255;
    ellipse(0, 0, this.size);
    pop();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

