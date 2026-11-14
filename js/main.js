/* PetSana — menú del celular, aparición suave al bajar y formulario de demostración (no envía nada). */
(function () {
  'use strict';

  // Menú del celular
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  function cerrar() { menu.classList.remove('abierto'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) cerrar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });

  // Línea fina bajo el menú cuando se baja
  var nav = document.querySelector('.nav');
  function fondoMenu() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  fondoMenu(); window.addEventListener('scroll', fondoMenu, { passive: true });

  // Aparición suave
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visto'); });
  }

  // Botones que en una página real abrirían otra cosa: avisan que esto es una demostración
  var aviso = document.getElementById('aviso'), avisoTxt = document.getElementById('aviso-txt'), avisoX = document.getElementById('aviso-x'), t = 0;
  function mostrarAviso(frase) {
    avisoTxt.textContent = 'Esto es una demostración: en tu página real, ' + frase;
    aviso.hidden = false;
    clearTimeout(t); t = setTimeout(function () { aviso.hidden = true; }, 5500);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-demo]') : null;
    if (!a) return;
    e.preventDefault();
    mostrarAviso(a.getAttribute('data-demo'));
  });
  avisoX.addEventListener('click', function () { aviso.hidden = true; clearTimeout(t); });

  // Formulario: es una demostración, no se envía a ningún lado
  var form = document.getElementById('form-cita'), ok = document.getElementById('form-ok');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ok.hidden = false;
    form.reset();
  });
})();
