document.addEventListener('DOMContentLoaded', function() {

    // MENÚ RESPONSIVE Y ANIMACIÓN HEADER
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu-link');
    const dropdowns = document.querySelectorAll('.nav-menu .dropdown');

    // Toggle menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
            // Evitar scroll del body cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

 



    //MENU

    // Cerrar menú al hacer clic en un enlace (para SPAs o navegación en la misma página)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // Manejo de submenús desplegables en móvil (clic en vez de hover)
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-menu-link');
            const submenu = dropdown.querySelector('.dropdown-menu');
            link.addEventListener('click', (e) => {
                // Prevenir navegación si es un enlace # y tiene submenú
                if (link.getAttribute('href') === '#' || link.getAttribute('href') === '#niveles') {
                     e.preventDefault();
                }
                // Cerrar otros submenús abiertos
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-menu').classList.remove('open');
                        otherDropdown.querySelector('.dropdown-menu').style.maxHeight = null;
                        otherDropdown.classList.remove('open');
                    }
                });

                submenu.classList.toggle('open');
                dropdown.classList.toggle('open'); // Para el ícono
                if (submenu.classList.contains('open')) {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                } else {
                    submenu.style.maxHeight = null;
                }
            });
        });
    }


    // Animación del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // SLIDER ANIMADO
    const slides = document.querySelectorAll('.slider .slide');
    const sliderContainer = document.querySelector('.slider .slider-container');
    const nextBtn = document.querySelector('.slider .next');
    const prevBtn = document.querySelector('.slider .prev');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Para el efecto de deslizamiento horizontal:
            // No es necesario mover cada slide individualmente si el contenedor se mueve.
            // Pero si quisieras animaciones individuales por slide, aquí sería.
        });
        slides[index].classList.add('active');

        // Efecto de deslizamiento horizontal (opcional, requiere que .slider-container tenga overflow:hidden)
        if (sliderContainer) {
             sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        }
        currentSlide = index;
    }

    function nextSlide() {
        let newSlide = (currentSlide + 1) % slides.length;
        showSlide(newSlide);
    }

    function prevSlide() {
        let newSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newSlide);
    }

    if (slides.length > 0) {
        showSlide(0); // Mostrar el primer slide al cargar

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Autoplay
        function startInterval() {
            slideInterval = setInterval(nextSlide, 7000); // Cambia cada 7 segundos
        }
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        startInterval();
    }


    // GALERÍA DE IMÁGENES (LIGHTBOX BÁSICO)
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    let currentImageIndex;
    const imagesForLightbox = [];

    if (galeriaItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
        galeriaItems.forEach((item, index) => {
            imagesForLightbox.push(item.getAttribute('href'));
            item.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.style.display = 'block';
                lightboxImg.src = item.getAttribute('href');
                currentImageIndex = index;
                document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Cerrar lightbox al hacer clic fuera de la imagen (opcional)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Navegación en Lightbox
        window.plusSlides = function(n) {
            currentImageIndex += n;
            if (currentImageIndex >= imagesForLightbox.length) {
                currentImageIndex = 0;
            }
            if (currentImageIndex < 0) {
                currentImageIndex = imagesForLightbox.length - 1;
            }
            lightboxImg.src = imagesForLightbox[currentImageIndex];
        }
    }
    
    



    // TESTIMONIOS SLIDER
    const testimonioSlides = document.querySelectorAll('.testimonio-slide');
    const nextTestimonioBtn = document.querySelector('.next-testimonio');
    const prevTestimonioBtn = document.querySelector('.prev-testimonio');
    let currentTestimonio = 0;

    function showTestimonio(index) {
        testimonioSlides.forEach(slide => slide.classList.remove('active'));
        if (testimonioSlides[index]) {
            testimonioSlides[index].classList.add('active');
        }
        currentTestimonio = index;
    }

    if (testimonioSlides.length > 0) {
        showTestimonio(0);

        if (nextTestimonioBtn) {
            nextTestimonioBtn.addEventListener('click', () => {
                let newTestimonio = (currentTestimonio + 1) % testimonioSlides.length;
                showTestimonio(newTestimonio);
            });
        }

        if (prevTestimonioBtn) {
            prevTestimonioBtn.addEventListener('click', () => {
                let newTestimonio = (currentTestimonio - 1 + testimonioSlides.length) % testimonioSlides.length;
                showTestimonio(newTestimonio);
            });
        }
         // Autoplay para testimonios (opcional)
        // setInterval(() => {
        //    let newTestimonio = (currentTestimonio + 1) % testimonioSlides.length;
        //    showTestimonio(newTestimonio);
        // }, 8000);
    }


    // FORMULARIO DE SOLICITUD (VALIDACIÓN BÁSICA)
    const solicitudForm = document.getElementById('solicitudForm');
    const formMessage = document.getElementById('form-message');

    if (solicitudForm && formMessage) {
        solicitudForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar envío real para este ejemplo

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            let isValid = true;
            let errors = [];

            if (nombre === '') {
                isValid = false;
                errors.push('El nombre es obligatorio.');
            }
            if (email === '') {
                isValid = false;
                errors.push('El correo electrónico es obligatorio.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                errors.push('El formato del correo electrónico no es válido.');
            }
            if (mensaje === '') {
                isValid = false;
                errors.push('El mensaje es obligatorio.');
            }

            if (isValid) {
                formMessage.textContent = '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.';
                formMessage.className = 'form-message success';
                solicitudForm.reset(); // Limpiar formulario
                // Aquí iría la lógica para enviar los datos a un servidor (e.g., usando fetch o XMLHttpRequest)
                console.log('Formulario válido, enviando datos (simulado)...');

            } else {
                formMessage.innerHTML = errors.join('<br>');
                formMessage.className = 'form-message error';
            }

            setTimeout(() => { // Limpiar mensaje después de unos segundos
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 7000);
        });
    }

     /*Asistente virtual*/


    const chatFab = document.getElementById('chat-fab');
    const chatVentana = document.getElementById('chat-ventana');
    const cerrarChatBtn = document.getElementById('cerrar-chat');
    const chatCuerpo = document.getElementById('chat-cuerpo');
    const chatEntrada = document.getElementById('chat-entrada');
    const enviarMensajeBtn = document.getElementById('enviar-mensaje');

    // Mostrar/Ocultar ventana de chat
    chatFab.addEventListener('click', () => {
        chatVentana.classList.toggle('abierto');
        if (chatVentana.classList.contains('abierto')) {
            chatEntrada.focus(); // Enfocar en el input al abrir
        }
    });

    cerrarChatBtn.addEventListener('click', () => {
        chatVentana.classList.remove('abierto');
    });

    // Enviar mensaje
    enviarMensajeBtn.addEventListener('click', enviarMensaje);
    chatEntrada.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            enviarMensaje();
        }
    });

    function enviarMensaje() {
        const mensajeTexto = chatEntrada.value.trim();
        if (mensajeTexto === '') return;

        agregarMensaje(mensajeTexto, 'usuario');
        chatEntrada.value = '';

        // Simular respuesta del bot después de un breve retraso
        setTimeout(() => {
            respuestaBot(mensajeTexto);
        }, 1000);
    }

    function agregarMensaje(texto, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje', tipo);
        const pMensaje = document.createElement('p');
        pMensaje.textContent = texto;
        divMensaje.appendChild(pMensaje);
        chatCuerpo.appendChild(divMensaje);

        // Hacer scroll hacia el último mensaje
        chatCuerpo.scrollTop = chatCuerpo.scrollHeight;
    }

    function respuestaBot(mensajeUsuario) {
        let respuesta = "Gracias por tu mensaje. Estoy aquí para ayudarte."; // Respuesta por defecto

        // Lógica simple de respuesta (puedes expandir esto)
        const mensajeLowerCase = mensajeUsuario.toLowerCase();

        if (mensajeLowerCase.includes('hola') || mensajeLowerCase.includes('buenos dias') || mensajeLowerCase.includes('buenas tardes')) {
            respuesta = "¡Hola! ¿En qué puedo asistirte hoy?";
        } else if (mensajeLowerCase.includes('precio') || mensajeLowerCase.includes('costo')) {
            respuesta = "Para información sobre precios, por favor visita nuestra página de productos o contacta a ventas.";
        } else if (mensajeLowerCase.includes('ayuda') || mensajeLowerCase.includes('soporte')) {
            respuesta = "Claro, dime cuál es tu consulta y trataré de ayudarte.";
        } else if (mensajeLowerCase.includes('gracias') || mensajeLowerCase.includes('muchas gracias')) {
            respuesta = "¡De nada! ¿Hay algo más en lo que pueda ayudarte?";
        } else if (mensajeLowerCase.includes('adiós') || mensajeLowerCase.includes('chao')) {
            respuesta = "¡Que tengas un buen día! Hasta luego.";
        } else {
            // Si no se reconoce la entrada, se puede dar una respuesta genérica
            // o integrar con un sistema de NLP más avanzado.
            respuesta = "Entendido. Procesaré tu solicitud: \"" + mensajeUsuario + "\". ¿Algo más?";
        }

        agregarMensaje(respuesta, 'bot');
    }

    // Crear un archivo SVG para el ícono de chat si no tienes uno
    // Este código crea un ícono simple y lo inserta en el FAB.
    // Si ya tienes un archivo chat-icon.svg, puedes comentar o eliminar esta parte.
    const chatIconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            <path d="M6 9h12v2H6zm0 3h8v2H6z"/>
        </svg>
    `;
    // Reemplaza el contenido de la imagen si es un placeholder
    if (chatFab.querySelector('img') && chatFab.querySelector('img').getAttribute('src') === 'chat-icon.svg') {
         chatFab.innerHTML = chatIconSvg;
    } else if (!chatFab.innerHTML.trim()){ // Si el FAB está vacío
         chatFab.innerHTML = chatIconSvg;
    }
    // Fin del código para el ícono SVG






    //COMUNICADO EMERGENTE.
     const modal = document.getElementById('comunicadoModal');
    const slider = document.querySelectorAll('.slider-imagenes img');
    const btnDetalles = document.getElementById('btnDetalles');
    let slideActual = 0;

    // --- Funcionalidad del Modal ---
    function mostrarModal() {
        if (modal) {
            modal.style.display = 'flex'; // Cambiado a flex para centrar con CSS
        }
    }

    function cerrarModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Mostrar el modal al cargar la página
    // Puedes añadir una condición para mostrarlo solo una vez usando localStorage si lo deseas
    mostrarModal();

    // Asignar evento al botón de cerrar (si se usa el span en HTML)
    // La función cerrarModal() ya está asignada en el onclick del HTML,
    // pero esta es otra forma de hacerlo:
    const spanCerrar = document.querySelector('.cerrar-btn');
    if (spanCerrar) {
        spanCerrar.addEventListener('click', cerrarModal);
    }

    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // --- Funcionalidad del Slider de Imágenes ---
    function mostrarSlide(index) {
        slider.forEach((slide, i) => {
            slide.classList.remove('slide-activo');
            if (i === index) {
                slide.classList.add('slide-activo');
            }
        });
    }

    window.cambiarSlide = function(direccion) { // Hacemos la función global para el onclick del HTML
        slideActual += direccion;
        if (slideActual >= slides.length) {
            slideActual = 0;
        } else if (slideActual < 0) {
            slideActual = slides.length - 1;
        }
        mostrarSlide(slideActual);
        actualizarEnlaceDetalles(slideActual);
    }

    // Mostrar el primer slide al inicio
    if (slides.length > 0) {
        mostrarSlide(slideActual);
        actualizarEnlaceDetalles(slideActual); // Actualiza el enlace para el primer slide
    }

    // --- Funcionalidad del Botón de Detalles ---
    // Esta función actualiza el enlace del botón "Ver Detalles"
    // según la imagen que se esté mostrando.
    function actualizarEnlaceDetalles(slideIndex) {
        // URLs de ejemplo para cada comunicado
        const urlsDetalles = [
            'comunicados.html',  // Enlace para la imagen 1
            'comunicados.html', // Enlace para la imagen 2
            'comunicados.html'  // Enlace para la imagen 3
            // Agrega más URLs si tienes más imágenes
        ];

        if (btnDetalles && urlsDetalles[slideIndex]) {
            btnDetalles.href = urlsDetalles[slideIndex];
            // Opcional: Cambiar el texto del botón si es necesario
            // btnDetalles.textContent = `Ver Detalles del Comunicado ${slideIndex + 1}`;
        }
    }

    // Opcional: Cambiar automáticamente las imágenes cada cierto tiempo
    // setInterval(() => {
    //     cambiarSlide(1);
    // }, 5000); // Cambia cada 5 segundos

});
    // BOTÓN VOLVER ARRIBA
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostrar después de 300px de scroll
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ACTUALIZAR AÑO EN FOOTER
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ACTIVE LINK SCROLLSPY (OPCIONAL - Para resaltar enlace del menú según sección visible)
    const sections = document.querySelectorAll('main section[id]');
    function scrollSpy() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajuste para que la sección se active un poco antes de llegar al borde superior exacto
            if (pageYOffset >= (sectionTop - sectionHeight / 3) ) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');

                // Si es un enlace dentro de un dropdown, también marcar el padre
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.querySelector('.nav-menu-link').classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Llamar una vez al cargar para la sección inicial

   



    /*cabecera y buscador*/

    document.addEventListener('DOMContentLoaded', function() {
    const formularioBusqueda = document.getElementById('formulario-busqueda');
    const campoBusqueda = document.getElementById('campo-busqueda');

    if (formularioBusqueda) {
        formularioBusqueda.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

            const terminoBusqueda = campoBusqueda.value.trim();

            if (terminoBusqueda) {
                console.log('Término buscado:', terminoBusqueda);
                // Aquí es donde integrarías la lógica de búsqueda real.
                // Por ejemplo, redirigir a una página de resultados:
                // window.location.href = '/buscar?q=' + encodeURIComponent(terminoBusqueda);
                alert('Has buscado: ' + terminoBusqueda); // Muestra una alerta como ejemplo
            } else {
                alert('Por favor, ingresa un término de búsqueda.');
            }
        });
    }
});
