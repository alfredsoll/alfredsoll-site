
const params = new URLSearchParams(window.location.search);
const type = params.get("type") || window.location.pathname.slice(1);

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
      "slideshow/skibidisigma.png"
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
      "grafik/logo/sdfe.png"
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
      "grafik/bannere/jestrobanner.png"
    ]
  },

  editing: {
    title: "Videoredigering",
    meta: "Video Editing",
    desc: "Et udvalg af mine redigeringsprojekter.",
    hero: "billeder/editing.png",
    images: [
      "youtube:C2MUuaK8dR8",
      "youtube:qPvyxJdKbxA"
    ]
  }
};

const titleEl = document.getElementById("title");
const metaEl = document.getElementById("meta");
const descEl = document.getElementById("desc");
const hero = document.getElementById("hero");
const gallery = document.getElementById("gallery");

if (!type || !projects[type]) {
  if (titleEl) titleEl.innerText = "Projekt ikke fundet";
} else {
  const data = projects[type];

  if (titleEl) titleEl.innerText = data.title;
  if (metaEl) metaEl.innerText = data.meta;
  if (descEl) descEl.innerText = data.desc;

  if (hero) {
    hero.style.backgroundImage = `url("${data.hero}")`;
    hero.style.backgroundPosition = "center";
    hero.style.backgroundSize = "cover";
  }

  if (gallery) {
    gallery.innerHTML = "";

    data.images.forEach(src => {
      const wrap = document.createElement("div");
      wrap.className = "img-wrap";

      if (type === "editing" && src.startsWith("youtube:")) {
        const videoId = src.substring("youtube:".length);

        const img = document.createElement("img");
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        img.alt = data.title;
        img.loading = "lazy";
        wrap.classList.add("youtube-wrap");
        wrap.appendChild(img);

        // Vis en play-knap oven på previewet
        const playButton = document.createElement("div");
        playButton.className = "youtube-play-button";
        playButton.textContent = "▶";
        wrap.appendChild(playButton);

        wrap.style.cursor = "pointer";

        wrap.addEventListener("click", () => {
          const overlay = document.createElement("div");
          overlay.className = "video-overlay";

          const closeButton = document.createElement("button");
          closeButton.className = "video-close";
          closeButton.type = "button";
          closeButton.textContent = "✕";
          closeButton.setAttribute("aria-label", "Luk video");

          const iframe = document.createElement("iframe");
          iframe.src =
            `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
          iframe.title = data.title;
          iframe.allow =
            "autoplay; encrypted-media; picture-in-picture; fullscreen";
          iframe.allowFullscreen = true;

          function closePlayer() {
            iframe.src = "";
            overlay.remove();
            document.removeEventListener("keydown", onKeyDown);
          }

          function onKeyDown(event) {
            if (event.key === "Escape") closePlayer();
          }

          closeButton.addEventListener("click", closePlayer);

          overlay.addEventListener("click", event => {
            if (event.target === overlay) closePlayer();
          });

          document.addEventListener("keydown", onKeyDown);
          overlay.append(closeButton, iframe);
          document.body.appendChild(overlay);
        });
      } else {
        const img = document.createElement("img");
        img.src = src;
        img.alt = data.title;
        img.loading = "lazy";
        wrap.appendChild(img);
      }

      gallery.appendChild(wrap);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const updateNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", updateNav);
  updateNav();
});
