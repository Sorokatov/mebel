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
            filterVisibilityHideText: '.js-filter-hide-text',
            categoryViewContainer: '.js-category-view-container',
            categoryViewContent: '.js-category-view-content',
            categoryViewLink: '.js-category-view-link',
            phoneInput: '.js-phone-number-input',
            colorLink: '.js-color-link',
            sizeLink: '.js-size-link',
            sizeValue: '.js-size-value',
            sizeInput: '.js-size-input'
        },

        CLASSES: {
            hidden: '_hidden',
            open: '_open',
            active: '_active'
        },

        init: function () {
            this.initEventListeners();
            this.initParallax();
            this.initSlider();
            this.initSelectmenu();
            this.initFiltersCount();
            this.initPhoneMask();
        },

        initEventListeners: function () {
            $(document).on('click', this.SELECTORS.filterVisibilityToggle, this.toggleFiltersVisibility.bind(this));
            $(document).on('mouseover', this.SELECTORS.categoryViewLink, this.changeCategoryViewContent.bind(this));
            $(document).on('click', this.SELECTORS.colorLink, this.redirectToProductWithParam.bind(this));
            $(document).on('click', this.SELECTORS.sizeLink, this.showSizeInput.bind(this));
            $(document).on('blur', this.SELECTORS.sizeInput, this.showSizeValue.bind(this));
            $(document).on('keyup', this.SELECTORS.sizeInput, this.handleSizeInputKeys.bind(this));
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

        initPhoneMask: function () {
            $(this.SELECTORS.phoneInput).inputmask({
                mask: '+38 (999) 999-99-99'
            })
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

        changeCategoryViewContent: function (event) {
            var $self = $(event.currentTarget),
                contentAttr = $self.data('content'),
                $contentTarget = $self.closest(this.SELECTORS.categoryViewContainer)
                    .find(this.SELECTORS.categoryViewContent + "[data-content='" + contentAttr + "']");

            if (!$contentTarget.hasClass(this.CLASSES.active)) {
                $(this.SELECTORS.categoryViewContent + ', ' + this.SELECTORS.categoryViewLink).removeClass(this.CLASSES.active);
                $contentTarget.addClass(this.CLASSES.active);
                $self.addClass(this.CLASSES.active);
            }
        },

        redirectToProductWithParam: function (event) {
            event.preventDefault();

            // here should be product redirect by color click
        },

        showSizeInput: function (event) {
            var $self = $(event.currentTarget),
                $sizeInput = $self.next();

            $self.addClass(this.CLASSES.hidden);

            $sizeInput
                .val($self.find(this.SELECTORS.sizeValue).data('value'))
                .removeClass(this.CLASSES.hidden)
                .focus();
        },

        showSizeValue: function (event) {
            event.preventDefault();
            this.showAndUpdateSizeValue($(event.currentTarget));
        },

        handleSizeInputKeys: function (event) {
            var $self = $(event.currentTarget);

            // ESC
            if (event.keyCode === 27) {
                $self.val($self.prev().find(this.SELECTORS.sizeValue).data('value'));
                this.showAndUpdateSizeValue($self);
            }

            // ENTER
            if(event.keyCode === 13) {
                this.showAndUpdateSizeValue($self);
            }

        },

        showAndUpdateSizeValue: function (inputElem) {
            var $self = inputElem,
                value = $self.val();

            $self.addClass(this.CLASSES.hidden)
                .prev().removeClass(this.CLASSES.hidden)
                .find(this.SELECTORS.sizeValue).data('value', value).html(value)
        }
    };

    $(document).ready(function () {
        app.init();
    });
}());