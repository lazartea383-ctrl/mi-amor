// ------------------- CORAZONES EN EL FONDO -------------------

const heartsCanvas = document.getElementById("heartsCanvas");
const hctx = heartsCanvas.getContext("2d");

function resizeCanvas() {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

function newHeart() {
    return {
        x: Math.random() * heartsCanvas.width,
        y: heartsCanvas.height + 20,
        size: Math.random() * 10 + 10,
        speed: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.6 + 0.3
    };
}

for (let i = 0; i < 50; i++) hearts.push(newHeart());

function drawHearts() {
    hctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);

    hearts.forEach(h => {
        h.y -= h.speed;

        if (h.y < -20) {
            Object.assign(h, newHeart());
            h.y = heartsCanvas.height;
        }

        hctx.fillStyle = `rgba(255, 105, 180, ${h.alpha})`;
        hctx.beginPath();
        hctx.moveTo(h.x, h.y);
        hctx.bezierCurveTo(
            h.x + h.size, h.y - h.size,
            h.x + h.size * 2, h.y + h.size / 2,
            h.x, h.y + h.size * 1.5
        );
        hctx.bezierCurveTo(
            h.x - h.size * 2, h.y + h.size / 2,
            h.x - h.size, h.y - h.size,
            h.x, h.y
        );
        hctx.fill();
    });

    requestAnimationFrame(drawHearts);
}
drawHearts();


// ------------------- ESCRITURA DEL TEXTO -------------------

const bear = document.getElementById("bear");
const writingArea = document.getElementById("writingArea");
const bubble = document.getElementById("bubble");

const letters = ["M", "i","A", "m", "o", "r"];
const positions = ["40%", "44%", "48%", "52%", "56%", "60%"];

let index = 0;

function writeNext() {
    if (index >= letters.length) {
        showBubble();
        return;
    }

    bear.style.left = positions[index];
    bear.classList.add("writing");

    setTimeout(() => {
        const span = document.createElement("span");
        span.textContent = letters[index];
        writingArea.appendChild(span);

        bear.classList.remove("writing");
        index++;

        setTimeout(writeNext, 600);
    }, 900);
}

function showBubble() {
    setTimeout(() => {
        bubble.style.display = "block";
    }, 600);
}

setTimeout(writeNext, 800);

