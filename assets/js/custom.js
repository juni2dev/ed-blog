document.addEventListener('DOMContentLoaded', function () {

  // === 1. Créer un panneau TOC à gauche ===
  const tocSource = document.querySelector('div.post_toc #TableOfContents');
  const gridContainer = document.querySelector('div.grid-inverse.wrap.content');

  if (tocSource && gridContainer) {
    const tocPanel = document.createElement('div');
    tocPanel.id = 'toc-left-panel';

    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Dans cet article';
    tocPanel.appendChild(tocTitle);

    const tocClone = tocSource.cloneNode(true);
    tocPanel.appendChild(tocClone);

    // Insérer comme premier enfant du grid
    gridContainer.insertBefore(tocPanel, gridContainer.firstChild);
  }

  // === 2. Scroll spy ===
  const tocLinks = document.querySelectorAll('#toc-left-panel a');
  const headings = document.querySelectorAll('div.post_body h2, div.post_body h3');

  function getActiveHeading() {
    const scrollY = window.scrollY + 120;
    let active = null;
    headings.forEach(h => {
      if (h.offsetTop <= scrollY) active = h;
    });
    return active;
  }

  function updateToc() {
    const active = getActiveHeading();
    tocLinks.forEach(link => {
      link.classList.remove('toc-active');
      if (active && link.getAttribute('href') === '#' + active.id) {
        link.classList.add('toc-active');
      }
    });
  }

  // === 3. Barre de progression ===
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  document.body.prepend(progressBar);

  const article = document.querySelector('div.post_body');

  function updateProgress() {
    if (!article) return;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrolled = window.scrollY - articleTop;
    const percent = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
    progressBar.style.width = percent + '%';
  }

  window.addEventListener('scroll', () => {
    updateToc();
    updateProgress();
  }, { passive: true });

  updateToc();
  updateProgress();

});
