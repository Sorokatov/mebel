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
            sizeInput: '.js-size-input',
            constructorButton: '.js-constructor-button',
            constructorBlock: '.js-constructor-block',
            constructorValue: '.js-constructor-label-value',
            constructorImage: '.js-constructor-image',
            constructorImagesList: '.js-constructor-images-list',
            constructorNewImg: '.js-constructor-new-img',
            popupToggle: '.js-popup-toggle',
            popup: 'js-popup',
            popupClose: '.js-close-popup'
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
            this.initPopups();
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
            $(document).on('keypress', this.SELECTORS.sizeInput, this.checkSizeInputValue.bind(this));
            $(document).on('click', this.SELECTORS.constructorButton, this.changeConstructorValue.bind(this));
            $(document).on('click', this.SELECTORS.popupClose, this.closePopup);
            $(document).on('click', this.SELECTORS.constructorImage, this.selectImageFromPopup.bind(this))
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

        initPopups: function () {

            $(this.SELECTORS.popupToggle).magnificPopup({
                type: 'inline',
                midClick: true,
                removalDelay: 300
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

            event.preventDefault();
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
                this.showAndUpdateSizeValue($self, true);
            }

            // ENTER
            if(event.keyCode === 13) {
                $self.blur();
            }
        },

        showAndUpdateSizeValue: function (inputElem, shouldBeReset) {
            var $self = inputElem,
                value = $self.val();

            if (shouldBeReset || !(/[0-9]/.test(value))) {
                value = $self.prev().find(this.SELECTORS.sizeValue).data('value');
            }

            $self.addClass(this.CLASSES.hidden)
                .prev().removeClass(this.CLASSES.hidden)
                .find(this.SELECTORS.sizeValue).data('value', value).html(value)
        },

        checkSizeInputValue: function (event) {
            var inputChar = String.fromCharCode(event.which);

            if (!(/[0-9]/.test(inputChar))) {
               event.preventDefault();
            }
        },

        changeConstructorValue: function (event) {
            var $self = $(event.currentTarget),
                $constructorBlock = $self.closest(this.SELECTORS.constructorBlock),
                dataValue = $self.data('value') || '';

            event.preventDefault();
            $constructorBlock.find(this.SELECTORS.constructorButton)
                .removeClass(this.CLASSES.active);

            $constructorBlock.find(this.SELECTORS.constructorValue).text(dataValue);
            $self.addClass(this.CLASSES.active);
        },

        selectImageFromPopup: function (event) {
            // most of this could be replaced with ajax

            var $self = $(event.currentTarget),
                $imagesList = $(this.SELECTORS.constructorImagesList),
                $addedImg = $imagesList.find(this.SELECTORS.constructorNewImg),
                elem = document.createElement('a'),
                img = document.createElement('img');

            event.preventDefault();
            img.src = $self.data('thumb-src') || $self.find('img').get(0).src;
            img.alt = $self.data('alt') || 'colour';
            elem.appendChild(img);
            elem.href = "#";
            elem.classList.add('product-page__constructor-button',
                this.CLASSES.active,
                this.SELECTORS.constructorButton.substring(1),
                this.SELECTORS.constructorNewImg.substring(1));
            elem.dataset.value = $self.data('value');

            if ($addedImg.length) $addedImg.remove();
            $imagesList.find(this.SELECTORS.constructorButton).removeClass(this.CLASSES.active);
            $imagesList.closest(this.SELECTORS.constructorBlock).find(this.SELECTORS.constructorValue).text($self.data('value'));
            $imagesList.append(elem);
            this.closePopup();
        },

        closePopup: function () {
            $.magnificPopup.close();
        }
    };

    $(document).ready(function () {
        app.init();
    });
}());