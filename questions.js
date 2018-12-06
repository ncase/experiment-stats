var QUESTIONS = [

	// Make all the questions relative
	// data is then absolute, with source

	// Democracy
	{
		q: "What % of the world's population lives in a democracy?",
		label: "In 2015, <b>[N]%</b> of the human beings lived in a democracy",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 56,
		footnote: "55.8% in democracies, 16.8% in half-democracies/'anocracies'",
		source: "https://ourworldindata.org/grapher/world-pop-by-political-regime?stackMode=relative"
	},

	// Air Pollution
	{
		q: "How has air pollution changed? (measured in micrograms per cubic meter of air)",
		label: "From 1990 to 2015, air pollution <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: 11,
		footnote: "from 39.57 to 43.98 µg/m<sup>3</sup>",
		source: "https://ourworldindata.org/grapher/PM25-air-pollution?tab=chart&country=OWID_WRL"
	},

	// Mental Health
	{
		q: "What % of the worldwide population has at least one mental health or substance abuse disorder?",
		label: "In 2016, <b>[N]%</b> of people have mental/substance abuse issues",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 15,
		footnote: "includes: anxiety, depression, bipolar, schizophrenia, eating disorder, alcoholism/drug addiction",
		source: "https://ourworldindata.org/grapher/share-with-mental-and-substance-disorders?tab=chart&country=OWID_WRL"
	},

	// Childbirth
	{
		q: "How has the world's fertility rate (live births per woman) changed?",
		label: "From 1950 to 2015, the fertility rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -51,
		footnote: "from 5.05 to 2.49 live births per woman",
		source: "https://ourworldindata.org/grapher/children-per-woman-UN?tab=chart&country=OWID_WRL"
	},

	// Global CO2 emissions
	{
		q: "How much has global annual CO<sub>2</sub> emissions changed?",
		label: "From 1959 to 2016, CO<sub>2</sub> emissions <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:0, max:400, step:1 },
		defaultValue: 0,
		answerValue: 302,
		footnote: "from 8,991 to 36,183 million tonnes per year",
		source: "https://ourworldindata.org/grapher/annual-co-emissions-per-country?tab=chart&country=OWID_WRL"
	},

	// Suicide
	{
		q: "How has the worldwide (age-standardized) suicide death rate changed?",
		label: "From 1990 to 2016, the suicide rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -33,
		footnote: "from 16.57 per 100,000 deaths to 11.16 per 100,000 deaths",
		source: "https://ourworldindata.org/grapher/suicide-death-rates?tab=chart&country=OWID_WRL"
	},

	// Extreme Poverty
	{
		q: "How has the worldwide % of people in extreme poverty (less than $1.9/day, inflation-adjusted) changed?",
		label: "From 1910 to 2015, the extreme poverty rate <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -88,
		footnote: "from 82.4% to 9.6%. note that's an absolute drop by 73 <i>percentage-points</i>, but a relative drop by 88 <i>percent.</i> sorry, stats language is weird.",
		source: "https://ourworldindata.org/grapher/world-population-in-extreme-poverty-absolute?stackMode=relative"
	},

	// Deaths pt 1
	{
		q: "What % of worldwide deaths are from (direct) violence?",
		label: "In 2016, the % of deaths from homicide/war/terrorism was <b>[N]%</b>",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 1,
		footnote: "homicide: 0.71%, conflict: 0.21%, terrorism: 0.06%",
		source: "https://ourworldindata.org/grapher/share-of-deaths-by-cause-2016"
	},

	// Deaths pt 2
	{
		q: "What % of worldwide deaths are from heart disease?",
		label: "In 2016, the % of deaths from heart disease was <b>[N]%</b>",
		slider:{ min:0, max:100, step:1 },
		defaultValue: 0,
		answerValue: 32,
		footnote: "cardiovascular disease: 32.26%",
		source: "https://ourworldindata.org/grapher/share-of-deaths-by-cause-2016"
	},

	// Nuclear Warheads
	{
		q: "How has the number of nuclear warheads in the world changed?",
		label: "From 1986 to 2014, the # of nukes <b>{decreased by [N]%|stayed the same|increased by [N]%}</b>",
		slider:{ min:-100, max:100, step:1 },
		defaultValue: 0,
		answerValue: -84,
		footnote: "from approximately 64,449 to 10,145",
		source: "https://ourworldindata.org/grapher/number-of-nuclear-warheads-in-the-inventory-of-the-nuclear-powers"
	}


];