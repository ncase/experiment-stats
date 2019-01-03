window.CONDITION;
window.GIVE_DECOY_SURVEY = false;
window.SKIP_TO_DEBRIEF = false;
window.BEEN_HERE_BEFORE = localStorage.getItem('been_here_before');
window.onload = function(){

	gotoCondition("random");
	
	// Give decoy if from Patreon, or have been here before...
	if(window.location.hash=="#patreon"){
		gotoCondition("experimental"); // also give patreon's "experimental"
		window.GIVE_DECOY_SURVEY = true;
	}
	if(window.BEEN_HERE_BEFORE){
		window.GIVE_DECOY_SURVEY = true;
	}

};


function gotoCondition(condition){
	if(!condition || condition=="random"){
		// RANDOM ASSIGNMENT
		condition = (Math.random()>0.5) ? "control" : "experimental";
	}
	window.CONDITION = condition;
}
function play_control(){
	gotoCondition("control");
	showScreen("stats");
}
function play_experimental(){
	gotoCondition("experimental");
	showScreen("stats");
}
function lets_go(){
	localStorage.setItem('been_here_before', 'YUP');
	showScreen("stats");
}

function showScreen(screen_name){

	// IF SKIP TO DEBRIEF & on "survey", do that
	if(screen_name=="survey" && window.SKIP_TO_DEBRIEF){
		screen_name = "debrief";
	}

	// Fade away current one, fade in new one
	var screens = [$("#intro"), $("#stats"), $("#survey"), $("#debrief")];
	var currentScreen = screens.find(function(s){
		return s.style.opacity == 1;
	});
	currentScreen.style.opacity = 0;
	setTimeout(function(){

		currentScreen.style.display = "none";

		var newScreen = $("#"+screen_name);
		newScreen.style.display = "block";
		setTimeout(function(){
			newScreen.style.opacity = 1;
		},100);

		// Scroll to top
		document.body.scrollTop = document.documentElement.scrollTop = 0;

	}, 500);

	switch(screen_name){
		case "stats":

			$("#stats").innerHTML = "";
			QUESTION_INDEX = 0;
			QUESTIONS = shuffle(QUESTIONS); // Randomize!
			nextQuestion();

			break;
		case "survey":
			
			// show the right survey (or decoy, if revisit/patreon)
			$("#survey_foobar").innerHTML = window.GIVE_DECOY_SURVEY ? "decoy" : window.CONDITION;

			break;
		case "debrief":

			window.SKIP_TO_DEBRIEF = true; // next time, just skip!

			// show the alternative
			$("#debrief_control").style.display = "none";
			$("#debrief_experimental").style.display = "none";
			if(window.CONDITION=="control"){
				$("#debrief_control").style.display = "inline-block";
			}else{
				$("#debrief_experimental").style.display = "inline-block";
			}

			break;
	}


}


//////////////////////////////////////////////////
//////////////////////////////////////////////////

// LIST OF QUESTIONS
var QUESTION_INDEX = 0;
var QUESTIONS = []; // filled in questions.js

// Show next question
function nextQuestion(){
	if(QUESTION_INDEX<QUESTIONS.length){
		addQuestion(QUESTIONS[QUESTION_INDEX]);
	}else if(QUESTION_INDEX==QUESTIONS.length){
		showTheEndButton();
	}
	QUESTION_INDEX++;
}
function showTheEndButton(){

	// Fade it in
	var dom = document.createElement("div");
	dom.className = "fade";
	setTimeout(function(){
		dom.style.opacity = 1;
	},100);
	$("#stats").appendChild(dom);

	// Actual button
	var answerButton = document.createElement("div");
	answerButton.className = "answer_button the_end";
	dom.appendChild(answerButton);
	answerButton.innerHTML = "CONTINUE ➡️";
	answerButton.onclick = function(){
		showScreen("survey");
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

	// THE EXPERIMENTAL CONDITION
	if(window.CONDITION=="experimental"){

		// Question
		var q = document.createElement("div");
		q.className = "question";
		dom.appendChild(q);
		var q_image = new Image();
		q_image.src = "cat.jpg";
		q.appendChild(q_image);
		var q_text = document.createElement("div");
		q.appendChild(q_text);
		var questionNum = "<b>Question " + (QUESTIONS.indexOf(config)+1) + " of " + QUESTIONS.length + ":</b> ";
		q_text.innerHTML = questionNum + config.q;

		// Config Guess
		config.guessLabel = "Your guess: "+config.label;

		// Guess label
		var guessLabel = document.createElement("div");
		guessLabel.className = "guess_label";
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
			answerButton.setAttribute("disabled", "no");
			answerButton.innerHTML = "show answer";
		};

		// Show answer button
		var answerButton = document.createElement("div");
		answerButton.className = "answer_button";
		dom.appendChild(answerButton);
		answerButton.setAttribute("disabled", "yes");
		answerButton.innerHTML = "(guess first!)";
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
		config.answerLabel = "In fact: "+config.label;

		// Answer label
		var answerLabel = document.createElement("div");
		dom.appendChild(answerLabel);
		answerLabel.className = "fade answer_label";
		answerLabel.innerHTML = modifyStringWithNums(config.answerLabel, config.answerValue);

		// Answer slider
		var answerSlider = makeSlider(config.slider, config.answerValue);
		dom.appendChild(answerSlider);
		answerSlider.disabled = true;
		answerSlider.className = "fade answer_slider";

		// footnote
		var footnote = document.createElement("div");
		dom.appendChild(footnote);
		footnote.innerHTML = "* " +config.footnote + " <a target='_blank' href='"+config.source+"'>(source)</a>";
		footnote.className = "fade footnote";

	}
	if(window.CONDITION=="control"){

		// Question, with correct stat
		var q = document.createElement("div");
		q.className = "question";
		dom.appendChild(q);
		var q_image = new Image();
		q_image.src = "cat.jpg";
		q.appendChild(q_image);
		var q_text = document.createElement("div");
		q.appendChild(q_text);
		var answer = modifyStringWithNums(config.label2, config.answerValue);
		var questionNum = "<b>World Statistic " + (QUESTIONS.indexOf(config)+1) + " of " + QUESTIONS.length + ":</b><br>";
		q_text.innerHTML = questionNum + "<span class='answer_label'>"+answer+"</span>";

		// Slider, showing the stat
		var answerSlider = makeSlider(config.slider, config.answerValue);
		dom.appendChild(answerSlider);
		answerSlider.disabled = true;
		answerSlider.className = "answer_slider";

		// footnote
		var footnote = document.createElement("div");
		dom.appendChild(footnote);
		footnote.innerHTML = "* " +config.footnote + " <a target='_blank' href='"+config.source+"'>(source)</a>";
		footnote.className = "footnote";

		// ok, next
		if(QUESTION_INDEX<QUESTIONS.length-1){

			var answerButton = document.createElement("div");
			answerButton.className = "answer_button";
			dom.appendChild(answerButton);
			answerButton.innerHTML = NEXT_BUTTONS[QUESTION_INDEX];
			answerButton.onclick = function(){
				answerButton.style.display = "none";
				nextQuestion();
			};

		}else{
			showTheEndButton();
		}

	}

}
var NEXT_BUTTONS = [
	"okay, next!",
	"gimme more",
	"what else?",
	"fascinating",
	"another one!",
	"more please",
	"interesting",
	"how 'bout that",
	"just one more!"
]

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