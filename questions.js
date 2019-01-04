var QUESTIONS = [

	// Make all the questions relative
	// data is then absolute, with source

	// Democracy
	{
		img: "facts/democracy.png",
		q: "What % of the world's population lives in a democracy?",
		label: "In 2015, <b>[N]%</b> of human beings lived in a democracy",
		label2: "In 2015, <b>[N]%</b> of the world's population lived in a democracy",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 56,
		footnote: "55.8% in democracies, 16.8% in half-democracies/'anocracies'",
		source: "https://ourworldindata.org/grapher/world-pop-by-political-regime?stackMode=relative"
	},

	// Air Pollution
	{
		img: "facts/air.png",
		q: "How has air pollution (small suspended particles) changed over time?",
		label: "From 1990 to 2016, air pollution <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1990 to 2016, air pollution <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: 25,
		footnote: "from 39.58 to 49.67 micrograms per cubic meter of air",
		source: "https://ourworldindata.org/grapher/PM25-air-pollution?tab=chart&country=OWID_WRL"
	},

	// Mental Health
	{
		img: "facts/abuse.png",
		q: "What % of the worldwide population has at least one mental health or substance abuse disorder?",
		label: "In 2016, <b>[N]%</b> had mental/substance abuse issues",
		label2: "In 2016, <b>[N]%</b> of the world's population had at least one mental health/substance abuse disorder",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 15,
		footnote: "includes: anxiety, depression, bipolar, schizophrenia, eating disorder, alcoholism/drug addiction",
		source: "https://ourworldindata.org/grapher/share-with-mental-and-substance-disorders?tab=chart&country=OWID_WRL"
	},

	// Childbirth
	{
		img: "facts/fertility.png",
		q: "How has the world's total fertility rate (# of kids a mother has over a lifetime) changed?",
		label: "From 1950 to 2015, the fertility rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1950 to 2015, the world's total fertility rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -51,
		footnote: "from 5.05 to 2.49 children per mother over a lifetime",
		source: "https://ourworldindata.org/grapher/children-per-woman-UN?tab=chart&country=OWID_WRL"
	},

	// Global CO2 emissions
	{
		img: "facts/co2.png",
		q: "How much has global annual CO<sub>2</sub> emissions changed in the past half-century?",
		label: "From 1959 to 2016, CO<sub>2</sub> emissions <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1959 to 2016, global annual CO<sub>2</sub> emissions <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:0, max:400, step:1 },
		defaultValue: 0,
		answerValue: 302,
		footnote: "from 8,991 to 36,183 million tonnes per year",
		source: "https://ourworldindata.org/grapher/annual-co-emissions-per-country?tab=chart&country=OWID_WRL"
	},

	// Suicide
	{
		img: "facts/suicide.png",
		q: "How has the worldwide (age-standardized) suicide death rate changed?",
		label: "From 1990 to 2016, the suicide rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1990 to 2016, the worldwide (age-standardized) suicide rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -33,
		footnote: "from 16.57 per 100,000 deaths to 11.16 per 100,000 deaths",
		source: "https://ourworldindata.org/grapher/suicide-death-rates?tab=chart&country=OWID_WRL"
	},

	// Extreme Poverty
	{
		img: "facts/poverty.png",
		q: "How has the world's share of people in extreme poverty (less than $1.9/day, inflation-adjusted) changed?",
		label: "From 1910 to 2015, extreme poverty <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1910 to 2015, the world's share of people in extreme poverty (less than $1.9/day, inflation-adjusted) <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -88,
		footnote: "from 82.4% in extreme poverty to 9.6%. note that's an absolute drop by 73 <i>percentage-points</i>, but a relative drop by 88 <i>percent.</i> stats language is weird.",
		source: "https://ourworldindata.org/grapher/world-population-in-extreme-poverty-absolute?stackMode=relative"
	},

	// Deaths pt 1
	{
		img: "facts/violence.png",
		q: "What % of worldwide deaths are from homicide + war + terrorism combined?",
		label: "In 2016, % of deaths from direct violence was <b>[N]%</b>",
		label2: "In 2016, % of worldwide deaths from homicide + war + terrorism combined was <b>[N]%</b>",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 1,
		footnote: "homicide: 0.71%, conflict: 0.21%, terrorism: 0.06%",
		source: "https://ourworldindata.org/grapher/share-of-deaths-by-cause-2016"
	},

	// Deaths pt 2
	{
		img: "facts/heart.png",
		q: "What % of worldwide deaths are from heart disease?",
		label: "In 2016, the % of deaths from heart disease was <b>[N]%</b>",
		label2: "In 2016, the % of worldwide deaths from heart disease was <b>[N]%</b>",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 32,
		footnote: "cardiovascular disease: 32.26%",
		source: "https://ourworldindata.org/grapher/share-of-deaths-by-cause-2016"
	},

	// Nuclear Warheads
	{
		img: "facts/nuke.png",
		q: "How has the number of nuclear warheads in the world changed?",
		label: "From 1986 to 2014, the # of nukes <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		label2: "From 1986 to 2014, the # of nuclear warheads in the world <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -84,
		footnote: "from approximately 64,449 to 10,145",
		source: "https://ourworldindata.org/grapher/number-of-nuclear-warheads-in-the-inventory-of-the-nuclear-powers"
	}

];