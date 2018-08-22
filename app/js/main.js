/* App JS */

;(function () {

    var app = {

        CONSTANTS: {
            filtersItemThreshold: 4,
            responseSymbolThreshold: 180,
            responsesCountThreshold: 3
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
            popupClose: '.js-close-popup',
            responsesContainer: '.js-responses',
            responsesItem: '.js-responses-item',
            responsesItemText: '.js-responses-item-text',
            responsesItemToggle: '.js-responses-toggle',
            responsesItemToggleText: '.js-responses-toggle-text',
            responsesNav: '.js-responses-nav',
            responsesNavItem: '.js-responses-nav-item',
            responsesSendButton: '.js-send-response',
            sizeHintWrap: '.js-size-hint-wrap',
            sizeHintOpen: '.js-size-hint-open',
            sizeHintClose: '.js-size-hint-close',
            productGallery: '.js-product-gallery',
            productGalleryThumb: '.js-product-gallery-thumb',
            productGalleryImg: '.js-product-gallery-img',
            deleteItemButton: '.js-delete-item',
            deleteItemTooltip: '.js-delete-item-tooltip',
            deleteItemAction: '.js-delete-item-action',
            promo: '.js-promo',
            promoClose: '.js-promo-close'
        },

        CLASSES: {
            hidden: '_hidden',
            open: '_open',
            active: '_active',
            collapsed: '_collapsed',
            disabled: '_disabled'
        },

        init: function () {
            this.initEventListeners();
            this.initParallax();
            this.initSlider();
            this.initGallery();
            this.initPopups();
            this.initSelectmenu();
            this.initFiltersCount();
            this.initResponsesVisibility();
            this.initPhoneMask();
            this.showSizesHintInSession();
            this.showPromo();
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
            $(document).on('click', this.SELECTORS.constructorImage, this.selectImageFromPopup.bind(this));
            $(document).on('click', this.SELECTORS.responsesItemToggle, this.toggleResponseVisibility.bind(this));
            $(document).on('click', this.SELECTORS.responsesNavItem, this.handleResponseNavAction.bind(this));
            $(document).on('click', this.SELECTORS.responsesSendButton, this.sendResponse.bind(this));
            $(document).on('click', this.SELECTORS.sizeHintOpen + ', ' + this.SELECTORS.sizeHintClose, this.toggleSizeHintVisibility.bind(this));
            $(document).on('click', this.SELECTORS.productGalleryThumb, this.changeGalleryImg.bind(this));
            $(document).on('click', this.SELECTORS.deleteItemButton, this.showDeleteTooltip.bind(this));
            $(document).on('click', this.SELECTORS.deleteItemAction, this.closeDeleteTooltip.bind(this));
            $(document).on('click', this.SELECTORS.promoClose, this.closePromo.bind(this));
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

        initGallery: function () {
            var $gallery = $(this.SELECTORS.productGallery);

            if ($gallery.length) {

                $gallery.lightGallery({
                    getCaptionFromTitleOrAlt: false,
                    download: false
                })
            }
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
        },

        initResponsesVisibility: function () {
            var $responses = $(this.SELECTORS.responsesContainer).find(this.SELECTORS.responsesItem);

            if ($responses.length) {

                $.each($responses, function (index, value) {
                    var $self = $(value),
                        textLength = $self.find(this.SELECTORS.responsesItemText).text().replace(/\s+/g," ").length;

                    if (textLength > this.CONSTANTS.responseSymbolThreshold) {
                        $self.find(this.SELECTORS.responsesItemText).addClass(this.CLASSES.collapsed);
                        $self.find(this.SELECTORS.responsesItemToggle).removeClass(this.CLASSES.hidden);
                    }

                    if (index >= this.CONSTANTS.responsesCountThreshold) $self.addClass(this.CLASSES.hidden);

                }.bind(this));
            }

            if ($responses.length > this.CONSTANTS.responsesCountThreshold) $(this.SELECTORS.responsesNav).removeClass(this.CLASSES.hidden);
        },

        toggleResponseVisibility: function (event) {
            var $self = $(event.currentTarget);

            event.preventDefault();
            $self.find(this.SELECTORS.responsesItemToggleText).toggleClass(this.CLASSES.hidden);
            $self.closest(this.SELECTORS.responsesItem)
                .find(this.SELECTORS.responsesItemText)
                .toggleClass(this.CLASSES.collapsed);
        },

        handleResponseNavAction: function (event) {
            var $self = $(event.currentTarget),
                $responses = $(this.SELECTORS.responsesItem),
                responsesThreshold = this.CONSTANTS.responsesCountThreshold,
                action = $self.data('action'),
                lastVisibleIndex,
                firstVisibleIndex,
                $activeResponses;

            event.preventDefault();

            if (action === 'next') {
                var restOfResponses;

                $(this.SELECTORS.responsesNavItem + '[data-action="prev"]').removeClass(this.CLASSES.disabled);
                $.each($responses, function (index, value) {
                    if (!$(value).hasClass(this.CLASSES.hidden)) lastVisibleIndex = index + 1;
                }.bind(this));
                restOfResponses = $responses.length - lastVisibleIndex;

                if (restOfResponses > responsesThreshold) {
                    $activeResponses = $responses.slice(lastVisibleIndex, lastVisibleIndex + responsesThreshold);

                } else if (restOfResponses <= responsesThreshold && restOfResponses !==0) {
                    $activeResponses = $responses.slice(lastVisibleIndex);
                    $self.addClass(this.CLASSES.disabled);
                }

            } else {
                $(this.SELECTORS.responsesNavItem + '[data-action="next"]').removeClass(this.CLASSES.disabled);
                $.each($responses, function (index, value) {
                    if (!$(value).hasClass(this.CLASSES.hidden)) {
                        firstVisibleIndex = index;
                        return false;
                    }
                }.bind(this));

                if (firstVisibleIndex > responsesThreshold) {
                    $activeResponses = $responses.slice(firstVisibleIndex - responsesThreshold, firstVisibleIndex);
                } else {
                    $activeResponses = $responses.slice(0, responsesThreshold);
                    $self.addClass(this.CLASSES.disabled);
                }
            }

            $responses.addClass(this.CLASSES.hidden);
            $activeResponses.removeClass(this.CLASSES.hidden);
        },

        sendResponse: function () {
            $.magnificPopup.open({
                items: {
                    src: '#mfp-response-success'
                },
                type: 'inline'
            })
        },

        toggleSizeHintVisibility: function (event) {
            $(event.currentTarget).closest(this.SELECTORS.sizeHintWrap).toggleClass(this.CLASSES.active);
        },

        changeGalleryImg: function (event) {
            var $self = $(event.currentTarget),
                imgId = $self.data('img-id'),
                $gallery = $(this.SELECTORS.productGallery);

            event.preventDefault();
            $(this.SELECTORS.productGalleryThumb).removeClass(this.CLASSES.active);
            $self.addClass(this.CLASSES.active);
            $gallery.find(this.SELECTORS.productGalleryImg).removeClass(this.CLASSES.active);
            $gallery.find(this.SELECTORS.productGalleryImg + '[data-img-id="'+imgId+'"]').addClass(this.CLASSES.active);
        },

        showDeleteTooltip: function (event) {
            $(event.currentTarget).closest(this.SELECTORS.deleteItemTooltip).addClass(this.CLASSES.active);
        },

        closeDeleteTooltip: function (event) {
            $(event.currentTarget).closest(this.SELECTORS.deleteItemTooltip).removeClass(this.CLASSES.active);
        },

        showSizesHintInSession: function () {

            if (!sessionStorage.getItem('sizesHintWasShown') && $(this.SELECTORS.sizeHintWrap).length) {
                $(this.SELECTORS.sizeHintWrap).addClass(this.CLASSES.active);
                sessionStorage.setItem('sizesHintWasShown', 'true');
            }
        },

        showPromo: function () {
            var currentDay = new Date().getDay().toString();
            localStorage.setItem('currentDay', currentDay);

            if (currentDay !== localStorage.getItem('promoShownDay')) {
                $(this.SELECTORS.promo).removeClass(this.CLASSES.hidden);
            }
        },

        closePromo: function () {
            var shownDay = new Date().getDay();
            localStorage.setItem('promoShownDay', shownDay.toString());
            $(this.SELECTORS.promo).addClass(this.CLASSES.hidden);
        }
    };

    $(document).ready(function () {
        app.init();
    });
}());