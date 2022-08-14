// plan to add gif to winning/losing conditions
// addd conditions for if player sum = 22 and message 'Busted you're so close'

var dealerSum = 0;
var playerSum = 0;

var dealerAcecount = 0;
var playerAceCount = 0; //A, 2 + K-> 1 + 2 + 10;

var hidden;
var deck;
var images;

var canHit = true;  //allows the player to draw while yourSum <= 21



window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"]
    let types = ["C", "D", "H", "S"];
    deck = [];


    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);  //A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.999)
        let shuffledDeck = deck[i];
        deck[i] = deck[j];
        deck[j] = shuffledDeck;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAcecount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        // <img src= "C:\Users\Davin\Documents\Docs\CS\Black Jack Project\cards\7-S.png"
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAcecount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img"); // create image tag
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"; //set source of the image to cardImg.src
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);

    }
    console.log(playerSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAcecount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png"; // reveal the hidden  card when  player ends the  turn

    let message = "";

    if (playerSum == 22 || playerSum == 23) {
        message = `You were so close! You Lose! Total sum of your cards is ${playerSum}.Better luck next time!`
        document.querySelector("#close").style.display ='inline';
    }
    else if (playerSum > 21) {
        message = `You are Busted! You Lose! Total sum of your cards is ${playerSum}.Better luck next time!`
        document.querySelector("#busted").style.display ='inline';
    }

    else if (dealerSum > 21) {
        message = `Dealer is busted! You Win! Total sum of dealer cards is ${dealerSum}.Lady Luck is smiling on you today :)`
        document.querySelector("#lucky").style.display ='inline';
        
    }
    // both you and dealer <=21
    else if (playerSum == dealerSum) {
        message = "This round has ended in a Tie!";
        document.querySelector("#tie").style.display ='inline';
    }

    else if (playerSum > dealerSum) {
        message = `Your cards sum of ${playerSum} trumps dealer's! You Win!`;
        document.querySelector("#trump").style.display ='inline';
        
    }

    else if (playerSum < dealerSum) {
        message = `Your cards sum of ${playerSum} is less than dealer's! You Lose! Better luck next time!`;
        document.querySelector("#lose").style.display ='inline';
    }

    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("results").innerText = message;

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21)
        canHit = false;
}

function getValue(card) {
    let data = card.split("-"); // "4-C"  ->["4", "C"] //  splitting  the value and types of the card tothe  individual components
    let value = data[0];

    if (isNaN(value)) { //A J Q K // account for the graphic (non-number) of the suite
        if (value == 'A') {
            return 11;
        }
        return 10; // this is for J Q K
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}




