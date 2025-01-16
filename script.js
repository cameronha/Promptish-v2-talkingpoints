document.addEventListener('DOMContentLoaded', function() {
    const pointsInput = document.getElementById('pointsInput');
    const startPromptBtn = document.getElementById('startPrompt');
    const displaySection = document.getElementById('displaySection');
    const pointsDisplay = document.getElementById('pointsDisplay');
    
    // Function to start the prompter
    function startPrompter() {
        const points = Array.from(document.querySelectorAll('.point-input'))
            .map(input => input.value.trim() || ' ');
        
        pointsDisplay.innerHTML = points
            .map(point => `<div class="point-display">${point}</div>`)
            .join('');

        // After adding points, resize text to fit containers
        const displays = document.querySelectorAll('.point-display');
        displays.forEach(display => {
            let fontSize = 6; // Starting font size in vw
            const maxSize = 6;
            display.style.fontSize = `${maxSize}vw`;
            
            // Reduce font size until text fits
            while (display.scrollWidth > display.offsetWidth && fontSize > 1) {
                fontSize -= 0.5;
                display.style.fontSize = `${fontSize}vw`;
            }
        });
    }

    // Handle enter key in input fields
    pointsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const inputs = document.querySelectorAll('.point-input');
            const currentInput = document.activeElement;
            const currentIndex = Array.from(inputs).indexOf(currentInput);
            
            if (currentIndex < inputs.length - 1) {
                // If not the last input, focus next input
                inputs[currentIndex + 1].focus();
            } else {
                // If it's the last input, start the prompter
                startPrompter();
            }
        }
    });

    // Start prompter button click
    startPromptBtn.addEventListener('click', startPrompter);

    // Add escape key to exit display mode
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            pointsDisplay.innerHTML = Array(5).fill(' ')
                .map((_, i) => `<div class="point-display placeholder">Point #${i + 1}</div>`)
                .join('');
        }
    });

    // Initialize empty gradient bars
    pointsDisplay.innerHTML = Array(5).fill(' ')
        .map((_, i) => `<div class="point-display placeholder">Point #${i + 1}</div>`)
        .join('');
}); 