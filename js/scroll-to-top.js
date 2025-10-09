/**
 * Scroll to Top Button Functionality
 * Muestra/oculta el botón basado en el scroll y maneja el scroll suave al top
 */

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }

    // Configuración
    const SHOW_THRESHOLD = 300; // Mostrar botón después de 300px de scroll
    const SCROLL_DURATION = 800; // Duración del scroll suave en ms

    // Función para mostrar/ocultar el botón basado en el scroll
    function toggleScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > SHOW_THRESHOLD) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }

    // Función para scroll suave al top
    function scrollToTop() {
        // Usar scroll behavior nativo si está disponible
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback para navegadores que no soportan scroll behavior
            smoothScrollToTop();
        }
    }

    // Implementación manual de scroll suave (fallback)
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
            
            // Función easing para un movimiento más natural
            const ease = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Función de easing para animación suave
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Event listeners
    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    scrollToTopBtn.addEventListener('click', scrollToTop);

    // Verificar posición inicial al cargar la página
    toggleScrollButton();

    // Accesibilidad: manejo con teclado
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
});