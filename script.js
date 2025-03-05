let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    let centerX = width / 2;
    let centerY = height / 2;
    let scaleFactor = 10;

    // Generăm particule pentru a umple inima
    for (let t = 0; t < TWO_PI; t += 0.01) {
        // Ecuația pentru o formă de inimă
        let x = 16 * pow(sin(t), 3);
        let y = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);

        x = centerX + x * scaleFactor;
        y = centerY - y * scaleFactor;

        // Vom adăuga particule pe toată zona formei de inimă
        for (let r = 0; r < scaleFactor; r++) {
            for (let angle = 0; angle < TWO_PI; angle += 0.02) {
                let offsetX = r * cos(angle);
                let offsetY = r * sin(angle);

                // Dacă punctul (x + offsetX, y + offsetY) se află în interiorul formei de inimă
                let distance = dist(centerX, centerY, x + offsetX, y + offsetY);
                if (distance < scaleFactor) {
                    particles.push(new Particle(x + offsetX, y + offsetY));
                }
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
