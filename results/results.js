window.QUESTIONS = {
	violence: {
		img: "../facts/violence.png",
		q: "<b>Q1:</b> What % of worldwide deaths are from homicide + war + terrorism combined?",
		label: "In 2016, % of deaths from direct violence was <b>[N]%</b>",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 1,
		footnote: "homicide: 0.71%, conflict: 0.21%, terrorism: 0.06%",
		source: "https://ourworldindata.org/grapher/share-of-deaths-by-cause-2016",
		unlock: "section_2"
	},
	co2: {
		img: "../facts/co2.png",
		q: "<b>Q2:</b> How much has global annual CO<sub>2</sub> emissions changed over time?",
		label: "From 1959 to 2016, CO<sub>2</sub> emissions <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:0, max:400, step:1 },
		defaultValue: 0,
		answerValue: 302,
		footnote: "from 8,991 to 36,183 million tonnes per year",
		source: "https://ourworldindata.org/grapher/annual-co-emissions-per-country?tab=chart&country=OWID_WRL",
		unlock: "section_3"
	},
	nukes: {
		img: "../facts/nuke.png",
		q: "<b>Q3:</b> How has the number of nuclear warheads in the world changed over time?",
		label: "From 1986 to 2014, the # of nukes <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -84,
		footnote: "from approximately 64,449 to 10,145",
		source: "https://ourworldindata.org/grapher/number-of-nuclear-warheads-in-the-inventory-of-the-nuclear-powers",
		unlock: "section_4"
	},
	result: {
		img: "data.png",
		q: "How did the experiment 'predict-it-first' group do, compared to the control 'just-see-the-stats' group?",
		label: "The experimental group remembered <b>{[N]% less than|as much as|[N]% more than}</b> control",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: 0,
		//footnote: "from approximately 64,449 to 10,145",
		//source: "https://ourworldindata.org/grapher/number-of-nuclear-warheads-in-the-inventory-of-the-nuclear-powers",
		unlock: "section_5"
	}
}

window.onload = function(){
	document.querySelectorAll(".guesser").forEach(function(guesser){
		showQuestion(guesser.id);
	});
}

function revealSection(id){
	var dom = document.querySelector("#"+id);
	dom.style.display = "block";
	setTimeout(function(){
		dom.style.opacity = 1;
	},100)
}

function skipAll(){
	revealCallbacks.forEach(function(callback){
		callback();
		revealSection("section_2");
		revealSection("section_3");
		revealSection("section_4");
		revealSection("section_5");
	});
}
var revealCallbacks = [];

function showQuestion(id){

	var dom = document.querySelector("#"+id);
	var config = QUESTIONS[id];

	// Question
	var q = document.createElement("div");
	q.className = "question";
	dom.appendChild(q);
	var q_image = new Image();
	q_image.src = config.img;
	q.appendChild(q_image);
	var q_text = document.createElement("div");
	q.appendChild(q_text);
	//var questionNum = "<b>Question " + (QUESTIONS.indexOf(config)+1) + " of " + QUESTIONS.length + ":</b> ";
	q_text.innerHTML = config.q; //questionNum + config.q;

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
	if(id=="violence"){
		instruction = document.createElement("div");
		dom.appendChild(instruction);
		instruction.className = "instruction";
		instruction.innerHTML = "☝️ drag slider to guess! (or: <b><a href='#' onclick='skipAll()'>skip these guessing games</a></b>)";
	}

	// Show answer button
	var answerButton = document.createElement("div");
	answerButton.className = "answer_button";
	dom.appendChild(answerButton);
	answerButton.setAttribute("disabled", "yes");
	answerButton.innerHTML = "(guess first!)";
	var revealMe = function(){
		if(instruction) instruction.style.display = "none";
		guessSlider.input.disabled = true;
		answerButton.style.display = "none";
		answerLabel.style.opacity = 1;
		answerSlider.container.style.opacity = 1;
		if(footnote) footnote.style.opacity = 1;
	};
	revealCallbacks.push(revealMe);
	answerButton.onclick = function(){
		revealMe();
		setTimeout(function(){
			revealSection(config.unlock);
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
	var footnote;
	if(config.footnote){
		footnote = document.createElement("div");
		dom.appendChild(footnote);
		footnote.innerHTML = "* " +config.footnote + " <a target='_blank' href='"+config.source+"'>(source)</a>";
		footnote.className = "fade footnote";
	}

}


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