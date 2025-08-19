function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('autoVideo');

  // Intentar reproducir inmediatamente
  video.muted = true;
  video.play().catch(() => {
    // Si falla y es móvil, reproducir tras primer toque
    if (isMobile()) {
      const onFirstTouch = () => {
        video.play();
        document.removeEventListener('touchstart', onFirstTouch);
      };
      document.addEventListener('touchstart', onFirstTouch);
    }
  });
});
