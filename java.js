document.addEventListener('DOMContentLoaded', () => {
    const noticias = document.querySelectorAll('.noticia');
    const leerMasBotones = document.querySelectorAll('.noticia a');


    // Efecto de resaltado al pasar el mouse
    noticias.forEach(noticia => {
        noticia.addEventListener('mouseenter', () => {
            noticia.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.2)';
            noticia.style.transform = 'scale(1.02)';
            noticia.style.transition = 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out';
        });


        noticia.addEventListener('mouseleave', () => {
            noticia.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            noticia.style.transform = 'scale(1)';
        });
    });


    // Alerta al hacer clic en "Leer más" (solo para demostrar interactividad)
    leerMasBotones.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que el enlace navegue a "#"
            const tituloNoticia = boton.parentNode.querySelector('h3').textContent;
            alert(`¡Has hecho clic en "Leer más" de la noticia: ${tituloNoticia}! (Funcionalidad completa se agregaría aquí)`);
        });
    });
});