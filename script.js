        let particles = [];

        function setup() {
            createCanvas(windowWidth, windowHeight);
            noStroke();

            let centerX = width / 2;
            let centerY = height / 2;
            let scaleFactor = 10;

            for (let i = 0; i < 10000; i++) {
                let t = random(TWO_PI);
                let r = sqrt(random(0, 1)); 
                let x = 16 * pow(sin(t), 3) * r;
                let y = (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) * r;

                x = centerX + x * scaleFactor;
                y = centerY - y * scaleFactor;

                particles.push(new Particle(x, y));
            }
        }

        function draw() {
            background(0);
            for (let p of particles) {
                p.update();
                p.show();
            }
        }

        class Particle {
            constructor(x, y) {
                this.origX = x;
                this.origY = y;
                this.x = x + random(-1, 1);
                this.y = y + random(-1, 1);
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
                    this.vx = 0.9;
                    this.vy = 0.9;
                    this.x += (this.origX - this.x) * 0.05;
                    this.y += (this.origY - this.y) * 0.05;
                }

                this.x += this.vx;
                this.y += this.vy;
            }

            show() {
                fill(255, 0, 0, 255);
                ellipse(this.x, this.y, 3);
            }
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }
    </script>
</body>
</html>
