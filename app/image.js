document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".image_container").forEach(container => {
    const mediaList = container.dataset.media.split(",").map(s => s.trim());
    let currentIndex = 0;

    // Crear ambos elementos y añadirlos al container
    const img = document.createElement("img");
    img.style.cursor = "ew-resize";
    img.style.display = "none";

    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.style.cursor = "ew-resize";
    video.style.display = "none";

    container.innerHTML = "";
    container.appendChild(img);
    container.appendChild(video);

    // Función para mostrar/ocultar elementos y actualizar src
    const show = (elementToShow, elementToHide, src) => {
      if (elementToShow.src !== src) {
        if (elementToShow.tagName.toLowerCase() === "video") {
          elementToShow.pause();
          elementToShow.src = src;
          elementToShow.load();
          elementToShow.play();
        } else {
          elementToShow.src = src;
        }
      }
      elementToShow.style.display = "block";
      elementToHide.style.display = "none";
    };

    // Mostrar el medio correcto según el índice
    const showMedia = index => {
      const src = mediaList[index];
      const isVideo = src.endsWith(".mp4");
      if (isVideo) {
        show(video, img, src);
      } else {
        show(img, video, src);
      }
    };

    container.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % mediaList.length;
      showMedia(currentIndex);
    });

    // Mostrar media inicial
    showMedia(currentIndex);
  });
});
