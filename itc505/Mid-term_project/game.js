const storyTextElement = document.getElementById('story-text');
const storyImageElement = document.getElementById('story-image');
const choicesElement = document.getElementById('choices');
const backButton = document.getElementById('back-button');

// Initial game state
let currentStoryPart = 1;
let previousChoices = [];


// Function to start/restart the game
function startGame() {
    currentStoryPart = 1;
    previousChoices = [];
    updatePage();
}

// Function to update the page with the current story part and choices
function updatePage() {
    const storyPart = getStoryPart(currentStoryPart);

    // Update story text
    storyTextElement.textContent = storyPart.text;

    // Update story image
    storyImageElement.src = storyPart.image;

    // Clear previous choices
    choicesElement.innerHTML = '';

    // Create buttons for each choice
    storyPart.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(index));
        choicesElement.appendChild(button);
    });

    // Show the back button if there are previous choices
    backButton.style.display = previousChoices.length > 0 ? 'block' : 'none';
}

// Function to handle player choices
function makeChoice(choiceIndex) {

    // Save the current choice for possible backtracking
    previousChoices.push(currentStoryPart);

    const storyPart = getStoryPart(currentStoryPart);
    const chosenOption = storyPart.choices[choiceIndex];
    
    // Move to the next story part based on the chosen option
    currentStoryPart = chosenOption.nextPart;
    
    // Check if it's an ending
    if (currentStoryPart === 'end') {
        endGame(chosenOption.image);
    } else {
        updatePage();
    }
}

// Function to handle going back to the previous set of choices
function goBack() {
    if (previousChoices.length > 0) {
        // Pop the previous choice and go back
        currentStoryPart = previousChoices.pop();
        updatePage();
    }
}

// Function to handle game ending
function endGame(image) {
    // Display ending text
    storyTextElement.textContent = 'The game has ended.';

    // Remove choices
    choicesElement.innerHTML = '';

    // Display relevant image for the ending
    storyImageElement.src = image;

    // Hide the back button at the end
    backButton.style.display = 'none';

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
                    { text: "Enter the Whispering Woods", nextPart: 3, image: "whispering-woods.jpg" },
                    { text: "Explore the Crystal Caverns", nextPart: 4, image: "crystal-caverns.jpg" },
                    { text: "Cross the Bridge of Reflection", nextPart: 5, image: "bridge-of-reflection.jpg" }
                ]
            };

        case 2:
            return {
                text: "The Moonlit Meadow: The path to the left takes you through a moonlit meadow. Will you follow the fireflies deeper into the enchanting night, or will you continue on the main trail?",
                choices: [
                    { text: "Follow the fireflies", nextPart: 6, image: "end1.jpg"},
                    { text: "Continue on the main trail", nextPart: 7 }
                ]
            };

        case 3:
            return {
                text: "The Whispering Woods: The right path leads into a dense forest where the trees seem to whisper ancient secrets. Do you trust the whispers and venture into the heart of the woods, or do you stay on the path?",
                choices: [
                    { text: "Venture into the heart of the woods", nextPart: 8 },
                    { text: "Stay on the path", nextPart: 9 }
                ]
            };

        case 4:
            return {
                text: "The Crystal Caverns: A hidden entrance leads downward into the depths of the maze. The air is cool, and crystals glisten on the walls. Will you explore the caverns, or continue forward?",
                choices: [
                    { text: "Explore the caverns", nextPart: 10 },
                    { text: "Continue forward", nextPart: 11 }
                ]
            };

        case 5:
            return {
                text: "The Bridge of Reflection: A rickety bridge extends over a chasm, reflecting your choices so far. Do you cross the bridge or search for an alternative route?",
                choices: [
                    { text: "Cross the bridge", nextPart: 12 },
                    { text: "Search for an alternative route", nextPart: 13 }
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
