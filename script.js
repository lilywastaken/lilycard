const canvas = document.getElementById('animated-traits');
const ctx = canvas.getContext('2d');

// Set canvas to cover the entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const traits = [];

// Function to create a single animated trait (red bar)
function createTrait() {
    const trait = {
        x: Math.random() * canvas.width,
        y: -20,
        length: Math.random() * 20 + 20,
        speed: Math.random() * 5 + 2, // Increased speed
        opacity: Math.random() * 0.5 + 0.5,
        width: Math.random() * 2 + 1,
    };
    traits.push(trait);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    traits.forEach((trait, index) => {
        ctx.beginPath();
        ctx.moveTo(trait.x, trait.y);
        ctx.lineTo(trait.x, trait.y + trait.length);
        ctx.strokeStyle = `rgba(255, 0, 0, ${trait.opacity})`;
        ctx.lineWidth = trait.width;
        ctx.stroke();

        // Update trait position
        trait.y += trait.speed;
        trait.length += 0.2; // Slower growth

        // Remove traits that go below the screen
        if (trait.y - trait.length > canvas.height) {
            traits.splice(index, 1);
        }
    });

    // Create new traits if below threshold
    if (traits.length < 100) {
        createTrait();
    }

    requestAnimationFrame(animate);
}

let currentShadowSize = 150; // Initial shadow size

function randomizeBoxShadow() {
    // Generate a random variation between -30 and 30 (you can adjust the range for more or less variation)
    const variation = Math.floor(Math.random() * 100) - 50; // Random value between -30 and 30
    
    // Calculate the new box-shadow size by adding the variation to the current size
    let newShadowSize = currentShadowSize + variation;

    // Ensure the new size is within the range of 50 to 200
    if (newShadowSize > 300) {
        newShadowSize = 300;
    } else if (newShadowSize < 50) {
        newShadowSize = 50;
    }

    // Apply the new shadow size
    document.querySelector('.card').style.boxShadow = `0 0 ${newShadowSize}px red`;

    // Update the current shadow size to the new size for the next calculation
    currentShadowSize = newShadowSize;
}

// Call the function every 2 seconds to change the box-shadow
setInterval(randomizeBoxShadow, 50);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
animate();

