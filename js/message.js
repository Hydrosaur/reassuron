$( document ).ready(function() {
    console.log("doc ready");

	// populate contact list
    var $contacts = $("#contacts-select");
    console.log($contacts);

    var array = store.get("contacts") || {};
    console.log(array);
    $.each(array, function(k,v) {
    	$contacts.append('<option value="' + v.phone + '">' + v.name + '(' + v.phone + ')' + '</option>');
    });

    $("#msg-button").on("click",function(){
        console.log("click");
    	//grab message
    	var msg = $('textarea#message-input').val();
        console.log(msg);
    	//grab number
        var number = $('#contacts-select option:selected').val();
    	console.log(number);
    	

        sendMessage(msg,number).then(function() {
            console.log("sent")
            $( "#msgSent" ).fadeIn("fast").delay(2500).fadeOut("slow");

        });





    });
    
});