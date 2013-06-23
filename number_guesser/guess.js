var numGuesses = 0;

document.addEventListener('DOMContentLoaded', function() {

	var secretNumber = Math.floor(Math.random()*10000);
	var guessList = document.getElementById('guess-list');
	var form = document.getElementById('guess-form');
	var guessInput = document.getElementById('guess-input');
	// var guessTitle = document.getElementById('guess-title');

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		var guess = guessInput.value;
		numGuesses += 1;

		var li = document.createElement('li');
		li.textContent = guess;
		guessList.appendChild(li);

		var li2 = document.createElement('li');
		if (isNaN(parseFloat(guess))) {
		    li2.textContent = "You must guess an integer.";
		    li2.style.color = "red";
		    numGuesses -= 1;
		} else if (guess == secretNumber) {
		    li2.textContent = "You guessed it! It took you " + numGuesses + " guesses.";
		    li2.style.color = "green";
		} else if (guess < secretNumber) {
		    li2.textContent = "Tooooo looow...";
		    li2.style.color = "blue";
		} else {
		    li2.textContent = "Too high!";
		    li2.style.color = "yellow";
		}
		guessList.appendChild(li2);

		guessList.scrollTop = guessList.scrollHeight;
		guessInput.value = '';
	    });
    });