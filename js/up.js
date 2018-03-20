$(function () {
    TwitterScroll.run();
});

var TwitterScroll = {

    $leftSiteBar: null,

    $topBar: null,

    $scroll: null,

    run: function () {
        this.$scroll = $('<div id="scrollTopTwitter"></div>');

        $('body').append(this.$scroll);

        this.$scroll.click(function () {
            $(window).scrollTop(0);
        });

        $(window).bind('scroll', TwitterScroll.scrollPageEvent);
        TwitterScroll.scrollPageEvent();

        $(window).resize(function () {
            TwitterScroll.resize();
        });
        TwitterScroll.resize();

        TwitterScroll.$scroll.hover(function () {
            if (TwitterScroll.opacity) {
                TwitterScroll.$scroll.stop(true, true).animate({
                    'opacity': 0.4
                }, 50);
            }
        }, function () {
            if (TwitterScroll.opacity) {
                TwitterScroll.$scroll.stop(true, true).animate({
                    'opacity': 0.2
                }, 50);
            }
        });
    },

    opacity: 0,

    scrollPageEvent: function () {
        TwitterScroll.$leftSiteBar = $('div.ProfileSidebar.ProfileSidebar--withLeftAlignment');
        if (!TwitterScroll.$leftSiteBar.length)
            TwitterScroll.$leftSiteBar = $('.dashboard.dashboard-left');
        if (TwitterScroll.$leftSiteBar.length) {
            var top = TwitterScroll.$leftSiteBar.height() + TwitterScroll.$leftSiteBar.offset().top + 20 - $(window).scrollTop();
            if (top <= 100) {
                TwitterScroll.$scroll.css({
                    'top': 0
                });
                if (!TwitterScroll.opacity) {
                    TwitterScroll.opacity = 1;
                    TwitterScroll.$scroll.stop(true, true).animate({
                        'opacity': 0.2
                    });
                }
            } else {
                TwitterScroll.$scroll.css({
                    'top': top
                });
                if (TwitterScroll.opacity) {
                    TwitterScroll.opacity = 0;
                    TwitterScroll.$scroll.stop(true, true).animate({
                        'opacity': 0
                    }, 50);
                }
            }
        }
    },

    resize: function () {
        TwitterScroll.$scroll.css({
            'width': TwitterScroll.$leftSiteBar.offset().left + TwitterScroll.$leftSiteBar.width()
        });
    }
};