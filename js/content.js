var websiteHtml = $("html").html();

var typedWords = "";

var sentimentScore = null;

const NEGATIVE_SCORE_THRESHOLD = -0.5;

fetch(`https://streamlyne.stream:3002/sentiment?q=${encodeURIComponent(websiteHtml)}&type=HTML`).then((res) => {
	return res.json();
}).then(function(json){
	console.log(json);
	sentimentScore = json[0].documentSentiment.score;
	console.log(json[0].documentSentiment);
});

console.log(chrome);

console.log(sentimentScore);
$("html").on("keydown", function(e){
	if(e.key === "Backspace"){
		typedWords = typedWords.slice(0, typedWords.length-1);
	} else {
		typedWords += e.key;

		if(typedWords.length > 300){
			typedWords = "";
		}

		fetch(`https://streamlyne.stream:3002/sentiment?q=${encodeURIComponent(typedWords.replace(/of/g, "").replace(/the/g, "").replace(/this/g, "").replace(/and/g, ""))}`).then((res) => {
			return res.json();
		}).then((json) => {
			console.log(json);
			sentimentScore = json[0].documentSentiment.score * (json[0].documentSentiment.magnitude + 1);
			// if(
			// 	(typedWords.includes("kill") && typedWords.includes("myself")) ||
			// 	(typedWords.includes("end") && typedWords.includes("my") && typedWords.includes("life"))
			// ){
			// 	console.log("GG.");
			// 	sentimentScore -= 0.4;
			// }
			if(sentimentScore < NEGATIVE_SCORE_THRESHOLD){
				sendMessage("open_tab", {url: chrome.extension.getURL("html/boosters.html")}, function(){});
			}
			console.log(json[0].documentSentiment);
		});
	}

	console.log(typedWords);
});

function sendMessage(message_name, data, callback){
	chrome.runtime.sendMessage({
		message: message_name,
		body: data
	}, function(response) {
		callback(response);
	});
}