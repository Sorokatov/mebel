/* App JS */

;(function () {

    var app = {

        CONSTANTS: {
            filtersItemThreshold: 4
        },

        SELECTORS: {
            parallaxContainer: '.js-parallax',
            newsSlider: '.js-news-slider',
            orderFilter: '.js-order-filter',
            filterCategory: '.js-filter-category',
            filterItem: '.js-filter-item',
            filterItemInput: '.js-filter-item-input',
            filterItemValue: '.js-filter-item-value',
            filterVisibilityToggle: '.js-filter-visibility-toggle',
            filterVisibilityCounter: '.js-hidden-filters-count',
            filterVisibilityShowText: '.js-filter-show-text',
            filterVisibilityHideText: '.js-filter-hide-text'

        },

        CLASSES: {
            hidden: '_hidden',
            open: '_open'
        },

        init: function () {
            this.initEventListeners();
            this.initParallax();
            this.initSlider();
            this.initSelectmenu();
            this.initFiltersCount();
        },

        initEventListeners: function () {
            $(document).on('click', this.SELECTORS.filterVisibilityToggle, this.toggleFiltersVisibility.bind(this));
            $(document).on('change', this.SELECTORS.filterItemInput, this.changeFilterState.bind(this));
        },

        initSelectmenu: function () {
            $(this.SELECTORS.orderFilter).selectmenu({
                appendTo: $(this.SELECTORS.orderFilter).parent()
            });
        },

        initParallax: function () {

            $(this.SELECTORS.parallaxContainer).parallax({
                imageSrc: '../images/parallax.jpg',
                speed: 0.05
            });
        },

        initSlider: function () {

            $(this.SELECTORS.newsSlider).slick({
                dots: false,
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            })
        },

        initFiltersCount: function () {
            var $filterCategories = $(this.SELECTORS.filterCategory),
                filterItemsThreshold = this.CONSTANTS.filtersItemThreshold;

            if ($filterCategories.length) {

                $.each($filterCategories, function (index, value) {
                    var $self = $(value),
                        $filterItems = $self.find(this.SELECTORS.filterItem);

                    if ($filterItems.length > filterItemsThreshold) {
                        var $visibilityToggle = $self.find(this.SELECTORS.filterVisibilityToggle);

                        $filterItems.slice(filterItemsThreshold).addClass(this.CLASSES.hidden);
                        $self.find(this.SELECTORS.filterVisibilityCounter)
                             .text($filterItems.length - filterItemsThreshold);

                        $visibilityToggle.removeClass(this.CLASSES.hidden);
                    }
                }.bind(this));
            }
        },

        toggleFiltersVisibility: function (event) {
            var $self = $(event.currentTarget),
                $parentCategory = $self.closest(this.SELECTORS.filterCategory),
                $categoryFilters = $parentCategory.find(this.SELECTORS.filterItem);

            event.preventDefault();
            $categoryFilters.slice(this.CONSTANTS.filtersItemThreshold).toggleClass(this.CLASSES.hidden);
            $self.find(this.SELECTORS.filterVisibilityHideText).toggleClass(this.CLASSES.hidden);
            $self.find(this.SELECTORS.filterVisibilityShowText).toggleClass(this.CLASSES.hidden);
        },

        changeFilterState: function (event) {

        }
    };

    $(document).ready(function () {
        app.init();
    });
}());