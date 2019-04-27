let userScore = 0;
let botScore = 0;

const userScore_span = document.getElementById("user-score");
const botScore_span = document.getElementById("bat-score");
const result = document.querySelector(".result > p");

const rock_choice = document.getElementById("user-rock");
const paper_choice = document.getElementById("user-paper");
const scissors_choice = document.getElementById("user-scissors");


let prevUserChoices = (function () {
	let prevChoice = [];
	return function(){
		return prevChoice;
	}
})();

let gameStatus = (function () {
	let prevGames = [];
	return function(){
		return prevGames;
	}
})();

const won = 1;
const lost = -1;
const drawn = 2;
let numberOfGames = 0;
let frequency = [0, 0, 0];

let choices = ['rock', 'paper', 'scissors', 'baal'];

function win(userChoice, botChoice) {
	gameStatus().push(lost);
	userScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${userChoice} beats ${botChoice}. You win!`;
	document.getElementById("user-" + userChoice).classList.add('green-glow');
	document.getElementById("bat-" + botChoice).classList.add('red-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("green-glow");
		document.getElementById("bat-" + botChoice).classList.remove('red-glow');
	}, 300);
}

function lose(userChoice, botChoice) {
	gameStatus().push(won);
	botScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} beats ${userChoice}. You lost!`;
	document.getElementById("user-" + userChoice).classList.add('red-glow');
	document.getElementById("bat-" + botChoice).classList.add('green-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("red-glow");
		document.getElementById("bat-" + botChoice).classList.remove('green-glow');
	}, 300);
}

function draw(userChoice, botChoice){
	gameStatus().push(drawn);
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} equals ${userChoice}. It's a draw!`;
	document.getElementById("user-" + userChoice).classList.add('blue-glow');
	document.getElementById("bat-" + botChoice).classList.add('blue-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("blue-glow");
		document.getElementById("bat-" + botChoice).classList.remove('blue-glow');
	}, 300);
}

function choiceDebunker(nextProbableChoice, choiceChanger) {
	let choiceIndex = choices.indexOf(nextProbableChoice);
	choiceIndex += choiceChanger;
	if(choiceIndex < 0) {
		choiceIndex = 2;
	} else if(choiceIndex >2) {
		choiceIndex = 0;
	}
	return choiceIndex;
}

function chooseFromFrequency() {
	let i;
	let temp = -1;
	let mostChosen = 0;

	for(i = 0; i < 3; i++) {
		if(frequency[i] > temp) {
			temp = frequency[i];
			mostChosen = i;
		}
	}

	return choiceDebunker(choices[mostChosen], lost);
}

function checkChoiceStreakAndDebunk(lastChoice, lastResult) {
	let iterator;
	let choiceDecision, choiceIndex = 3;
	let count = 0;
	let continuousWinNumber = 0;
	const len =  prevUserChoices().length - 1;
	for(iterator = len-1; iterator >= 0; iterator--) {
		if(prevUserChoices()[iterator] == lastChoice){
			count++;
		}

		if(gameStatus()[iterator] == lastResult) {
			continuousWinNumber += lastResult;
		}

		if((prevUserChoices()[iterator] != lastChoice) && gameStatus()[iterator] != lastResult){
			break;
		}
	}

	if(count >= 2) {
		if(continuousWinNumber == count) {
			choiceDecision = lost;
		} else if(continuousWinNumber > count){
			choiceDecision = lost;
		} else {
			choiceDecision = won;
		}

		choiceIndex = choiceDebunker(lastChoice, choiceDecision);
	} else if(count == 1) {
		if(continuousWinNumber == count) {
			choiceDecision = lost;
		} else if(continuousWinNumber > count){
			choiceDecision = lost;
		} else {
			choiceDecision = lost;
		}

		choiceIndex = choiceDebunker(lastChoice, choiceDecision);
	} else {
		choiceIndex = chooseFromFrequency();
	}

	return choiceIndex;
}

function botChoiceGenerator() {
	let choiceIndex;
	let nextChoice;
	
	if(numberOfGames == 0) {
		nextChoice = "paper";
	} else {
		const lastGameIndex = numberOfGames - 1;
		const lastChoice = prevUserChoices()[lastGameIndex];

		if(gameStatus()[lastGameIndex] == won) {			
			if(lastGameIndex > 0) {
				choiceIndex = checkChoiceStreakAndDebunk(lastChoice, won);
				nextChoice = choices[choiceIndex];
				//console.log(nextChoice);
			} else {
				nextChoice = "paper";
			}

		} else if(gameStatus()[lastGameIndex] == lost) {
			if(lastGameIndex > 0) {
				choiceIndex = checkChoiceStreakAndDebunk(lastChoice, lost);
				nextChoice = choices[choiceIndex];
				//console.log(nextChoice);
			} else {
				nextChoice = "rock";
			}

		} else {
			if(lastGameIndex > 0) {
				let randomNum = Math.floor(Math.random() * 5);
				choiceIndex = checkChoiceStreakAndDebunk(lastChoice, drawn);
				nextChoice = choices[choiceIndex];
				//console.log(nextChoice);
			} else {
				choiceIndex = chooseFromFrequency();
				nextChoice = "paper";
			}
		}
	}
	//console.log(prevUserChoices());

	return nextChoice;
}

function game(userChoice) {
	botChoice = botChoiceGenerator();
	numberOfGames++;
	
	switch(userChoice + botChoice) {
		case "rockrock":
		case "paperpaper":
		case "scissorsscissors":
			draw(userChoice, botChoice);
			break;
		case "rockscissors":
		case "paperrock":
		case "scissorspaper":
			win(userChoice, botChoice);
			break;
		default:
			lose(userChoice, botChoice);
	}
}

function eventHandler() {
	rock_choice.addEventListener('click', function() {
		prevUserChoices().push("rock");
		frequency[0]++;
		game("rock");
	})

	paper_choice.addEventListener('click', function() {
		prevUserChoices().push("paper");
		frequency[1]++;
		game("paper");
	})

	scissors_choice.addEventListener('click', function() {
		prevUserChoices().push("scissors");
		frequency[2]++;
		game("scissors");
	})
}

eventHandler();
