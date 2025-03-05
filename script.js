let particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // Generăm particulele pentru inimă
    for (let i = 0; i < 2000; i++) {
        let x = random(width / 2 - 200, width / 2 + 200);
        let y = random(height / 2 - 200, height / 2 + 200);

        if (isInHeart(x, y)) {
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
    let nx = (x - width / 2) / 16;
    let ny = (y - height / 2) / 16;
    return pow(nx, 2) + pow(ny - sqrt(abs(nx)), 2) - 1 < 0;
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
        if (d < 50) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.vx = 
