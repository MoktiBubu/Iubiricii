let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    let centerX = width / 2;
    let centerY = height / 2;
    let scaleFactor = 10;

    // Generăm particule pentru a umple inima
    let radius = 100; // Dimensiunea minimă a zonei în jurul inimii

    // Parcurgem zona din jurul inimii pentru a plasa particule
    for (let x = centerX - radius; x < centerX + radius; x++) {
        for (let y = centerY - radius; y < centerY + radius; y++) {
            // Verificăm dacă punctul (x, y) este în interiorul formei inimii
            let t = atan2(y - centerY, x - centerX);
            let distHeart = 16 * pow(sin(t), 3);
            let yHeart = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
            
            let distance = dist(centerX + distHeart, centerY - yHeart, x, y);
            if (distance < scaleFactor) {
                particles.push(new Particle(x, y));
            }
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

// Clasa pentru particule
class Particle {
    constructor(x, y) {
        this.origX = x;
        this.origY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < 60) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.vx = cos(angle) * 2;
            this.vy = sin(angle) * 2;
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
