// Mantensur · lo poco que necesita la web: menú del móvil, selector de idioma y envío del formulario.
// Sin cookies ni almacenamiento en el navegador.
(function () {
  var boton = document.querySelector('.boton-menu'), menu = document.querySelector('.menu');
  if (boton && menu) boton.addEventListener('click', function () {
    var a = menu.classList.toggle('abierto'); boton.setAttribute('aria-expanded', a ? 'true' : 'false');
  });
  var idi = document.querySelector('.idiomas');
  if (idi) {
    var b = idi.querySelector('button');
    b.addEventListener('click', function (e) {
      e.stopPropagation(); var a = idi.classList.toggle('abierto'); b.setAttribute('aria-expanded', a ? 'true' : 'false');
    });
    document.addEventListener('click', function () { idi.classList.remove('abierto'); b.setAttribute('aria-expanded', 'false'); });
  }
  var f = document.querySelector('form.formulario');
  if (!f) return;
  var aviso = f.querySelector('.aviso-form'), enviar = f.querySelector('button[type=submit]');
  f.querySelector('[name=t]').value = String(Date.now());
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    aviso.className = 'aviso-form';
    enviar.disabled = true;
    fetch(f.action, { method: 'POST', body: new FormData(f), headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (r) {
        aviso.textContent = r.ok ? f.dataset.ok : f.dataset.mal;
        aviso.className = 'aviso-form ' + (r.ok ? 'ok' : 'mal');
        if (r.ok) f.reset();
      })
      .catch(function () { aviso.textContent = f.dataset.mal; aviso.className = 'aviso-form mal'; })
      .then(function () { enviar.disabled = false; f.querySelector('[name=t]').value = String(Date.now()); });
  });
})();
