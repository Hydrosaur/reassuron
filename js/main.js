/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

function init_main () {
    $('[data-toggle="tooltip"]').tooltip();
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', init_main);

function cb (str) {
	$('#quote').append(str);

}

$(document).ready(function(){
	getQuote(cb)

})