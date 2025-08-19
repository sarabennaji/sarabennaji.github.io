document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    document.querySelectorAll(".responsive-video").forEach(video => {
      const source = video.querySelector("source");
      if (source && source.src.includes("posts/")) {
        // Reemplazar por la versión "mobile"
        source.src = source.src.replace("posts/", "posts/mobile/");
        video.load();
        video.play().catch(() => {});
      }
    });
  }
});