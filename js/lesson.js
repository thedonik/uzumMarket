const API_KEY = 'ff1500955d7a8d833b69f2766606a60b';

// fetch(
// 	`https://api.openweathermap.org/data/2.5/weather?q=${'tashkent'}&units=metric&APPID=46351da790226c653537b9628dc20463`
// )
// 	.then((json) => json.json())
// 	.then((data) => {
// 		console.log(data);
// 	});
fetch(`https://cat-fact.herokuapp.com/facts`)
	.then((json) => json.json())
	.then((data) => {
		console.log(data);
	});