$(document).ready(function () {

    // FADE IN DELLE CARD
    function fadeInCards() {
        $('.project-card').each(function () {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();


            if (windowBottom > elementTop + 100) {

                $(this).addClass('visible');
            }
        });
    }

    // GESTIONE SCROLL
    $(window).scroll(function () {

        fadeInCards();


        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollHeight = docHeight - winHeight;
        var scrollPercent = (scrollTop / scrollHeight) * 100;

        $('#progressBar').css('height', scrollPercent + '%');

        const anni = ['#anno3', '#anno4', '#anno5'];

        anni.forEach((id, index) => {
            var section = $(id);
            if (section.length) {
                var sectionTop = section.offset().top - 150;
                var sectionBottom = sectionTop + section.outerHeight();

                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    $('#dot' + (index + 3)).addClass('active');
                } else {
                    $('#dot' + (index + 3)).removeClass('active');
                }
            }
        });
    });

    // PROGRESS BAR
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrollPercent = (scrollTop / docHeight) * 100;


        $('#progressBar').css('height', scrollPercent + '%');


        $('.section').each(function () {
            var top = $(this).offset().top - 200;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollTop >= top && scrollTop <= bottom) {
                $('.dot').removeClass('active');
                $('.dot[data-target="#' + id + '"]').addClass('active');
            }
        });
    });

    // ESEGUZIONE ALL'AVVIO

    fadeInCards();

    // FINESTRA DESCRZIONE PROGETTI
    $('.btn').on('click', function (e) {
        if ($(this).attr('href') === '#') {
            e.preventDefault();

            var card = $(this).closest('.project-card');


            $('#modalTitle').text(card.find('h3').text());
            $('#modalBanner').attr('src', card.find('.m-banner').text());
            $('#modalText').html(card.find('.m-text').html());

            requestAnimationFrame(() => {
                $('#projectModal').addClass('active');
                $('body').css('overflow', 'hidden');
            });
        }
    });

    $('#projectModal, .close-modal').on('click', function (e) {

        if ($(e.target).is('#projectModal') || $(e.target).closest('.close-modal').length) {
            $('#projectModal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    //COPIA E GESTIONE DELLA MAIL/NUMERO DI TELEFONO
    const $copyElements = $('.copy-item');
    const $toastMessage = $('#toastMessage');

    if ($copyElements.length > 0 && $toastMessage.length > 0) {

        $copyElements.on('click', function () {
            const $this = $(this);


            const textToCopy = $this.data('copy');
            const type = $this.data('type');

            navigator.clipboard.writeText(textToCopy).then(() => {


                if (type === 'mail') {
                    $toastMessage.text("La mia E-Mail è stata copiata nei tuoi appunti");
                } else if (type === 'phone') {
                    $toastMessage.text("Il mio numero di telefono è stato copiato nei tuoi appunti");
                }


                $toastMessage.addClass('show');


                setTimeout(() => {
                    $toastMessage.removeClass('show');
                }, 1500);

            }).catch(err => {
                console.error("Errore durante la copia: ", err);
            });
        });
    }

});