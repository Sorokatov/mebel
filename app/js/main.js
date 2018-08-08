/* App JS */

;(function () {

    var app = {

        SELECTORS: {
            parallaxContainer: '.js-parallax',
            newsSlider: '.js-news-slider'
        },

        CLASSES: {

        },

        init: function () {
            this.initEventListeners();
            this.initParallax();
            this.initSlider();
        },

        initEventListeners: function () {

        },

        initParallax: function () {

            $(this.SELECTORS.parallaxContainer).parallax({
                imageSrc: '../images/parallax.jpg',
                speed: 0.05
            });
        },

        initSlider: function () {

            /*$(this.SELECTORS.newsSlider).owlCarousel({
                autoWidth: true,
                items: 3,
                mergeFit: true,
                merge: true
            });*/

            $(this.SELECTORS.newsSlider).slick({
                dots: false,
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            })
        }
    };

    $(document).ready(function () {
        app.init();
    });
}());