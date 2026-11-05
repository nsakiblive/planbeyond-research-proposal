(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? '−' : '+';
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  const desktopQuery = window.matchMedia('(min-width: 821px)');
  desktopQuery.addEventListener('change', (event) => { if (event.matches) setMenu(false); });

  const dialog = document.querySelector('#image-dialog');
  const dialogImage = document.querySelector('#dialog-image');
  const caption = document.querySelector('#image-caption');
  let imageTrigger = null;
  document.querySelectorAll('[data-image]').forEach((button) => {
    button.addEventListener('click', () => {
      imageTrigger = button;
      dialogImage.src = button.dataset.image;
      dialogImage.alt = button.querySelector('img').alt;
      caption.textContent = button.dataset.caption;
      dialog.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  document.querySelector('#close-image').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (imageTrigger) imageTrigger.focus();
  });

  const copyButton = document.querySelector('#copy-email');
  const copyStatus = document.querySelector('#copy-status');
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('nsakib.live@gmail.com');
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = 'Email: nsakib.live@gmail.com';
    }
  });
})();
