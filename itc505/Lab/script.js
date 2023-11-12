// Your JavaScript code for the interactive part goes here
// For example, you can create a simple button click event

document.addEventListener('DOMContentLoaded', function() {
    const problemContainer = document.getElementById('problem-container');
    
    const button = document.createElement('button');
    button.textContent = 'Click me!';
    
    button.addEventListener('click', function() {
        alert('Button clicked!');
        // Add more interactive code here
    });

    problemContainer.appendChild(button);
});
