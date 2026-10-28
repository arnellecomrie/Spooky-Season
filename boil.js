function getRandomBoilNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function processBoilGuess() {
    const min= 1;
    const max = 20;

    const newtNumber = getRandomBoilNumber(min, max);
    const numberGuessed = parseInt(document.getElementById("newtGuess").value, 10);

    if (Number.isNaN(numberGuessed) || numberGuessed < min || numberGuessed > max) {
        document.getElementById("boilResult").textContent = "Please enter a whole number between 1 and 20.";
        return;
    }

    const result = document.getElementById("boilResult");
    result.textContent = `You guessed ${numberGuessed}; the potion needed ${newtNumber} newts. ${numberGuessed === newtNumber ? "What sorcery!" : "The potion fizzles. Back to the cauldron!"}`;

    const newtContainer = document.getElementById("newtContainer");
    newtContainer.replaceChildren();
    for (let index = 0; index < newtNumber; index++) {
        const img = document.createElement("img");
        img.src = "newt.gif";
        img.alt = "Newt";
        newtContainer.appendChild(img);
    }

    const potionImage = document.createElement("img");
    potionImage.src = "potiontest.gif";
    potionImage.alt = "Potion test";
    document.getElementById("potionContainer").replaceChildren(potionImage);
}

document.getElementById("submitBoilGuess").addEventListener("click", processBoilGuess);