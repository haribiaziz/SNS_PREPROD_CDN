$(function () {

    $('.header-carousel').owlCarousel({
        loop: false,
        responsive: {
            0: {
                items: 1
            },
            620: {
                items: 2
            },
            1200: {
                items: 3
            }
        },
        margin: 5,
        nav: false,
        navText: [],
        dots: true,
        autoWidth: false
    });
});

setCarousel();
function setCarousel() {
    $('.featured-products-carousel').owlCarousel({
        loop: false,
        responsive: {
            0: {
                items: 1
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
        margin: 5,
        nav: true,
        navText: [],
        dots: false,
        autoWidth: false
    });
}


