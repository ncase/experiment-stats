// LIST OF QUESTIONS
var QUESTION_INDEX = 0;
var QUESTIONS = []; // filled in questions.js

// On load, show first question
window.onload = function(){
	QUESTIONS = shuffle(QUESTIONS); // Randomize!
	nextQuestion();
}

// Show next question
function nextQuestion(){
	if(QUESTION_INDEX<QUESTIONS.length){
		addQuestion(QUESTIONS[QUESTION_INDEX]);
		QUESTION_INDEX++;
	}
}

// Add an interactive question
function addQuestion(config){

	var dom = document.createElement("div");
	dom.className = "fade";
	setTimeout(function(){
		dom.style.opacity = 1;
	},100);
	$("#stats").appendChild(dom);

	// Question
	var q = document.createElement("div");
	dom.appendChild(q);
	var questionNum = "<b>Question " + (QUESTIONS.indexOf(config)+1) + " of " + QUESTIONS.length + ":</b> ";
	q.innerHTML = questionNum + config.q;

	// Config Guess
	config.guessLabel = "Your guess: "+config.label;

	// Guess label
	var guessLabel = document.createElement("div");
	dom.appendChild(guessLabel);
	var YOUR_GUESS = config.defaultValue;
	var _updateGuessLabel = function(){
		guessLabel.innerHTML = modifyStringWithNums(config.guessLabel, YOUR_GUESS);
	};
	_updateGuessLabel();

	// Guess slider
	var guessSlider = makeSlider(config.slider, config.defaultValue);
	dom.appendChild(guessSlider);
	guessSlider.oninput = function(){
		YOUR_GUESS = parseFloat(guessSlider.value);
		_updateGuessLabel();
	};
	guessSlider.onmousedown = guessSlider.ontouchstart = function(){
		answerButton.disabled = false;
	};

	// Show answer button
	var answerButton = document.createElement("button");
	dom.appendChild(answerButton);
	answerButton.innerHTML = "show answer";
	answerButton.disabled = true;
	answerButton.onclick = function(){
		
		guessSlider.disabled = true;
		answerButton.style.display = "none";
		answerLabel.style.opacity = 1;
		answerSlider.style.opacity = 1;
		footnote.style.opacity = 1;

		setTimeout(function(){
			nextQuestion();
		},2000);

	};

	// Config Answer
	config.answerLabel = "True Fact: "+config.label;

	// Answer label
	var answerLabel = document.createElement("div");
	dom.appendChild(answerLabel);
	answerLabel.className = "fade";
	answerLabel.innerHTML = modifyStringWithNums(config.answerLabel, config.answerValue);

	// Answer slider
	var answerSlider = makeSlider(config.slider, config.answerValue);
	dom.appendChild(answerSlider);
	answerSlider.disabled = true;
	answerSlider.className = "fade";

	// footnote
	var footnote = document.createElement("div");
	dom.appendChild(footnote);
	footnote.innerHTML = "* " + config.footnote + " <a target='_blank' href='"+config.source+"'>(source)</a>";
	footnote.className = "fade";

}

// Make slider from config
function makeSlider(conf, value){
	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = conf.min;
	slider.max = conf.max;
	slider.step = conf.step;
	slider.value = value;
	return slider;
}

// Parse string with nums
function modifyStringWithNums(str, num){

	// If there's a {||}, replace that first...
	var match = str.match(/\{.*\}/g);
	if(str.indexOf(match)>=0){
		var substr;
		if(num<0){
			substr = /\{([^\|]*)\|/.exec(match)[1];
		}else if(num==0){
			substr = /\|(.*)\|/.exec(match)[1];
		}else if(num>0){
			substr = /\|([^\|]*)\}/.exec(match)[1];
		}
		str = str.replace(match, substr);
	}

	// Replace the number
	str = str.replace("[N]", Math.abs(num));

	return str;

}

// The poor man's jQuery
function $(query){
	return document.querySelector(query);
}

// From https://stackoverflow.com/a/2450976
function shuffle(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}