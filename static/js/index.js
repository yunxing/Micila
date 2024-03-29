$(function(){

    var channel = $( "#channel" ),
    email = $( "#email" ),
    allFields = $( [] ).add( channel ).add( email ),
    tips = $( ".validateTips" );

    $(document).keypress(function(e) {
	if (e.which == 13)
	    validate();
    })
    $( "#tabs" ).tabs();

    function validate()
    {
	var bValid = true;
	allFields.removeClass( "ui-state-error" );

	bValid = bValid && checkLength( email, "email", 6, 80 );
	bValid = bValid && checkLength( channel, "channel", 3, 16 );
	
	bValid = bValid && checkRegexp( channel, /^[a-z]([0-9a-z_])+$/i, "channel may consist of a-z, 0-9, underscores, begin with a letter." );
	// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
	bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@micila.com" );
	if ( bValid ) {
	    document.forms["chat_form"].submit();
	}
    }
    function updateTips( t ) {
	tips
	    .text( t )
	    .addClass( "ui-state-highlight" );
	setTimeout(function() {
	    tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
    }
    
    function checkLength( o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
	    o.addClass( "ui-state-error" );
	    updateTips( "Length of " + n + " must be between " +
			min + " and " + max + "." );
	    return false;
	} else {
	    return true;
	}
    }
    
    function checkRegexp( o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
	    o.addClass( "ui-state-error" );
	    updateTips( n );
	    return false;
	} else {
	    return true;
	}
    }

    // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
    $( "#dialog:ui-dialog" ).dialog( "destroy" );
    

    
    $( "#dialog:ui-dialog" ).dialog( "destroy" );
    
    $("#join-channel").button().click(function()
				      {validate();}
				     );
    
    $( "#join" ).button().click(function() {
	$( "#dialog-form" ).dialog( "open" );
    });

    $( "#dialog-form" ).dialog({
	autoOpen: false,
	height: 600,
	width: 400,
	modal: true,
	close: function() {
	    allFields.val( "" ).removeClass( "ui-state-error" );
	}
    });

    
});