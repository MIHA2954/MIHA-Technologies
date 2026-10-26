// Mobile menu for static pages that don't load the React bundle (the /solutions/ pages).
(function () {
  var btn = document.querySelector('[data-site-menu-btn]');
  if (!btn) return;
  var panel = document.getElementById(btn.getAttribute('aria-controls'));
  var header = btn.closest('header');
  if (!panel || !header) return;

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
    panel.hidden = !open;
    header.classList.toggle('nav-menu-open', open);
  }

  btn.addEventListener('click', function () {
    setOpen(panel.hidden);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      btn.focus();
    }
  });
  document.addEventListener('pointerdown', function (e) {
    if (!panel.hidden && !header.contains(e.target)) setOpen(false);
  });
})();
