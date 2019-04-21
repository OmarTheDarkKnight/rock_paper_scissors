let userScore = 0;
let botScore = 0;

const userScore_span = document.getElementById("user-score");
const botScore_span = document.getElementById("bot-score");
const result = document.querySelector(".result > p");

const rock_choice = document.getElementById("user-rock");
const paper_choice = document.getElementById("user-paper");
const scissors_choice = document.getElementById("user-scissors");

function win(userChoice, botChoice) {
	userScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${userChoice} beats ${botChoice}. You win!`;
	document.getElementById("user-" + userChoice).classList.add('green-glow');
	document.getElementById("bot-" + botChoice).classList.add('red-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("green-glow");
		document.getElementById("bot-" + botChoice).classList.remove('red-glow');
	}, 300);
}

function lose(userChoice, botChoice) {
	botScore++;
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} beats ${userChoice}. You lost!`;
	document.getElementById("user-" + userChoice).classList.add('red-glow');
	document.getElementById("bot-" + botChoice).classList.add('green-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("red-glow");
		document.getElementById("bot-" + botChoice).classList.remove('green-glow');
	}, 300);
}

function draw(userChoice, botChoice){
	userScore_span.innerHTML = userScore;
	botScore_span.innerHTML = botScore;
	result.innerHTML = `${botChoice} equals ${userChoice}. It's a draw!`;
	document.getElementById("user-" + userChoice).classList.add('blue-glow');
	document.getElementById("bot-" + botChoice).classList.add('blue-glow');
	setTimeout(() => {
		document.getElementById("user-" + userChoice).classList.remove("blue-glow");
		document.getElementById("bot-" + botChoice).classList.remove('blue-glow');
	}, 300);
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
