document.addEventListener('DOMContentLoaded', () => {
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

});