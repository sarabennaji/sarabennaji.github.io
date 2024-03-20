 // Define variables to store previous mouse position
 let prevX, prevY;

 function setup() {
     // Create a canvas that covers the entire webpage
     createCanvas(windowWidth, windowHeight);
     // Set the background color to transparent
     background(255, 255, 255, 0);
     // Initialize previous mouse positions
     prevX = mouseX;
     prevY = mouseY;
     // Hide default cursor
     noCursor();
 }

 function draw() {
     // Set fill color
     fill(255, 0, 0);
     // Draw a red plus "+" at the current mouse position
     rect(mouseX - 8, mouseY - 1, 16, 2);
     rect(mouseX - 1, mouseY - 8, 2, 16);
     strokeWeight(0);
     // Update previous mouse position
     prevX = mouseX;
     prevY = mouseY;
 }