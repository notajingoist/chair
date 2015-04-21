(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SITE = {
    init: function() {
        this.setVars();
        this.bindEvents();
        // this.$document.trigger('mousemove');
        // this.$window.trigger('resize');
    },

    setVars: function() {
        this.$window = $(window);
        this.$document = $(document);
        this.$body = $('body');
        this.$htmlBody = $('html, body');
        this.$cursor = $('.eggplant-cursor');
        this.$questions = $('.q-li');
        this.$audioClips = $('.answer-audio-clip');
        // this.$scrollClick = $('.scroll-click');
    },

    bindEvents: function() {
        if (this.$body.hasClass('cursor-type-eggplant')) {
            this.$document.on('mousemove', this.placeCursor.bind(this));
        }
        this.$questions.on('click', this.playAudio.bind(this));
        this.$audioClips.on('ended', this.removeActiveClass.bind(this));
        //answer-
        //this.$scrollClick.on('click', this.scrollToSection.bind(this));
    },

    removeActiveClass: function(e) {
        var $el = $(e.currentTarget);
        var id = $el.attr('id');
        var questionClass = id.slice(7);
        console.log(questionClass);
        $('#' + questionClass).removeClass('active');
    },

    playAudio: function(e) {
        e.preventDefault();
        var $el = $(e.currentTarget);

        var id = $el.attr('id');
        var $audioClip = $('#answer-' + id);

        this.$questions.removeClass('active');

        this.$audioClips.each(function() {
            this.pause();
            this.currentTime = 0;
        });

        setTimeout(function() {
            $el.addClass('active');
            $audioClip[0].play();
            console.log('playing ' + $audioClip.attr('id'));
        });
    },

    placeCursor: function(e) {
        //console.log('moved');
        var offsetLeft = 40;
        var offsetTop = 100;
        var x = e.pageX - offsetLeft;
        var y = e.pageY - offsetTop;
        this.$cursor.css({'left': x, 'top': y});
        // this.$cursor.removeClass('hide');
        //this.$body.append('')
    },

    scrollToSection: function(e) {
        e.preventDefault();
        console.log('scrolling');
        var $el = $(e.currentTarget);
        var anchor = $el.attr('href');
        var offset = $(anchor).offset().top;
        this.$htmlBody.animate({scrollTop: offset}, 300);
        setTimeout(function() {
            window.location.hash = anchor.slice(0);
        }, 300);
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
