window.CONDITION;
window.GIVE_REVISIT_SURVEY = false;
window.SKIP_TO_DEBRIEF = false;
window.BEEN_HERE_BEFORE = localStorage.getItem('been_here_before');
window.onload = function(){

	gotoCondition("random");
	
	// Give revisit if from Patreon, or have been here before...
	if(window.location.hash=="#patreon"){
		gotoCondition("experimental"); // also give patreon's "experimental"
		window.GIVE_REVISIT_SURVEY = true;
	}
	if(window.location.hash=="#experimental"){
		gotoCondition("experimental");
		window.GIVE_REVISIT_SURVEY = true;
	}
	if(window.location.hash=="#control"){
		gotoCondition("control");
		window.GIVE_REVISIT_SURVEY = true;
	}
	if(window.BEEN_HERE_BEFORE){
		window.GIVE_REVISIT_SURVEY = true;
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
	
			localStorage.setItem('been_here_before', 'YUP'); // YUP
			
			// show the right survey (or revisit/patreon)
			var survey_link;
			if(window.GIVE_REVISIT_SURVEY){
				survey_link = "1FAIpQLScyKSri3VfAP-D9YicotA3ozM9hIutbTiQhJZDKPIIaQa1cjw"; // revisit
			}else if(window.CONDITION=="control"){
				survey_link = "1FAIpQLSdcOenaD3Ta6-E2q613dpE3DUJAcDrpu2OpxFUW18s1ZjoH4A"; // control
			}else if(window.CONDITION=="experimental"){
				survey_link = "1FAIpQLSeyubO7738LVv-FLGI6X768khaSxxB0FpBEC1v3PBdnNOA-9Q"; // experimental
			}
			$("#survey_embed").innerHTML = '<iframe src="https://docs.google.com/forms/d/e/'+survey_link+'/viewform?embedded=true" width="600" height="3300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';

			break;
		case "debrief":

			localStorage.setItem('been_here_before', 'YUP'); // YUP

			window.SKIP_TO_DEBRIEF = true; // next time, just skip!

			// show the alternative
			$("#debrief_control").style.display = "none";
			$("#debrief_experimental").style.display = "none";
			if(window.CONDITION=="control"){
				$("#debrief_control").style.display = "inline";
			}else{
				$("#debrief_experimental").style.display = "inline";
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
		q_image.src = config.img;
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
		var guessSlider = makeSlider(config.slider, config.defaultValue, {bg:"#333333"});
		dom.appendChild(guessSlider.container);
		guessSlider.input.oninput = function(){
			YOUR_GUESS = parseFloat(guessSlider.input.value);
			guessSlider.update_bar();
			_updateGuessLabel();
		};
		guessSlider.input.onmousedown = guessSlider.input.ontouchstart = function(){
			answerButton.setAttribute("disabled", "no");
			answerButton.innerHTML = "show answer";
		};

		// ONLY IF FIRST QUESTION: 
		var instruction;
		if(QUESTION_INDEX==0){
			instruction = document.createElement("div");
			dom.appendChild(instruction);
			instruction.className = "instruction";
			instruction.innerHTML = "☝️ drag slider to guess!";
		}

		// Show answer button
		var answerButton = document.createElement("div");
		answerButton.className = "answer_button";
		dom.appendChild(answerButton);
		answerButton.setAttribute("disabled", "yes");
		answerButton.innerHTML = "(guess first!)";
		answerButton.onclick = function(){
			
			if(instruction) instruction.style.display = "none";

			guessSlider.input.disabled = true;
			answerButton.style.display = "none";
			answerLabel.style.opacity = 1;
			answerSlider.container.style.opacity = 1;
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
		var answerSlider = makeSlider(config.slider, config.answerValue, {bg:"#58a6da"});
		dom.appendChild(answerSlider.container);
		answerSlider.container.className = "fade";
		answerSlider.input.disabled = true;
		answerSlider.input.className = "answer_slider";

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
		q_image.src = config.img;
		q.appendChild(q_image);
		var q_text = document.createElement("div");
		q.appendChild(q_text);
		var answer = modifyStringWithNums(config.label2, config.answerValue);
		var questionNum = "<b>World Statistic " + (QUESTIONS.indexOf(config)+1) + " of " + QUESTIONS.length + ":</b><br>";
		q_text.innerHTML = questionNum + "<span class='answer_label'>"+answer+"</span>";

		// Slider, showing the stat
		var answerSlider = makeSlider(config.slider, config.answerValue, {bg:"#58a6da"});
		dom.appendChild(answerSlider.container);
		answerSlider.input.disabled = true;
		answerSlider.input.className = "answer_slider";

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
	"last one!"
]

// Make slider from config
function makeSlider(conf, value, bar_options){

	var container = document.createElement("div");
	container.setAttribute("slider","yes");

	var slider = document.createElement("input");
	container.appendChild(slider);
	slider.type = "range";
	slider.min = conf.min;
	slider.max = conf.max;
	slider.step = conf.step;
	slider.value = value;

	var bar = document.createElement("div");
	bar.style.background = bar_options.bg;
	container.appendChild(bar);
	var update_bar = function(){
		var guess = parseFloat(slider.value);
		var left = (0-conf.min)/(conf.max-conf.min);
		var width = guess/(conf.max-conf.min);
		if(width<0){
			left = left+width;
			width = Math.abs(width);
		}
		if(conf.min==0){
			bar.style.borderRadius = "10px 0 0 10px;";
			bar.style.left = "0px";
			bar.style.width = ((width*580)+10)+"px";
		}else{
			bar.style.left = Math.floor((left*580)+10)+"px";
			bar.style.width = Math.ceil(width*580)+"px";
		}
	};
	update_bar();

	// TICKS in CONTROL
	if(window.CONDITION=="control"){
		container.style.marginTop = "20px";

		var add_tick = function(num){

			var span = document.createElement("span");
			span.innerHTML = num+"%";

			var x = (num-conf.min)/(conf.max-conf.min);
			x = Math.floor(x*560);
			if(x>400){
				span.style.textAlign = "right";
			}else if(x>200){
				span.style.textAlign = "center";
			}
			span.style.left = x+"px";
			container.appendChild(span);

		}

		// add ticks for MIN, MAX, and DEFAULT (if not equal to min)
		add_tick(conf.max);
		add_tick(conf.min);
		if(conf.min<0) add_tick(0);

	}

	return {
		container: container,
		update_bar: update_bar,
		input: slider
	};

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