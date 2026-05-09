(function($) {
    $(function() {
        var $window = $(window),
            $header = $('#header');

        // 1. Sticky Header Logic
        // Makes the header stay at the top once you scroll down 100px
        $window.on('scroll', function() {
            if ($window.scrollTop() > 100) {
                $header.addClass('fixed-nav');
            } else {
                $header.removeClass('fixed-nav');
            }
        });

        // 2. Text-to-Book Logic
        // Automatically formats the 'Text Us' button for mobile users
        $('.contact-method .fa-phone').parent().on('click', function() {
            if (/Android|iPhone/i.test(navigator.userAgent)) {
                window.location.href = "sms:+13125559291"; // Your studio number
            }
        });

        // 3. Smooth Scroll for "Book Now"
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        });
    });
})(jQuery);