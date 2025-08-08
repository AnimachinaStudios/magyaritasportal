(() => {
    const canvas = document.getElementById("shooting-stars");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createStar() {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height / 2);
        const length = random(80, 150);
        const speed = random(6, 12);
        return { x, y, length, speed, opacity: 1 };
    }

    function drawStar(star) {
        const grad = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y + star.length);
        grad.addColorStop(0, `rgba(255,255,255,${star.opacity})`);
        grad.addColorStop(1, `rgba(255,0,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star, index) => {
            star.x += star.speed;
            star.y += star.speed;
            star.opacity -= 0.015;

            if (star.opacity <= 0) {
                stars.splice(index, 1);
            } else {
                drawStar(star);
            }
        });

        if (Math.random() < 0.03) {
            stars.push(createStar());
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
})();
