// Hent type fra URL
const path = window.location.pathname.slice(1);
const type = path;

// DATA (du kan udvide senere)
const projects = {
  thumbnails: {
    title: "Thumbnails",
    meta: "YouTube • CTR design",
    desc: "Thumbnails designet til høj klikrate og stærk visuel impact.",
    hero: "slideshow/qna.png",
    images: [
      "slideshow/qna.png",
      "slideshow/foxithunmbnail.png",
      "slideshow/shadowbuidtbhumbnail.png",
      "slideshow/gerda_og_klunke_thumbnail.png",
      "slideshow/New_Project_13.png",
      "slideshow/sdf.png",
      "slideshow/Sverige_Thumbnail.png",
      "slideshow/thumbnailo.png",
      "slideshow/Untitled-1aaa.png",
      "slideshow/vega.png",
      "slideshow/rumthumbnail.png",
      "grafik/maxresdefault.png",
      "grafik/ometvthumbnaildaddydollas.png",
      "grafik/patroljulespecial.png",
      "grafik/pedothumbnail.png",
      "grafik/sldhf.png",
      "slideshow/billede_2026-05-09_203111448.png",
      "slideshow/shadowmicthumbnails.png",
      "grafik/forreder1.png",
      "slideshow/strandetpåenø.png",
      "slideshow/200subs.png",
      "slideshow/livefroggy.png",
      "slideshow/forædder2.png",
      "slideshow/supereasy.png",
      "slideshow/dyr.png",
      "slideshow/onrblock.png",
      "slideshow/skibidisigma.png",
    ]
  },

  logos: {
    title: "Logo Design",
    meta: "Branding • Identitet",
    desc: "Minimalistiske og moderne logoer til brands og communities.",
    hero: "slideshow/novidklogo.png",
    images: [
      "slideshow/novidklogo.png",
      "slideshow/pkstudio.png",
      "grafik/logo/7.png",
      "grafik/logo/400x400_baggrund.png",
      "grafik/logo/dktrollinglogo.png",
      "grafik/logo/image-5.png",
      "grafik/logo/image.png",
      "grafik/logo/image2.png",
      "grafik/logo/image34.png",
      "grafik/logo/kyralogo.png",
      "grafik/logo/New_Project_31.png",
      "grafik/logo/New_Project_45.png",
      "grafik/logo/ytlogo.png",
      "grafik/logo/pklogo2.png",
      "grafik/logo/shadowlogonice.png",
      "grafik/logo/sdfe.png",
    ]
  },

  banners: {
    title: "Bannere",
    meta: "Social media • Branding",
    desc: "Visuelle bannere til YouTube og sociale medier.",
    hero: "slideshow/ytbanner.png",
    images: [
      "slideshow/ytbanner.png",
      "slideshow/mufingfx.png",
      "grafik/bannere/alphamale.png",
      "grafik/bannere/channels4_banner (1).jpg",
      "grafik/bannere/channels4_banner.jpg",
      "grafik/bannere/dktrollingbanner.png",
      "grafik/bannere/idkbannerrr.png",
      "grafik/bannere/idkniceguys.png",
      "grafik/bannere/image.png",
      "grafik/bannere/New_Project_67.png",
      "grafik/bannere/TierrG_Banner.png",
      "grafik/bannere/jestrobanner.png",
    ]
  },
    editing: {
    title: "Editing",
    meta: "Video Editing",
    desc: "Et udvalg af mine redigeringsprojekter.",
    hero: "editing/thumbnails/edit1.jpg",
    images: [
      "editing/videos/edit1.mp4",
      "editing/videos/edit2.mp4",
      "editing/videos/edit3.mp4"
    ]
  }
};

// fallback hvis type mangler
if (!type || !projects[type]) {
  document.getElementById("title").innerText = "Projekt ikke fundet";
} else {

  const data = projects[type];

  // indsæt tekst
  document.getElementById("title").innerText = data.title;
  document.getElementById("meta").innerText = data.meta;
  document.getElementById("desc").innerText = data.desc;

  // hero billede
  const hero = document.getElementById("hero");
  hero.style.background = `url(${data.hero}) center/cover`;

  // gallery
  const gallery = document.getElementById("gallery");

  
data.images.forEach(src => {
  const wrap = document.createElement("div");
  wrap.className = "img-wrap";

  if (type === "editing") {
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";

    // Afspil preview, når musen holdes over videoen
    wrap.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    // Stop preview, når musen forlader videoen
    wrap.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });

    // Klik for at åbne videoen i en stor afspiller
    wrap.addEventListener("click", () => {
      const player = document.createElement("div");
      player.className = "video-overlay";

      const fullVideo = document.createElement("video");
      fullVideo.src = src;
      fullVideo.controls = true;
      fullVideo.autoplay = true;
      fullVideo.playsInline = true;

      const close = document.createElement("button");
      close.className = "video-close";
      close.textContent = "✕";

      function closePlayer() {
        fullVideo.pause();
        player.remove();
        document.removeEventListener("keydown", onKey);
      }

      function onKey(e) {
        if (e.key === "Escape") closePlayer();
      }

      close.addEventListener("click", closePlayer);

      player.addEventListener("click", e => {
        if (e.target === player) closePlayer();
      });

      document.addEventListener("keydown", onKey);

      player.append(close, fullVideo);
      document.body.appendChild(player);
    });

    wrap.appendChild(video);

  } else {
    const img = document.createElement("img");
    img.src = src;
    img.alt = data.title;
    wrap.appendChild(img);
  }

  gallery.appendChild(wrap);
});


}


document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});
