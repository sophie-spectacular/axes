// Get the draggable dot and container
const draggable = document.getElementById('draggable');
const container = document.querySelector('.container');

// Initialize variables to keep track of the dragging state
let isDragging = false;
let offsetX, offsetY;

// Add event listeners for mouse events
draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.getBoundingClientRect().left;
    offsetY = e.clientY - draggable.getBoundingClientRect().top;
    draggable.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        // Calculate new position
        const x = e.clientX - container.getBoundingClientRect().left - offsetX;
        const y = e.clientY - container.getBoundingClientRect().top - offsetY;

        // Constrain the dot within the container
        const constrainedX = Math.max(0, Math.min(container.clientWidth - draggable.clientWidth, x));
        const constrainedY = Math.max(0, Math.min(container.clientHeight - draggable.clientHeight, y));

        // Update the dot's position
        draggable.style.left = constrainedX + 'px';
        draggable.style.top = constrainedY + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';
});
