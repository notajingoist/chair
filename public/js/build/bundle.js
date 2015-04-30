(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SITE = {
    init: function() {
        this.setVars();
        this.bindEvents();

        this.highlightDefaultWood();
        this.highlightDefaultSteel();

        this.calculatePrice();
        // this.$document.trigger('mousemove');
        // this.$window.trigger('resize');
    },

    setVars: function() {
        this.$window = $(window);
        this.$document = $(document);
        this.$body = $('body');
        this.$htmlBody = $('html, body');
        this.$scrollLinks = this.getScrollLinks();
        this.$swatches = $('.swatch');
        this.$woodSwatch = $('.swatch-wood');
        this.$steelSwatch = $('.swatch-steel');
        this.$chairPreview = $('#chair-preview');
        console.log(this.$scrollLinks);

        this.$wood = $('#wood');
        this.$steel = $('#steel');
        this.$ottoman = $('#ottoman');
        this.$quantity = $('#quantity');
        this.$price = $('#price');

        this.defaultWood = 'teak';
        this.defaultSteel = 'chrome';
        this.defaultOttoman = false;
        this.defaultQuantity = 1;

        this.$quantityInput = $('#eh15-quantity');


        this.prices = {
            ash: 1200,
            teak: 1200,
            walnut: 1200,
            brushedSteel: 0,
            chrome: 150,
            gold: 300,
            ottoman: 500
        };

        this.$thumbs = $('.thumb');

    },

    calculatePrice: function() {
        var woodPrice = this.prices[this.defaultWood];
        var steelPrice = (this.defaultSteel === 'brushed-steel') ? 0 : this.prices[this.defaultSteel];
        var chairPrice = woodPrice + steelPrice;

        if (this.defaultOttoman) {
            chairPrice += this.prices['ottoman'];
        }

        chairPrice *= this.defaultQuantity;

        this.$wood.html(this.defaultWood);
        if (this.defaultSteel === 'brushed-steel') {
            this.$steel.html('brushed steel');
        } else {
            this.$steel.html(this.defaultSteel);
        }
        if (this.defaultOttoman) {
            this.$ottoman.html(' + ottoman');
        } else {
            this.$ottoman.html('');
        }
        this.$quantity.html(this.defaultQuantity);
        this.$price.html(chairPrice);

        console.log(woodPrice);
        console.log(chairPrice);
    },

    getScrollLinks: function() {
        console.log('getting scroll links');
        var hrefs = $('a');
        return hrefs.filter(function(i) {

            var $el = $(hrefs[i]);
            return $el.attr('href')[0] === '#';
        });
    },

    bindEvents: function() {
        this.$scrollLinks.on('click', this.scrollToSection.bind(this));
        // this.$woodSwatch.on('mouseover', this.changeWood.bind(this));
        // this.$steelSwatch.on('mouseover', this.changeSteel.bind(this));

        // this.$woodSwatch.on('mouseleave', this.resetSwatch.bind(this));
        // this.$steelSwatch.on('mouseleave', this.resetSwatch.bind(this));

        this.$woodSwatch.on('click', this.selectWood.bind(this));
        this.$steelSwatch.on('click', this.selectSteel.bind(this));

        this.$thumbs.on('click', this.previewImg.bind(this));

        this.$quantityInput.on('change', this.updateQuantity.bind(this));

        $('form').on('submit', function(e) { e.preventDefault(); }.bind(this));

        $('#labels-eh15-ottoman').on('click', this.toggleCheckedState.bind(this));
    },

    updateQuantity: function(e) {
        e.preventDefault();
        var $el = $(e.currentTarget);
        this.defaultQuantity = $el.val();
        console.log($el.val());
        this.calculatePrice();
    },

    previewImg: function(e) {
        var $el = $(e.currentTarget);
        var type = $el.attr('id').slice(6);
        if (type === 'default') {
            this.$chairPreview.attr('src', 'images/' + this.defaultWood + '-' + this.defaultSteel + '.png');
        } else {
            this.$chairPreview.attr('src', 'images/' + type + '.png');
        }
        //$el.
    },

    toggleCheckedState: function(e) {
        var $el = $(e.currentTarget);
        $el.toggleClass('checked');

        this.defaultOttoman = !this.defaultOttoman;
        this.calculatePrice();
    },

    selectWood: function(e) {
        var oldDefaultWood = this.defaultWood;
        this.defaultWood = $(e.currentTarget).attr('id');
        this.$chairPreview.attr('src', 'images/' + this.defaultWood + '-' + this.defaultSteel + '.png');
        if (oldDefaultWood !== this.defaultWood) {
            this.highlightDefaultWood();
        }
    },

    selectSteel: function(e) {
        var oldDefaultSteel = this.defaultSteel;
        this.defaultSteel = $(e.currentTarget).attr('id');
        this.$chairPreview.attr('src', 'images/' + this.defaultWood+ '-' + this.defaultSteel + '.png');
        if (oldDefaultSteel !== this.defaultSteel) {
            this.highlightDefaultSteel();
        }
    },

    // resetSwatch: function(e) {
    //     this.$chairPreview.attr('src', 'images/' + this.defaultWood + '-' + this.defaultSteel + '.png');
    // },

    // changeWood: function(e) {
    //     var wood = $(e.currentTarget).attr('id');
    //     this.$chairPreview.attr('src', 'images/' + wood + '-' + this.defaultSteel + '.png');
    // },

    // changeSteel: function(e) {
    //     var steel = $(e.currentTarget).attr('id');
    //     this.$chairPreview.attr('src', 'images/' + this.defaultWood+ '-' + steel + '.png');
    // },

    highlightDefaultWood: function() {
        this.$woodSwatch.removeClass('active');
        setTimeout(function() {
            $('#' + this.defaultWood).addClass('active');
            $('#' + this.defaultSteel).addClass('active');
        }.bind(this));
        this.calculatePrice();
    },

    highlightDefaultSteel: function() {
        this.$steelSwatch.removeClass('active');
        setTimeout(function() {
            $('#' + this.defaultWood).addClass('active');
            $('#' + this.defaultSteel).addClass('active');
        }.bind(this));
        this.calculatePrice();
    },

    // removeActiveClass: function(e) {
    //     var $el = $(e.currentTarget);
    // },

    scrollToSection: function(e) {
        e.preventDefault();
        console.log('scrolling');
        var $el = $(e.currentTarget);
        var anchor = $el.attr('href');
        var offset = $(anchor).offset().top;
        this.$htmlBody.animate({scrollTop: offset}, 300);
        setTimeout(function() {
            window.location.hash = anchor.slice(0);
        }, 700);
    },

    scrollToTop: function(e) {
        e.preventDefault();
        this.$htmlBody.animate({scrollTop: 0}, 300);
        setTimeout(function() {
            window.location.hash = '';
        }, 300);
    }
};

SITE.init();

},{}]},{},[1]);
