//= require ../lib/_clipboard.min

$(document).ready(function(){
	$('.highlight').prepend('<a href="javascript: void(0);" class="code-copy-button" ><img class="clippy" width="13" src="../images/clippy.svg" alt="Copy to clipboard"></button>');

	var clipboard = new Clipboard('.code-copy-button', {
	    text: function(trigger) {
	        return trigger.nextElementSibling.innerText;
	    }
	});

	clipboard.on('success', function(e) {
    	e.clearSelection();
	});
});