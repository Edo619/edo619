const canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');

let dots = [];
let shapeId = 1; // 1: random, 2: hyperdrive right, 3: hyperdrive left, 4: circle follow
const numDots = 150;
const maxDistance = 150;
const mouseRadius = 150;
let mouseDown = false;
const circleRadius = window.innerHeight/2;
const circleFollowRadius = 150;

let mouse = { x: null, y: null };

function resizeCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => {
mouse.x = e.clientX;
mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
mouse.x = null;
mouse.y = null;
});
window.addEventListener('mousedown', e => { if(e.button===0) mouseDown = true;});
window.addEventListener('mouseup', e => { if(e.button===0) mouseDown = false;});
window.addEventListener('keydown', (e) => {
  switch(e.key){
    case '1': shapeId = 1; break;
    case '2': shapeId = 2; break;
    case '3': shapeId = 3; break;
  }
});
// Initialize dots
for (let i = 0; i < numDots; i++) {
dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    baseRadius: Math.random() * 2 + 1,
    pulse: Math.random() * Math.PI * 2,
});
}

function drawDots() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.shadowColor = 'red';
ctx.shadowBlur = 8;
ctx.fillStyle = 'red';

const angleY = ((mouse.x / canvas.width) - 0.5) * Math.PI; // horizontal rotation
const angleX = ((mouse.y / canvas.height) - 0.5) * Math.PI; // vertical rotation

dots.forEach((dot,i) => {
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Wrap around screen
    if (dot.x < 0) dot.x = canvas.width;
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.y < 0) dot.y = canvas.height;
    if (dot.y > canvas.height) dot.y = 0;

    // Pulse animation
    dot.pulse += 0.05;
    let radius = dot.baseRadius + Math.sin(dot.pulse) * 1;

    if(shapeId === 1){ // Random
        if (mouse.x && mouse.y) {
            let dx = dot.x - mouse.x;
            let dy = dot.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
                dot.x += dx / dist;
                dot.y += dy / dist;
            }
        }
    } else if(shapeId === 2){ // Hyperdrive right
        let angle = (i/dots.length)*2*Math.PI;
        let targetX = window.innerWidth + window.innerHeight/2 + circleRadius * Math.cos(angle);
        let targetY = window.innerHeight/2 + circleRadius * Math.sin(angle);
        dot.x += (targetX - dot.x) * 0.05;
        dot.y += (targetY - dot.y) * 0.05;

    } else if(shapeId === 3){ // Hyperdrive left
        let angle = (i/dots.length)*2*Math.PI;
        let targetX = -window.innerHeight/2 + circleRadius * Math.cos(angle);
        let targetY = window.innerHeight/2 + circleRadius * Math.sin(angle);
        dot.x += (targetX - dot.x) * 0.05;
        dot.y += (targetY - dot.y) * 0.05;
    }
    else if(shapeId === 4){ //Circle follow
        let angle = (i/dots.length)*2*Math.PI;
        let targetX = mouse.x + circleFollowRadius * Math.cos(angle);
        let targetY = mouse.y + circleFollowRadius * Math.sin(angle);
        dot.x += (targetX - dot.x) * 0.05;
        dot.y += (targetY - dot.y) * 0.05;
    }
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
    ctx.fill();
});

// Draw connecting lines
ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
ctx.lineWidth = 0.5;
for (let i = 0; i < dots.length; i++) {
    let connections = 0;
    for (let j = i + 1; j < dots.length; j++) {
        if (connections >= 2) break;
        let dx = dots[i].x - dots[j].x;
        let dy = dots[i].y - dots[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();

            connections++;
        }
    }
}
}

function animate() {
drawDots();
requestAnimationFrame(animate);
}
animate();