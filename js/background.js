chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(chrome);
		if(request.message === "store_data"){
			chrome.storage.sync.set(request.body.store, function() {
				sendResponse({
					"code": 200,
					"message": "Successfully stored data."
				});
			});
		} else if(request.message === "retrieve_data"){
			chrome.storage.sync.get(request.body.keys, function(result) {
				sendResponse({
					"code": 200,
					"data": result
				});
			});
		} else if(request.message === "open_tab"){
			chrome.tabs.create({
				url: request.body.url
			});
		}
	}
);


function sendMessage(message_name, data, callback){
	chrome.runtime.sendMessage({
		message: message_name,
		body: data
	}, function(response) {
		callback(response);
	});
}



// EXAMPLE: sendMessage("store_data", {contacts: []}, function(res){})