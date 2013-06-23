# Number Guesser

In this project, you will first get set up with your development environment. We will be building Chrome extensions and applications, so you will need to download and install the Google Chrome browser if you do not already have it. You'll also need a way to write, save, and edit text files.

Your first extension is a Hello World Chrome extension that responds to the browser-action of clicking an icon by displaying a pop-up that says "Hello, world!"

## Core Concepts

  * Installing Chrome
  * Finding a text editor
  * HTML
  * Installing a Chrome Extension

## Getting Started

First, download and install Chrome Web Browser from here: https://www.google.com/intl/en/chrome/browser/.

If you have a text editor of choice, feel free to use it. If not, we recommend the Slim Text Chrome Application, which you can get here: http://slimtext.org/.

In the rest of this packet, we will provide you with the necessary text files for your first Chrome extensions. Create a folder on your computer called hello_world. For each of these files, create a new file in your text editor. To do this in Slimtext, first open the application by clicking the green-S icon in the top right of your Chrome Browser. Navigate to the folder you created by clicking through the files on the left and directories above. Then open a new file by clicking the page-with-a-corner-folded-down icon, the left-most icon at the top right. Be sure to name the files as they appear below. Rember to save your files (NOTE: an asterisk by the file name means your changes have not been saved.)!

## Source Files

*manifest.json*

```json
{
  "name": "Number Guesser",
  "description": "This app tries to get you to guess the secret number.",
  "version": "1.0",
  "manifest_version": 2,

  "app": {
    "launch": {
      "local_path": "guess.html"
    }
  }
}
```

*guess.html*

```html
<!DOCTYPE html>
<html>
<head>
  <script src="guess.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="guess.css">
</head>
<body>
  <h1 id=guess-title'>Guess my number!</h1>

  <ul id='guess-list'>
  </ul>

  <form id='guess-form'>
    <input type="text" name="guess" id="guess-input">
  </form>
</body>
</html>
```

*guess.js*

```
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
```

*guess.css*

```
#guess-list {
  height: 400px;
  border: 1px solid #ccc;
  overflow-y: auto;
  padding: 15px;
}

body {
  font-family:"Helvetica Neue", Arial, sans-serif;
}

#guess-list li {
  list-style-type: none;
  padding: 0;
  font-size: 16pt;
}

input[type=text] {
  width: 100%;
}
```

## See what you can do!

  - Report how many times the user guesses too high and too low.
