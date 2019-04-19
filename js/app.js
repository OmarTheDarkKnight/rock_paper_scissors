let userScore = 0;
let botScore = 0;

const userScore_span = document.getElementById("user-score");
const botScore_span = document.getElementById("bot-score");
const result = document.querySelector(".result > p");

const rock_choice = document.getElementById("rock");
const paper_choice = document.getElementById("paper");
const scissors_choice = document.getElementById("scissors");

function win(userChoice, botChoice) {
	userScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${userChoice} beats ${botChoice}. You win!`;
	document.getElementById(userChoice).classList.add('green-glow');
	setTimeout(() => document.getElementById(userChoice).classList.remove("green-glow"), 300);
}

function lose(userChoice, botChoice) {
	botScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} beats ${userChoice}. You lost!`;
	document.getElementById(userChoice).classList.add('red-glow');
	setTimeout(() => document.getElementById(userChoice).classList.remove("red-glow"), 300);
}

function draw(userChoice, botChoice){
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} equals ${userChoice}. It's a draw!`;
	document.getElementById(userChoice).classList.add('blue-glow');
	setTimeout(() => document.getElementById(userChoice).classList.remove("blue-glow"), 300);
}

function botChoiceGenerator() {
	choices = ['rock', 'paper', 'scissors'];
	const index = Math.floor(Math.random() * 3);
	return choices[index];
}

function game(userChoice) {
	var botChoice = botChoiceGenerator();
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
		game("rock");
	})

	paper_choice.addEventListener('click', function() {
		game("paper");
	})

	scissors_choice.addEventListener('click', function() {
		game("scissors");
	})
}

eventHandler();
