// Slelct Start Game Button
document.querySelector(".control-buttons span").onclick = function (){

    // Prompt Window to Ask For The Name
    let yourName = prompt("What is your name ?");

    // If Name is Empty
    if(yourName == null || yourName == ""){

        // Set Name to UnKnown
        document.querySelector(".name span").innerHTML = "UnKnown";

    // Name is not Empty
    }else{

        // Set Name to your Name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove Spalsh Screen
    document.querySelector(".control-buttons").remove();
}

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-block");

// Create Array from Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range of Keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// Add Order CSS Property to game blocks
blocks.forEach((block , index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click' ,function(){

        // Trigger The Flip Block Function
        flipBlock(block);
    })
});

// Flip Block Function
function flipBlock(selectedBlock){

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If There is Two Selected Blocks
    if(allFlippedBlocks.length == 2){

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
    }
}

// Stop Clicking Function
function stopClicking(){

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{

        // Remove The Class no Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');

    } , duration);
}

// Check Matched Block Function
function checkMatchedBlocks(firstBlock , secondBlock){

    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
         
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
     }else{

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
            
        }, duration);
        
    }
}

// Shuffle Function
function shuffle (array){

    // Setting Variables
    let current = array.length,
        temp,
        random;

    while(current > 0){

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length by One
        current-- ;

        // Save Current Element in Stash
        temp = array[current];

        // Current Element = Random Element
        array[current] = array[random];

        // Random Element = Get Element from Stash
        array[random] = temp;
    }

    return array;
}
