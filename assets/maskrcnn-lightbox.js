(function () {
  const dialog = document.getElementById('imgDialog');
  const imgEl = document.getElementById('dialogImg');
  const closeBtn = dialog?.querySelector('.close');

  if (!dialog || !imgEl) return;

  // Open lightbox for every thumbnail that has data-full
  document.querySelectorAll('.thumb[data-full]').forEach((thumbBtn) => {
    thumbBtn.addEventListener('click', () => {
      const full = thumbBtn.getAttribute('data-full');
      const alt = thumbBtn.getAttribute('data-alt') || 'Full-size result image';

      if (full) imgEl.src = full;
      imgEl.alt = alt;

      try {
        dialog.showModal();
      } catch {
        dialog.show();
      }
    });
  });

  // Close button
  closeBtn?.addEventListener('click', () => dialog.close());

  // Click outside image/dialog area to close
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!inside) dialog.close();
  });

  // Esc to close
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    dialog.close();
  });
})();
