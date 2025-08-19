window.addEventListener('load', () => {
  const video = document.querySelector('video');
  video.muted = true;
  video.play().catch(() => {
    console.log('Autoplay bloqueado, requiere interacción');
  });
});

