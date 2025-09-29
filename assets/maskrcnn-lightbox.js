(function () {
  const thumbBtn = document.querySelector('#maskrcnn .thumb');
  const dialog   = document.getElementById('imgDialog');
  const imgEl    = document.getElementById('dialogImg');
  const closeBtn = dialog?.querySelector('.close');

  if (!thumbBtn || !dialog || !imgEl) return;

  // Open lightbox
  thumbBtn.addEventListener('click', () => {
    const full = thumbBtn.getAttribute('data-full');
    if (full) imgEl.src = full;
    try { dialog.showModal(); } catch { dialog.show(); }
  });

  // Close handlers
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                   e.clientY >= rect.top &&  e.clientY <= rect.bottom;
    if (!inside) dialog.close();  // click backdrop
  });

  // Esc to close (handled by <dialog> natively, fallback here)
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); dialog.close(); });
})();
