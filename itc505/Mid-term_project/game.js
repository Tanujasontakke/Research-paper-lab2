const storyTextElement = document.getElementById('story-text');
const storyImageElement = document.getElementById('story-image');
const choicesElement = document.getElementById('choices');
const restartButton = document.getElementById('restart-button');

// Initial game state
let currentStoryPart = 1;
let inChoice = false; // To track if the player is in a choice scenario

// Function to start/restart the game
function startGame() {
    currentStoryPart = 1;
    inChoice = false;
    updatePage();
}

// Function to update the page with the current story part and choices
function updatePage() {
    const storyPart = getStoryPart(currentStoryPart);

    // Update story text
    storyTextElement.innerHTML = storyPart.text;

    // Update story image
    storyImageElement.src = storyPart.image;

    // Clear previous choices
    choicesElement.innerHTML = '';

    // If it's a choice scenario, show two buttons
    if (inChoice) {
        const showImageButton = document.createElement('button');
        showImageButton.textContent = 'Show Image';
        showImageButton.addEventListener('click', () => showImage());
        choicesElement.appendChild(showImageButton);

        const moveFurtherButton = document.createElement('button');
        moveFurtherButton.textContent = 'Move Further';
        moveFurtherButton.addEventListener('click', () => moveFurther());
        choicesElement.appendChild(moveFurtherButton);
    } else {
        // Create buttons for each choice
        storyPart.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => makeChoice(index));
            choicesElement.appendChild(button);
        });
    }

    // Show/hide the restart button
    restartButton.style.display = currentStoryPart.startsWith('end') ? 'block' : 'none';
}

// Function to handle player choices
function makeChoice(choiceIndex) {
    const storyPart = getStoryPart(currentStoryPart);
    const chosenOption = storyPart.choices[choiceIndex];

    // Move to the next story part based on the chosen option
    currentStoryPart = chosenOption.nextPart;

    // Check if it's a choice scenario
    inChoice = currentStoryPart.startsWith('choice');

    updatePage();
}

// Function to show the image
function showImage() {
    const storyPart = getStoryPart(currentStoryPart);

    // Display the image
    storyImageElement.src = storyPart.image;

    // Move further after showing the image
    moveFurther();
}

// Function to move further in the story
function moveFurther() {
    // Reset the choice scenario flag
    inChoice = false;

    // Move to the next story part
    const storyPart = getStoryPart(currentStoryPart);
    currentStoryPart = storyPart.nextPart;

    updatePage();
}

// Function to handle game ending
function endGame() {
    // Display ending text
    storyTextElement.textContent = 'The game has ended.';

    // Remove choices
    choicesElement.innerHTML = '';
}

// Function to retrieve story part based on the current part number
function getStoryPart(partNumber) {
    switch (partNumber) {
        case 1:
            return {
                text: "Once upon a time, in a mystical land...",
                choices: [
                    { text: "Follow the Moonlit Meadow", nextPart: 'choice1a', image: "moonlit-meadow.jpg" },
                    { text: "Enter the Whispering Woods", nextPart: 'choice1b', image: "whispering-woods.jpg" },
                    { text: "Explore the Crystal Caverns", nextPart: 'choice1c', image: "crystal-caverns.jpg" },
                    { text: "Cross the Bridge of Reflection", nextPart: 'choice1d', image: "bridge-of-reflection.jpg" }
                ]
            };
        case 'choice1a':
            return {
                text: "You've chosen to follow the Moonlit Meadow. What would you like to do?",
                choices: [
                    { text: "Show Image", nextPart: 'choice1a_showImage', image: "end1.jpg" },
                    { text: "Move Further", nextPart: 2, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1b':
            return {
                text: "You've chosen to enter the Whispering Woods. What would you like to do?",
                choices: [
                    { text: "Show Image", nextPart: 'choice1b_showImage', image: "end2.jpg" },
                    { text: "Move Further", nextPart: 3, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1c':
            return {
                text: "You've chosen to explore the Crystal Caverns. What would you like to do?",
                choices: [
                    { text: "Show Image", nextPart: 'choice1c_showImage', image: "end3.jpg" },
                    { text: "Move Further", nextPart: 4, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1d':
            return {
                text: "You've chosen to cross the Bridge of Reflection. What would you like to do?",
                choices: [
                    { text: "Show Image", nextPart: 'choice1d_showImage', image: "end4.jpg" },
                    { text: "Move Further", nextPart: 5, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1a_showImage':
            return {
                text: "You've chosen to follow the Moonlit Meadow. The image is shown. What would you like to do now?",
                choices: [
                    { text: "Move Further", nextPart: 2, image: "end1.jpg" } // Placeholder for the next part
                ]
            };
        case 'choice1b_showImage':
            return {
                text: "You've chosen to enter the Whispering Woods. The image is shown. What would you like to do now?",
                choices: [
                    { text: "Move Further", nextPart: 3, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1c_showImage':
            return {
                text: "You've chosen to explore the Crystal Caverns. The image is shown. What would you like to do now?",
                choices: [
                    { text: "Move Further", nextPart: 4, image: "" } // Placeholder for the next part
                ]
            };
        case 'choice1d_showImage':
            return {
                text: "You've chosen to cross the Bridge of Reflection. The image is shown. What would you like to do now?",
                choices: [
                    { text: "Move Further", nextPart: 5, image: "" } // Placeholder for the next part
                ]
            };
        case 2:
            return {
                text: "You find yourself in a serene sanctuary...",
                choices: [
                    { text: "Embrace the tranquility", nextPart: 'end1', image: "serene-sanctuary.jpg" },
                    { text: "Explore further", nextPart: 'end2', image: "whispering-guardians.jpg" }
                ]
            };
        case 3:
            return {
                text: "You encounter ancient guardians revealing their wisdom...",
                choices: [
                    { text: "Learn from the guardians", nextPart: 'end2', image: "whispering-guardians.jpg" },
                    { text: "Continue your journey", nextPart: 'end3', image: "crystal-nexus.jpg" }
                ]
            };
        case 4:
            return {
                text: "You discover a powerful artifact in the crystal caverns...",
                choices: [
                    { text: "Harness the artifact's power", nextPart: 'end3', image: "crystal-nexus.jpg" },
                    { text: "Continue your exploration", nextPart: 'end4', image: "bridge-of-shadows.jpg" }
                ]
            };
        case 5:
            return {
                text: "Crossing the Bridge of Reflection transports you to a shadowy realm...",
                choices: [
                    { text: "Embrace the shadows", nextPart: 'end4', image: "bridge-of-shadows.jpg" },
                    { text: "Find your way back to the maze", nextPart: 'end5', image: "sunlit-summit.jpg" }
                ]
            };
        // Add more cases for other story parts as needed
        default:
            // Handle cases not explicitly defined
            return {};
    }
}

// Start the game when the page loads
startGame();

