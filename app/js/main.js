/* App JS */

;(function () {

    var app = {

        SELECTORS: {
            parallaxContainer: '.js-parallax'
        },

        CLASSES: {

        },

        init: function () {
            this.initEventListeners();
            this.initParallax();
        },

        initEventListeners: function () {

        },

        initParallax: function () {

            $(this.SELECTORS.parallaxContainer).parallax({
                imageSrc: '../images/parallax.jpg',
                speed: 0.05
            });
        }
    };

    $(document).ready(function () {
        app.init();
    });
}());