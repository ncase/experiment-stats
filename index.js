addQuestion({
	q: "Take a guess: how much does the Top 1% get in the US?",
	label: "The US's Top 1% gets <b>[N]%</b> of the country's total income",
	slider:{ min:0, max:100, step:1 },
	defaultValue: 1,
	answerValue: 20
});

function addQuestion(config){

	var dom = document.createElement("div");
	$("#stats").appendChild(dom);

	// Question
	var q = document.createElement("div");
	dom.appendChild(q);
	q.innerHTML = config.q;
	q.style.fontWeight = "bold";

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

	// Show answer button
	var answerButton = document.createElement("button");
	dom.appendChild(answerButton);
	answerButton.innerHTML = "show answer";
	answerButton.onclick = function(){
		guessSlider.disabled = true;
		answerButton.style.display = "none";
		answerLabel.style.opacity = 1;
		answerSlider.style.opacity = 1;
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
	str = str.replace("[N]",num);
	return str;
}

// The poor man's jQuery
function $(query){
	return document.querySelector(query);
}