let particles = [];
let font;
let textPoints = [];

function preload() {
    font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    let txt = "Te iubesc";
    let txtSize = 100;
    let txtX = width / 2 - 180;
    let txtY = height / 2 + 30;

    // Obținem punctele textului
    textPoints = font.textToPoints(txt, txtX, txtY, txtSize, { sampleFactor: 0.2 });

    // Generăm particulele inimii
    for (let i = 0; i < 1000; i++) {
        let angle = random(TWO_PI);
        let radius = random(0, 200);
        let x = width / 2 + radius * cos(angle);
        let y = height / 2 + radius * sin(angle) * 0.8;

        if (isInHeart(x, y) && !isInText(x, y)) {
            particles.push(new Particle(x, y));
        }
    }
}

function draw() {
    background(0);
    for (let p of particles) {
        p.update();
        p.show();
    }
}

// Funcția care verifică dacă un punct este în inimă
function isInHeart(x, y) {
    let nx = (x - width / 2) / 100;
    let ny = (y - height / 2) / 100;
    return (nx * nx + ny * ny - 1) ** 3 - nx * nx * ny * ny * ny < 0;
}

// Funcția care verifică dacă un punct este în zona textului
function isInText(x, y) {
    for (let pt of textPoints) {
        if (dist(x, y, pt.x, pt.y) < 10) {
            return true;
        }
    }
    return false;
}

// Clasa pentru particule
class Particle {
    constructor(x, y) {
        this.origX = x;
        this.origY = y;
        this.x = x + random(-2, 2);
        this.y = y + random(-2, 2);
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 50) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.vx = cos(angle) * 3;
            this.vy = sin(angle) * 3;
        } else {
            this.vx *= 0.9;
            this.vy *= 0.9;
            this.x += (this.origX - this.x) * 0.05;
            this.y += (this.origY - this.y) * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 4);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
