/*
Name: 			Demos - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	5.1.0
*/



    
(function( $ ) {

	'use strict';
	


    // Carousels
	$('.owl-carousel-expert').each(function () {
	    $(this).owlCarousel({
	        items: 1,
	        margin: 0,
	        autoPlay: 1000,
	        navigation : false, 
	        slideSpeed: 300,
	        stopOnHover:true,
	        paginationSpeed : 400,
	        singleItem:true,
	        loop: true,
	        nav: false,
	        dots: true,
	        stagePadding: 0,
	        navText: [],
	        autoplayHoverPause: true,
	        autoplay: true,
	    });
	});

	$('.featured-products-carousel').owlCarousel({
	    loop: false,
	    responsive: {
	        0: {
	            items: 1,
	        },
	        500: {
	            items: 2,
	            autoWidth: false,
	            margin: 8,
	        },
	        700: {
	            items: 3,
	            autoWidth: false,
	            margin: 5,	        

	        },
	        950: {
	            items: 4,
	            margin: 5,
               
	        },
	        1200: {
	            items: 4,
	            margin: 5,
	        }
	    },
	    owl2row: true, // enable plugin  
	    nav: true,
	    navText: [],
	    dots: false,
	    autoWidth: false
	});

	
}).apply( this, [ jQuery ]);