$(document).ready(function() {

    // --- 1. FUNZIONE FADE-IN DELLE CARD (OTTIMIZZATA) ---
    function fadeInCards() {
        $('.project-card').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            // Se la card entra nella visuale dello schermo
            if (windowBottom > elementTop + 100) {
                // Invece di .animate(), aggiungiamo solo la classe CSS
                $(this).addClass('visible');
            }
        });
    }

    // --- 2. GESTIONE UNIFICATA DELLO SCROLL ---
    $(window).scroll(function() {
        // Esegui animazione card
        fadeInCards();
        
        // Calcolo della Barra di Progresso Verticale
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollHeight = docHeight - winHeight;
        var scrollPercent = (scrollTop / scrollHeight) * 100;
        
        $('#progressBar').css('height', scrollPercent + '%');

        // Logica per attivare/ingrandire i punti (Indicatori Anni) sulla barra
        const anni = ['#anno3', '#anno4', '#anno5'];
        
        anni.forEach((id, index) => {
            var section = $(id);
            if (section.length) {
                var sectionTop = section.offset().top - 150; // Margine di anticipo
                var sectionBottom = sectionTop + section.outerHeight();

                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    $('#dot' + (index + 3)).addClass('active');
                } else {
                    $('#dot' + (index + 3)).removeClass('active');
                }
            }
        });
    });

    // --- 3. NAVIGAZIONE CLICCABILE SUI PUNTI (DOTS) ---
   $('.dot').on('click', function() {
        var target = $(this).data('target'); // Prende l'id (es. #anno3)
        var offset = $(target).offset().top - 80; // Calcola la posizione meno la navbar

        $('html, body').animate({
            scrollTop: offset
        }, 800); // Scorrimento fluido
    });

    // --- 2. AGGIORNAMENTO PROGRESS BAR & DOT ATTIVI ---
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var scrollPercent = (scrollTop / docHeight) * 100;

        // Muove la barra di caricamento
        $('#progressBar').css('height', scrollPercent + '%');

        // Accende i pallini quando arrivi alla sezione corretta
        $('.section').each(function() {
            var top = $(this).offset().top - 200;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollTop >= top && scrollTop <= bottom) {
                $('.dot').removeClass('active');
                $('.dot[data-target="#' + id + '"]').addClass('active');
            }
        });
    });

    // --- 4. ESECUZIONE ALL'AVVIO ---
    // Controlla se ci sono card già visibili appena carichi la pagina
    fadeInCards();
    // --- 5. LOGICA FINESTRA MODALE PROGETTI ---
    
    // Apri Modale
    $('.btn').on('click', function(e) {
    if($(this).attr('href') === '#') {
        e.preventDefault();
        
        var card = $(this).closest('.project-card');
        
        // 1. Prepariamo i dati PRIMA di mostrare la modale
        $('#modalTitle').text(card.find('h3').text());
        $('#modalBanner').attr('src', card.find('.m-banner').text());
        $('#modalText').html(card.find('.m-text').html());

        // 2. Usiamo un micro-ritardo per lasciare respirare il browser
        requestAnimationFrame(() => {
            $('#projectModal').addClass('active');
            $('body').css('overflow', 'hidden');
        });
    }
});

    // Chiudi Modale (Cliccando fuori o sulla X)
    $('#projectModal, .close-modal').on('click', function(e) {
        // Controlla se hai cliccato esattamente sullo sfondo scuro (#projectModal) O sul bottone X
        if ($(e.target).is('#projectModal') || $(e.target).closest('.close-modal').length) {
            $('#projectModal').removeClass('active');
            $('body').css('overflow', 'auto'); // Riattiva lo scorrimento
        }
    });

});