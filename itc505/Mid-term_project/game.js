const storyTextElement = document.getElementById('story-text');
const storyImageElement = document.getElementById('story-image');
const choicesElement = document.getElementById('choices');
const restartButton = document.getElementById('restart-button');

let currentStoryPart = 1;

// Function to start/restart the game
function startGame() {
    currentStoryPart = 1;
   
    updatePage();
}

// Function to update the page with the current story part and choices
function updatePage() {
    console.log('Current Story Part:', currentStoryPart);
    const storyPart = getStoryPart(currentStoryPart);

    // Update story text
    storyTextElement.innerHTML = storyPart.text;

    const storyImageElement = document.getElementById('story-image');

    // Update story image
    storyImageElement.src = storyPart.image || '';

    // Clear previous choices
    choicesElement.innerHTML = '';
    

     // Create buttons for each choice
     storyPart.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(index));
        choicesElement.appendChild(button);
    });

    
    restartButton.style.display = currentStoryPart === 1 || currentStoryPart.startsWith('end') ? 'none' : 'block';
}


// Function to handle player choices
function makeChoice(choiceIndex) {
    const storyPart = getStoryPart(currentStoryPart);
    const chosenOption = storyPart.choices[choiceIndex];

    
    // Move to the next story part based on the chosen option
    currentStoryPart = chosenOption.nextPart;

     // Check if it's an ending
     if (currentStoryPart.startsWith('end')) {
        endGame(chosenOption.image);
    } else {
        updatePage();
    }
}


// Function to handle game ending
function endGame(image) {
    // Display ending text
    storyTextElement.textContent = 'Thank you for exploring that world.';

    // Remove choices
    choicesElement.innerHTML = '';

     // Display relevant image for the ending
     storyImageElement.src = image;

     // Show the restart button
     restartButton.style.display = 'block';
     
    
}

// Function to retrieve story part based on the current part number
function getStoryPart(partNumber) {
    switch (partNumber) {
        case 1:
            return {
                text: "Once upon a time, in a mystical land, there existed a maze known for its magical secrets and hidden treasures. Legend had it that those who navigated its twists and turns would encounter eight different endings, each holding a unique reward. As our story begins, you find yourself standing at the entrance of the maze. The tall hedges loom around you, and a mysterious glow emanates from within. You have four paths to choose from:",
                choices: [
                    { text: "Follow the Moonlit Meadow", nextPart: 'Moonlit' },
                    { text: "Enter the Whispering Woods", nextPart: 'Woods'},
                    { text: "Explore the Crystal Caverns", nextPart: 'crystal' },
                    { text: "Cross the Bridge of Reflection", nextPart: 'bridge' }
                ]
            };

        case 'Moonlit':
            return {
                text: "The Moonlit Meadow: The path to the left takes you through a moonlit meadow. Will you follow the fireflies deeper into the enchanting night, or will you continue on the main trail?",
                choices: [
                    { text: "Embrace the tranquility", nextPart: 'choice1'},
                    { text: "Explore New", nextPart: 'explorenew1' }
                ]
            };

        case 'choice1':
            return {
                text: "You have found the Serene Sanctuary. What would you like to do?",
                choices: [
                    { text: "Show Image", nextPart: 'showImage1' },
                    { text: "Complete the travel", nextPart: 'end1' }
                ]
            };

        case 'showImage1':
            return {
                text: "Here is the image of the Serene Sanctuary:",
                image: "end1.jpg",
                choices: [
                    { text: "Go to end", nextPart: 'end1' }
                ]
            };

        case 'explorenew1':
            return {
                    text: "You have entered a new world!..",
                    image: "end8.jpg",
                    choices: [
                        { text: "Go to end", nextPart: 'end1' }
                    ]
                };

        case 'end1':
            return {
                text: "You have come to end through a route...",
                choices: [
                    { text: "Restart", nextPart: 1}
                ]
            };

        // Add more cases for other story parts as needed-------------
        case 'Woods':
            return {
                text: "The Whispering Woods: The right path leads into a dense forest where the trees seem to whisper ancient secrets. Do you trust the whispers and venture into the heart of the woods, or do you stay on the path?",
                choices: [
                    { text: "Learn from the guardians", nextPart: 'choice2'},
                    { text: "Continue your journey", nextPart: 'explorenew2' }
                ]
            };

            case 'choice2':
                return {
                    text: "Guardians have a different world for you. What would you like to do?",
                    choices: [
                        { text: "Enter the world", nextPart: 'showImage2' },
                        { text: "Go to end", nextPart: 'end1' }
                    ]
                };

         case 'showImage2':
                return {
                        text: "Explore this world....",
                        image: "end2.jpg",
                        choices: [
                            { text: "Go to end", nextPart: 'end1' }
                        ]
                    };

         case 'explorenew2':
                 return {
                                text: "You have entered a new world!..",
                                image: "end7.jpg",
                                choices: [
                                    { text: "Go to end", nextPart: 'end1' }
                                ]
                            };

       //  ---------------------------------   
       case 'crystal':
            return {
                text: "The Crystal Caverns: A hidden entrance leads downward into the depths of the maze. The air is cool, and crystals glisten on the walls. Will you explore the caverns, or continue forward?",
                choices: [
                    { text: "Harness the artifact's power", nextPart: 'choice3' },
                    { text: "Continue your exploration", nextPart: 'explorenew3'}
                ]
            };

            case 'choice3':
                return {
                    text: "World of glitters and value awaits you. What would you like to do?",
                    choices: [
                        { text: "Enter the world", nextPart: 'showImage3' },
                        { text: "Go to end", nextPart: 'end1' }
                    ]
                };

         case 'showImage3':
                return {
                        text: "Explore this world....",
                        image: "end3.jpg",
                        choices: [
                            { text: "Go to end", nextPart: 'end1' }
                        ]
                    };

         case 'explorenew3':
                 return {
                                text: "You have entered another new world!..",
                                image: "end6.jpg",
                                choices: [
                                    { text: "Go to end", nextPart: 'end1' }
                                ]
                            };
        // ----------------------------------    
        case 'bridge':
            return {
                text: "The Bridge of Reflection: A rickety bridge extends over a chasm, reflecting your choices so far. Do you cross the bridge or search for an alternative route?",
                choices: [
                    { text: "Cross the Bridge", nextPart: 'choice4' },
                    { text: "Find your way back to the maze", nextPart: 'explorenew4'}
                ]
            };

            case 'choice4':
                return {
                    text: "World of glitters and value awaits you. What would you like to do?",
                    choices: [
                        { text: "Enter the world", nextPart: 'showImage4' },
                        { text: "Go to end", nextPart: 'end1' }
                    ]
                };

         case 'showImage4':
                return {
                        text: "Explore this world....",
                        image: "end4.jpg",
                        choices: [
                            { text: "Go to end", nextPart: 'end1' }
                        ]
                    };

         case 'explorenew4':
                 return {
                                text: "You have entered another new world!..",
                                image: "end5.jpg",
                                choices: [
                                    { text: "Go to end", nextPart: 'end1' }
                                ]
                            };
         //----------------------
        
        default:
            // Handle cases not explicitly defined
            return {};

    }
}


// Start the game when the page loads
startGame();
