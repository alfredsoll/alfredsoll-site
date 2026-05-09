// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// NAVBAR SCROLL
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// COPY
function copyText(text, elementId) {
  navigator.clipboard.writeText(text);

  const el = document.getElementById(elementId);
  const original = el.textContent;

  el.textContent = "Kopieret!";

  setTimeout(() => {
    el.textContent = original;
  }, 1500);
}

function copyDiscord() {
  copyText("alfred_soll", "discordName");
}



const track = document.getElementById("sliderTrack");

function shuffleChildren(parent) {
  const nodes = Array.from(parent.children);

  for (let i = nodes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
  }

  nodes.forEach(node => parent.appendChild(node));
}

shuffleChildren(track);






document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("track");
  const cards = Array.from(document.querySelectorAll(".review-card"));

  const visible = 3;

  const firstClones = cards.slice(0, visible).map(c => c.cloneNode(true));
  const lastClones = cards.slice(-visible).map(c => c.cloneNode(true));

  lastClones.forEach(c => track.prepend(c));
  firstClones.forEach(c => track.append(c));

  const allCards = track.querySelectorAll(".review-card");

  let cardWidth = allCards[0].offsetWidth + 26;

  let index = visible;
  let isAnimating = false;

  function setPosition(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function move(dir) {
    if (isAnimating) return; // 🔥 STOP spam clicks

    isAnimating = true;

    index += dir;
    setPosition(true);

    setTimeout(() => {
      // reset højre side
      if (index >= allCards.length - visible) {
        setPosition(false);
        index = visible;
        setPosition(false);
      }

      // reset venstre side
      if (index < visible) {
        setPosition(false);
        index = allCards.length - (visible * 2);
        setPosition(false);
      }

      isAnimating = false; // 🔥 unlock
    }, 500);
  }

  window.move = move;

  setPosition(false);
});


const starSVG = (filled) => `
<svg class="star ${filled ? "" : "empty"}" viewBox="0 0 24 24">
  <path d="M12 17.3l-6.18 3.7 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.73 1.64 7.03z"/>
</svg>
`;

document.querySelectorAll(".stars").forEach(el => {
  const rating = +el.dataset.rating;

  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += starSVG(i <= rating);
  }

  el.innerHTML = html;
});


