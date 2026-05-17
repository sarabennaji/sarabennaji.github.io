document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    document.querySelectorAll(".responsive-video").forEach(video => {
      const source = video.querySelector("source");
      if (!source) return;

      // Cambiar ruta según la carpeta
      if (source.src.includes("posts/")) {
        source.src = source.src.replace("posts/", "posts/mobile/");
      } else if (source.src.includes("motion/")) {
        source.src = source.src.replace("motion/", "motion/mobile/");
      }

      video.load();
      video.play().catch(() => {}); // evitar errores si autoplay falla
    });
  }
});
