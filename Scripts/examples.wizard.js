/*
Name: 			Forms / Wizard - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version: 	1.5.4
*/

(function($) {

	'use strict';
    	
	/*
	Wizard #5
	*/
	var $w5finish = $('#w5').find('ul.pager li.finish'),
		$w5validator = $("#w5 form").validate({
		highlight: function(element) {
			$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		},
		success: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
			$(element).remove();
		},
		errorPlacement: function( error, element ) {
			element.parent().append( error );
		}
	});

	$w5finish.on('click', function( ev ) {
	    ev.preventDefault();       
		var validated = $('#w5 form').valid();       
	});

	$('#w5').bootstrapWizard({
	   
		tabClass: 'wizard-steps',
		nextSelector: 'ul.pager li.next',
		previousSelector: 'ul.pager li.previous',
		firstSelector: null,
		lastSelector: null,
		onNext: function (tab, navigation, index, newindex) {

		   

			var validated = $('#w5 form').valid();
			if( !validated ) {
				$w5validator.focusInvalid();
				return false;
			}

			var $total = navigation.find('li').length;
			var $current = index + 1;
			var $percent = ($current / $total) * 100;
		    //$('#w5').find('.progress-bar').css({ 'width': $percent + '%' }).text($percent + '%');
			$('#w5').find('.progress-bar').css({ 'width': $percent + '%' }).text($current + '/' + $total);
	
		},
		onTabChange: function (tab, navigation, index, newindex) {
		  
		    if (newindex < index)
		    {
                var $totalx = navigation.find('li').length;
                var $current = newindex + 1;
		        var $newpercent = ($current / $totalx) * 100;
		        //$('#w5').find('.progress-bar').css({ 'width': $newpercent + '%' }).text($newpercent + '%');
		        $('#w5').find('.progress-bar').css({ 'width': $newpercent + '%' }).text($current + '/' + $totalx);
		    }

		    var $total = navigation.find('li').length - 1;		  
			$w5finish[ newindex != $total ? 'addClass' : 'removeClass' ]( 'hidden' );
			$('#w5').find(this.nextSelector)[ newindex == $total ? 'addClass' : 'removeClass' ]( 'hidden' );
		},
		onTabShow: function (tab, navigation, index) {
		   
			var $total = navigation.find('li').length;
			var $current = index + 1;
			var $percent = ($current / $total) * 100;			
			$('#w5').find('.progress-bar').css({ 'width': $percent + '%' });
          
		}
	});

}).apply(this, [jQuery]);
