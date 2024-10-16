// Store previous cursor positions
let positions = [];

function setup() {
    // Create a canvas that covers the entire window
    createCanvas(windowWidth, windowHeight).id('p5-canvas');
}

function draw() {
    // Clear the canvas in each frame
    clear();

    // Check window width and only draw cursor trail if width is 750px or larger
    if (windowWidth >= 750) {
        // Add current cursor position to positions array
        positions.push({ x: mouseX, y: mouseY });

        // Limit positions array length to avoid memory issues
        if (positions.length > 150) {
            positions.shift(); // Remove oldest position
        }

        // Draw cursor trail
        noFill();
        //stroke(197, 180, 112);       // Red color for the trail
        stroke(211, 204, 125); 
        for (let i = 0; i < positions.length; i++) {
            drawCross(positions[i].x, positions[i].y);
        }

        // Draw custom cursor
        noFill();
        stroke(211, 204, 125);  // Red color for the cursor

        strokeWeight(2);
        drawCross(mouseX, mouseY); // Draw cross at current cursor position
    }
}

// Function to draw a cross at (x, y)
function drawCross(x, y) {
    line(x - 10, y, x + 10, y); // Horizontal line
    line(x, y - 10, x, y + 10); // Vertical line
}

// Handle window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
