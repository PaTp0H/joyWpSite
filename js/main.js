$(document).ready(function(){
    var prevScroll = 0, 
    header = $('header');

    $(document).on('scroll', function(){
        var scroll = $(window).scrollTop();

        if (scroll > header.outerHeight()) {
            if(!header.hasClass('scroll')) {
                header.addClass('scroll');
            }
        }else{
            header.removeClass('scroll');
        }
    });

    $('.burger').on('click', function(){
        if($(this).closest('.menu').hasClass('active')) {
            $(this).closest('.menu').removeClass('active');
        }
        else {
            $(this).closest('.menu').addClass('active');
        }
    });

    $('.menu__item').on('click', function(e){
        if($(this).hasClass('parrent') && !$(this).hasClass('active')) {
            e.preventDefault();
            $(this).addClass('active');
            $(this).find('.menu__inner').slideDown();
        }
    });

    if($('.promotion-slider__box').length > 0){
        var mySwiper = new Swiper ('.promotion-slider__box', {
            speed: 400,
            spaceBetween: 0,
            pagination: {
              el: '.promotion-slider__box .swiper-pagination',
              clickable: true,
             },
          });
    }

    if($('.testimonials').length > 0){
        var mySwiper = new Swiper ('.testimonials__box', {
            speed: 400,
            spaceBetween: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
              },
            pagination: {
                el: '.testimonials .swiper-pagination',
                clickable: true,
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                767: {
                    pagination: {
                        type: 'fraction',
                    }
                }
              }
        });
        testimonialsBack();
    }

    if($('.team-image').length > 0) {
        $('.team-image').on('click', function () {
            if($(this).parent().find('.team-popap').length) {
                $(this).parent().find('.team-popap').addClass('active');
                $('body').addClass('overflow');
            }
        });
        
        $('.team-popap__close').on('click', function(){
            $(this).closest('.team-popap').removeClass('active');
            $('body').removeClass('overflow');
        });

        $('.team-popap').on('click', function (e) {
            if(!$(e.target).is('.team-popap__wrapper, .team-popap__wrapper *')) {
                $('body').removeClass('overflow');
                $('.team-popap').removeClass('active');
            }
        });
    }

    if($('.career__list').length > 0) {
        $('.career__item').on('click', '.career__item-job', function () {
            if(!$(this).parent().hasClass('active')) {
                $(this).parent().addClass('active').find('.career__item-detail').stop().slideDown(500);
                $(this).find('.career__btn').text('Show less');
            }
            else {
                $('.career__item').removeClass('active').find('.career__item-detail').stop().slideUp(500);
                $('.career__btn').text('Detail');
            }
        });
        $('.career__item').on('click', '.close', function() {
            $(this).closest('.career__item').removeClass('active').find('.career__item-detail').stop().slideUp(500);
            $('.career__btn').text('Detail');
        })
    }

    function testimonialsBack() {
        var termBack = $('.testimonials__back'),
            layout = $('.testimonials .layout__wrapper').width();
            var termInfo = $('.promotion-slider__slide-img').length ? $('.promotion-slider__slide-img').outerWidth() : $('.testimonials__info').outerWidth() + 100;           
            termBack.css('width', (termInfo + 1) + ($('body').outerWidth() - layout) / 2 );
    }
    if($('.home-animation').length > 0) {
        
        var homeSlider = $('.home-animation'),
        animScroll = $('.animations'),
        taglines = $('.anim-tag'),
        taglineFirst = $('.anim-tag.first-item'),
        taglineSecond = $('.anim-tag.second-item'),
        taglineThird = $('.anim-tag.third-item'),
        progressSliderCount = 0,
        sliderDirection = false;

        var scrollAnimation = lottie.loadAnimation({
            container: document.getElementById('lottie-scroll'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'homepage-scroll.json'
        });

        var joyAnimation = lottie.loadAnimation({
            container: document.getElementById('lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'homepage-joy.json'
        });

        var homeSwiper = new Swiper('.home-animation .swiper-container', {
          direction: 'vertical',
          speed:1000,
          slidesPerView: 1,
          spaceBetween: 30,
          mousewheel: {
            releaseOnEdges: true,
          },
          touchReleaseOnEdges: true,
        });

        function step() {
            if (joyAnimation.currentFrame <= 120 && !taglineFirst.hasClass('active')) {
                taglines.removeClass('active');
                taglineFirst.addClass('active');
            }
            else if(joyAnimation.currentFrame >= 120 && joyAnimation.currentFrame <= 200 && !taglineSecond.hasClass('active')) {
                taglines.removeClass('active');
                taglineSecond.addClass('active');
            }
            else if(joyAnimation.currentFrame >= 200 && !taglineThird.hasClass('active')) {
                taglines.removeClass('active');
                taglineThird.addClass('active');
            }
    
            requestAnimationFrame(step);
        }
    
        requestAnimationFrame(step);

        homeSwiper.on('slideChange', function () {

            if (homeSwiper.progress > progressSliderCount) {
                progressSliderCount = homeSwiper.progress;
                sliderDirection = true;
            }
            else {
                progressSliderCount -= homeSwiper.progress;
                sliderDirection = false;
            }
            
            if (sliderDirection) {
                if (homeSwiper.activeIndex == 1) {
                    homeSlider.css('backgroundColor', '#0a387a');
                    scrollAnimation.playSegments([0, 105], true);
                }
                else if (homeSwiper.activeIndex == 2){
                    homeSlider.css('backgroundColor', '#75cad3');
                    scrollAnimation.playSegments([105, 190], true);
                }
                else if (homeSwiper.activeIndex == 3){
                    homeSlider.css('backgroundColor', '#33ac86');
                    scrollAnimation.playSegments([190, 285], true);
                    
                }
            }
            else {
                if (homeSwiper.activeIndex == 1) {
                    homeSlider.css('backgroundColor', '#0a387a');
                    scrollAnimation.playSegments([190, 105], true);
                }
                else if (homeSwiper.activeIndex == 2){
                    homeSlider.css('backgroundColor', '#75cad3');
                    scrollAnimation.playSegments([285, 190], true);
                }
            }

            if(homeSwiper.activeIndex > 0) {
                animScroll.addClass('active');
                cancelAnimationFrame(step);
                joyAnimation.pause();
            }
            else {
                homeSlider.css('backgroundColor', '#e86238');
                animScroll.removeClass('active');
                joyAnimation.play();
                requestAnimationFrame(step);
            }
        });
    }

    $(window).resize(function () {
        testimonialsBack();
    })
})

