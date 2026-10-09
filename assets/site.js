// Progressive enhancement: all content and links work without JavaScript.
(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('#site-nav');
  if (header && button && nav) {
    header.classList.add('nav-enhanced');
    button.hidden = false;
    const close = () => {
      button.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        close();
        button.focus();
      }
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    window.matchMedia('(min-width: 601px)').addEventListener('change', close);
  }
  // Original images replace the bundled artwork only after loading successfully.
  document.querySelectorAll('img[data-image]').forEach(image => {
    const candidate = new Image();
    candidate.onload = () => { image.src = candidate.src; };
    candidate.onerror = () => {}; // Keep the local SVG when an original is not yet supplied.
    candidate.src = image.dataset.image;
  });
})();
