// HSK 1-3 Chinese characters for the Matrix rain
const characters = "你好谢谢再见早上好晚上好吃饭喝水学习工作朋友家人学校老师学生书包电脑手机";

// Chinese number characters
const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

// Convert number to Chinese
function numberToChinese(num) {
    if (num === 0) return chineseNumbers[0];
    if (num <= 10) return chineseNumbers[num];
    if (num < 20) return chineseNumbers[10] + (num === 10 ? "" : chineseNumbers[num - 10]);
    let tens = Math.floor(num / 10);
    let ones = num % 10;
    return chineseNumbers[tens] + chineseNumbers[10] + (ones === 0 ? "" : chineseNumbers[ones]);
}

// Get the canvas and its context
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create drops for the Matrix rain
const fontSize = 35;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

// Function to draw the Matrix rain
function drawMatrix() {
    // Add semi-transparent black rectangle to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = '#0F0'; // Matrix green
    ctx.font = `bold ${fontSize}px monospace`;

    // Draw characters
    for(let i = 0; i < drops.length; i++) {
        // Get random Chinese character
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop to top or move it down
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
            drops[i] = 0;
        }
        drops[i] += 0.75;
    }
}

// Function to update both clocks
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Update digital clock
    document.getElementById('clock').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update Chinese clock
    const chineseTime = 
        `${numberToChinese(hours)}时${numberToChinese(minutes)}分${numberToChinese(seconds)}秒`;
    document.getElementById('chinese-clock').textContent = chineseTime;
}

// Animation loop
let animationSpeed = 30;

function animate() {
    setTimeout(() => {
        drawMatrix();
        updateClock();
        requestAnimationFrame(animate);
    }, animationSpeed);
}

// Start the animation
animate(); 