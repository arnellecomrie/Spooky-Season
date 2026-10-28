function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function processGuess() {
    const min= 1;
    const max = 10;

    //get random number of hats
    const hatNumber = getRandomNumber(min, max);

    //get the player's guess
    const numberGuessed = parseInt(document.getElementById("playerGuess").value);

    //start the message we'll send back to the player
    let message = `You guessed ${numberGuessed} and there were  ${hatNumber} hats. `;
    
    if (isNaN(numberGuessed) || numberGuessed <1 || numberGuessed > 10)
    {
        document.getElementById("result").textContent = "Please enter a whole number between 1 and 10.";
        return;
    }
    
    if (hatNumber===numberGuessed)
    {
        //player wins!
        document.getElementById("result").textContent = message + "You Survived!";
    }
    else
    {




        //player guessed incorrectly
        document.getElementById("result").textContent = message + "Sorry, you have been cursed for eternity!";
    }
 //show hats
     const container = document.getElementById('witchContainer');
      container.innerHTML = '';

     for (let i = 0; i < hatNumber; i++) {
       const img = document.createElement('img');
       img.src = "witch-hat.png";
       container.appendChild(img);

     }
    
   
}

document.getElementById("submitGuess").addEventListener("click", processGuess);

//  numberGuessed;
// document.getElementById("finalMessage").textContent = numberGuessed