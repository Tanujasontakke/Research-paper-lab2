const storyTextElement = document.getElementById('story-text');
const storyImageElement = document.getElementById('story-image');
const choicesElement = document.getElementById('choices');
// const backButton = document.getElementById('back-button');
const restartButton = document.getElementById('restart-button');

// Initial game state
let currentStoryPart = 1;
// let previousChoices = [];
let inChoice = false; // To track if the player is in a choice scenario


// Function to start/restart the game
function startGame() {
    currentStoryPart = 1;
    // previousChoices = [];
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

    // Show the back button if there are previous choices
    // backButton.style.display = previousChoices.length > 0 ? 'block' : 'none';
    restartButton.style.display = currentStoryPart.startsWith('end') ? 'block' : 'none';
}

// Function to handle player choices
function makeChoice(choiceIndex) {

    // Save the current choice for possible backtracking
    // previousChoices.push(currentStoryPart);

    const storyPart = getStoryPart(currentStoryPart);
    const chosenOption = storyPart.choices[choiceIndex];
    
    // Move to the next story part based on the chosen option
    currentStoryPart = chosenOption.nextPart;
    
    // Check if it's a choice scenario
    inChoice = currentStoryPart.startsWith('choice');

    updatePage();
}

// Function to handle going back to the previous set of choices
// function goBack() {
//     if (previousChoices.length > 0) {
//         // Pop the previous choice and go back
//         currentStoryPart = previousChoices.pop();
//         updatePage();
//     }
// }

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
function endGame(image) {
    // Display ending text
    storyTextElement.textContent = 'The game has ended.';

    // Remove choices
    choicesElement.innerHTML = '';

    // Display relevant image for the ending
    // storyImageElement.src = image;

    // Show the restart button
    // const restartButton = document.createElement('button');
    // restartButton.textContent = 'Restart';
    // restartButton.addEventListener('click', startGame);
    // choicesElement.appendChild(restartButton);

    // Hide the back button at the end
    // backButton.style.display = 'none';
    restartButton.style.display = 'block';

    // // Display relevant image for the ending
    // const imgElement = document.createElement('img');
    // imgElement.src = image;
    // imgElement.alt = 'Ending Image';
    // choicesElement.appendChild(imgElement);
}

// Function to retrieve story part based on the current part number
function getStoryPart(partNumber) {
    switch (partNumber) {
        case 1:
            return {
                text: "Once upon a time, in a mystical land, there existed a maze known for its magical secrets and hidden treasures. Legend had it that those who navigated its twists and turns would encounter eight different endings, each holding a unique reward. As our story begins, you find yourself standing at the entrance of the maze. The tall hedges loom around you, and a mysterious glow emanates from within. You have four paths to choose from:",
                choices: [
                    { text: "Follow the Moonlit Meadow", nextPart: 2 },
                    { text: "Enter the Whispering Woods", nextPart: 3},
                    { text: "Explore the Crystal Caverns", nextPart: 4 },
                    { text: "Cross the Bridge of Reflection", nextPart: 5 }
                ]
            };

        case 2:
            return {
                text: "The Moonlit Meadow: The path to the left takes you through a moonlit meadow. Will you follow the fireflies deeper into the enchanting night, or will you continue on the main trail?",
                choices: [
                    { text: "Embrace the tranquility", nextPart: 'end1', image: "./end1.jpg" },
                    { text: "Explore further", nextPart: 3, image: "whispering-guardians.jpg" }
                ]
            };

        case 3:
            return {
                text: "The Whispering Woods: The right path leads into a dense forest where the trees seem to whisper ancient secrets. Do you trust the whispers and venture into the heart of the woods, or do you stay on the path?",
                choices:[
                    { text: "Learn from the guardians", nextPart: 'end2', image: "whispering-guardians.jpg" },
                    { text: "Continue your journey", nextPart: 'end3', image: "crystal-nexus.jpg" }
                ]
            };

        case 4:
            return {
                text: "The Crystal Caverns: A hidden entrance leads downward into the depths of the maze. The air is cool, and crystals glisten on the walls. Will you explore the caverns, or continue forward?",
                choices:[
                    { text: "Harness the artifact's power", nextPart: 'end3', image: "crystal-nexus.jpg" },
                    { text: "Continue your exploration", nextPart: 'end4', image: "bridge-of-shadows.jpg" }
                ]
            };

        case 5:
            return {
                text: "The Bridge of Reflection: A rickety bridge extends over a chasm, reflecting your choices so far. Do you cross the bridge or search for an alternative route?",
                choices: [
                    { text: "Embrace the shadows", nextPart: 'end4', image: "bridge-of-shadows.jpg" },
                    { text: "Find your way back to the maze", nextPart: 'end5', image: "sunlit-summit.jpg" }
                ]
            };

        // Add more cases for other story parts as needed
        case 'end1':
            return {
                text: "You have found the Serene Sanctuary...",
                choices: []
            };
        case 'end2':
            return {
                text: "You have encountered the Whispering Guardians...",
                choices: []
            };
        case 'end3':
            return {
                text: "You have reached the Crystal Nexus...",
                choices: []
            };
        case 'end4':
            return {
                text: "You have entered the Bridge of Shadows...",
                choices: []
            };
        case 'end5':
            return {
                text: "You have reached the Sunlit Summit...",
                choices: []
            };

        default:
            // Handle cases not explicitly defined
            return {};
    }
}


// Start the game when the page loads
startGame();
