/*
** file: js/global.js
** description: global javascript library containing code for use across the entire chrome extension, for
**              unique functionality for specific pages, create and use a separate file named "pagename.js"
*/

// get quote from favqs.com, Returns Quote (string)
function getQuote(callback) {
	let url = 'https://favqs.com/api/qotd';
	fetch(url).then(response => response.json()).then(json => {
		callback(`"${json.quote.body}" - ${json.quote.author}`);
	});

	return null;
}

//get Sentiment from Google Cloud API, Returns Promise (array of sentences)
//each sentence has text and sentiment (magnitude and score)
function getSentiment(textstr){
	return fetch(`https://streamlyne.stream:3002/sentiment?q=${encodeURI(textstr)}`).then(res => res[0]);
}

//send 'message' to 'number' via twilio
function sendMessage(message, number){

	return fetch(`https://streamlyne.stream:3002/twilio?to=${encodeURI(number)}&message=${encodeURI(message)}`, {method: "POST"}).then(res => res[0]);
}

// getSentiment("This is a test sentence. I love text sentences").then(res => {
// 	$("#main-outer").html(res);
// });
