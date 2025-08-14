$(document).ready(function () {
    const currentPageUrl = $('body').data('page-url');

    // Only enable scroll-to-top if not on the projects page
    if (currentPageUrl && !currentPageUrl.includes('/projects')) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });

        $('.circle-button').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }

    $('.print-button').click(function () {
        window.print();
        return false;
    });
});