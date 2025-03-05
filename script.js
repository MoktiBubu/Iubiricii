let particles = [];
let font;
let textPoints = [];
let heartSize = 10;
let particleDensity = 0.25; // Controlează câte particule sunt create

function preload() {
    font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    let txt = "Te iubesc";
    let txtSize = 100;
    let txtBounds = font.textBounds(txt, 0, 0, txtSize);
    let txtX = -txtBounds.w / 2;
    let txtY = txtBounds.h / 2;
    
    // Creăm particule pentru text
    textPoints = font.textToPoints(txt, txtX, txtY, txtSize, { sampleFactor: 0.2 });

    // Creăm particule pentru inimă
    for (let x = -16 * heartSize; x < 16 * heartSize; x += heartSize * particleDensity) {
        for (let y = -13 * heartSize; y < 13 * heartSize; y += heartSize * particleDensity) {
            let d = dist(x, y, 0, 0);
            let heartFormula = (pow(x / heartSize, 2) + pow(y / heartSize - sqrt(abs(x / heartSize)), 2) - 1);

            if (heartFormula < 0.3) { // Verificăm dacă punctul e în inimă
                let inText = false;
                
                // Verificăm dacă punctul e în zona textului
                for (let tp of textPoints) {
                    if (dist(tp.x, tp.y, x, y) < heartSize * 0.8) {
                        inText = true;
                        break;
                    }
                }

                if (!inText) {
                    particles.push(new Particle(x, y));
                }
            }
        }
    }
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    
    for (let particle of particles) {
        particle.update();
        particle.show();
    }
}

// Clasă pentru particule
class Particle {
    constructor(x, y) {
        this.origX = x;
        this.origY = y;
        this.x = x + random(-3, 3);
        this.y = y + random(-3, 3);
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        let d = dist(mouseX - width / 2, mouseY - height / 2, this.x, this.y);
        if (d < 50) {
            let angle = atan2(this.y - (mouseY - height / 2), this.x - (mouseX - width / 2));
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

