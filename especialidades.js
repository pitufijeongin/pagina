
const miniaturas = document.querySelectorAll('.miniatura');
const visor = document.getElementById('visor');
const imagenGrande = document.getElementById('imagenGrande');
const cerrar = document.getElementById('cerrar');


miniaturas.forEach(img => {
  img.addEventListener('click', () => {
    imagenGrande.src = img.src;
    visor.classList.remove('oculto');
  });
});


cerrar.addEventListener('click', () => {
  visor.classList.add('oculto');
});


visor.addEventListener('click', (e) => {
  if (e.target === visor) {
    visor.classList.add('oculto');
  }
});