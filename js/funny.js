fetch("https://www.reddit.com/r/funny.json?&limit=40").then(function(data){
	return data.json();
}).then(function(json){
	var posts = shuffle(json.data.children).filter(x => {
		console.log(x.data.over_18);
		return !x.data.over_18;
	});
	console.log(posts);
	for (var i = 0; i < posts.length; i++) {
		if(posts[i].data.url.toLowerCase().includes(".png") ||
			posts[i].data.url.toLowerCase().includes(".jpg") ||
			posts[i].data.title.toLowerCase().includes("..") ||
			posts[i].data.title.toLowerCase().includes("accurate") ||
			posts[i].data.title.toLowerCase().includes("meirl") ||
			posts[i].data.title.toLowerCase().includes("ugly") ||
			posts[i].data.title.toLowerCase().includes("me_irl")
		){
			$("#funnyCard .card-img-top").attr("src", posts[i].data.url);
			$("#funnyCard .card-title").html(posts[i].data.title);
			break;
		}
		console.log(posts[i].data.url, posts[i].data.title);
	}
});

function shuffle(array) {
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
};