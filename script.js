let particles = [];
let textParticles = [];
let heartSize = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    // Creăm particulele pentru inimă
    for (let a = 0; a < TWO_PI; a += 0.05) {
        let x = 16 * pow(sin(a), 3) * heartSize;
        let y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) * heartSize;
        particles.push(new Particle(x, y));
    }

    // Creăm particule pentru textul "Te iubesc"
    let txt = "Te iubesc";
    textSize(32);
    let txtW = textWidth(txt);
    let txtX = -txtW / 2;
    let txtY = 10;

    for (let i = 0; i < txt.length; i++) {
        let letter = txt[i];
        let letterX = txtX + textWidth(txt.substring(0, i));
        let letterY = txtY;

        textParticles.push(new TextParticle(letterX, letterY, letter));
    }
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    
    // Desenăm particulele inimii
    fill(255, 0, 0);
    for (let particle of particles) {
        particle.update();
        particle.show();
    }

    // Desenăm particulele textului
    fill(255);
    for (let tp of textParticles) {
        tp.show();
    }
}

// Clasa pentru particulele inimii
class Particle {
    constructor(x, y) {
        this.origX = x;
        this.origY = y;
        this.x = x + random(-3, 3);
        this.y = y + random(-3, 3);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
    }

    update() {
        let d = dist(mouseX - width / 2, mouseY - height / 2, this.x, this.y);
        if (d < 50) {
            this.x += random(-2, 2);
            this.y += random(-2, 2);
        } else {
            this.x += (this.origX - this.x) * 0.05;
            this.y += (this.origY - this.y) * 0.05;
        }
    }

    show() {
        ellipse(this.x, this.y, 4);
    }
}

// Clasa pentru particulele textului
class TextParticle {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
    }

    show() {
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.letter, this.x, this.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
