document.addEventListener("DOMContentLoaded", function () {

    // --- 1. LOGIQUE POP-UP ---
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');
    const triggerButtons = document.querySelectorAll('[data-trigger="contact-modal"]');

    if (modal) {
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.add('active'); // Use active class
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', function (e) {
            if (e.target == modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 2. LOGIQUE FAQ (ACCORDÉON) ---
    // Utilisation de la délégation d'événements (fonctionne tout le temps)
    document.addEventListener('click', function (e) {
        const trigger = e.target.closest('.faq-question');
        if (trigger) {
            const item = trigger.parentElement;
            item.classList.toggle('open');
        }
    });

    // --- 3. ANIMATION SCROLL (FAQ + COMPARATIF + BENTO) ---
    const handleReveal = () => {
        const triggers = document.querySelectorAll('.faq-header, .faq-item, .comparison-column, .bento-card, .data-header, .final-cta-card');
        const triggerBottom = window.innerHeight * 0.9;

        triggers.forEach((item, i) => {
            if (item.getBoundingClientRect().top < triggerBottom) {
                // If it's a bento card, apply staggered animation delays
                if (item.classList.contains('bento-card')) {
                    setTimeout(() => {
                        item.classList.add('reveal');
                    }, i * 100);
                } else {
                    item.classList.add('reveal');
                }

                // Si c'est une colonne comparative, on ajoute la classe 'is-visible' si tu utilises l'ancien nom
                item.classList.add('is-visible');
            }
        });
    };

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Lancement initial

    // --- 4. ANIMATION TIMELINE ---
    const progressLine = document.getElementById("progress-line");
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (progressLine && timelineItems.length > 0) {
        const updateTimeline = () => {
            const timeline = document.getElementById("timeline");
            if (!timeline) return;

            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.8;
            const progressHeight = Math.max(
                0,
                Math.min(
                    100,
                    ((start - timelineRect.top) / timelineRect.height) * 100
                )
            );
            progressLine.style.height = `${progressHeight}%`;

            timelineItems.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < windowHeight * 0.7) {
                    item.classList.add("is-active");
                }
            });
        };

        window.addEventListener("scroll", updateTimeline);
        updateTimeline(); // Initial call
    }
});
