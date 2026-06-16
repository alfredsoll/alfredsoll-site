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



const counters = document.querySelectorAll("[data-count]");
let hasAnimated = false;

function animateCounters() {
  if (hasAnimated) return;

  counters.forEach(counter => {
    const target = +counter.dataset.count;
    const hasPlus = counter.dataset.plus === "true";

    let current = 0;

    const duration = 1200;
    const stepTime = Math.max(10, duration / target);

    const update = () => {
      current++;
      counter.textContent = current;

      if (current < target) {
        setTimeout(update, stepTime);
      } else {
        counter.textContent = hasPlus ? target + "+" : target;
      }
    };

    update();
  });

  hasAnimated = true;
}

// observer
const resultsSection = document.querySelector(".results");

if (resultsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, {
    threshold: 0.4
  });

  observer.observe(resultsSection);
}



document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("birthdayPopup");
  const card = document.getElementById("birthdayCard");
  const reopen = document.getElementById("birthdayReopen");

  const today = new Date();
  const isBirthday =
    today.getDate() === 16 &&
    today.getMonth() === 5;

  // disable hvis ikke fødselsdag
  if (!isBirthday) {
    if (popup) popup.remove();
    if (reopen) reopen.remove();
    return;
  }

  // CLOSE FUNCTION
  window.closeBirthdayPopup = function () {
    if (!popup) return;

    popup.style.opacity = "0";
    popup.style.pointerEvents = "none";

    setTimeout(() => {
      popup.style.display = "none";
      if (reopen) reopen.style.display = "block";
    }, 200);
  };

  // OPEN FUNCTION
  window.openBirthdayPopup = function () {
    if (!popup) return;

    popup.style.display = "flex";
    popup.style.opacity = "1";
    popup.style.pointerEvents = "auto";

    if (reopen) reopen.style.display = "none";
  };

  // click outside to close
  popup.addEventListener("click", (e) => {
    if (!card.contains(e.target)) {
      closeBirthdayPopup();
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBirthdayPopup();
    }
  });

});


function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

function copyCode(code) {
  navigator.clipboard.writeText(code);
  showToast("📋 Du har kopieret koden – gå til Discord for at indløse den");
}

function slotMachineCode(finalCode, el) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let iterations = 0;
  const maxIterations = 18;

  const interval = setInterval(() => {

    const random = Array.from({ length: finalCode.length })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");

    el.innerHTML = `
      <div class="code-result">
        <div class="slot" onclick="copyCode('${finalCode}')">
          ${random}
        </div>
      </div>
    `;

    iterations++;

    if (iterations >= maxIterations) {
      clearInterval(interval);

      el.innerHTML = `
        <div class="code-result done">
          <div class="slot" onclick="copyCode('${finalCode}')">
            ${finalCode}
          </div>
        </div>
      `;
    }

  }, 70);
}

window.checkCode = function () {
  const inputs = document.querySelectorAll("#codeBoxes input");

  const input = Array.from(inputs)
    .map(i => i.value)
    .join("")
    .trim()
    .toUpperCase();

  const rewardBox = document.getElementById("rewardBox");

  const correctCode = "HIPHURRA";

  if (input === correctCode) {

    const finalCode = "BDAY-" + Math.floor(1000 + Math.random() * 9000);

    slotMachineCode(finalCode, rewardBox);

  } else {
    rewardBox.innerHTML = "❌ Forkert kode. Prøv igen.";
  }
};


function copyCode(code) {
  navigator.clipboard.writeText(code);

  const el = document.getElementById("rewardBox");

  const msg = document.createElement("div");
  msg.className = "copy-msg";
  msg.textContent = "📋 Du har kopieret koden – gå til Discord for at indløse den";

  el.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("hide");

    setTimeout(() => {
      msg.remove();
    }, 300);
  }, 2500);
}


document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#codeBoxes input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
});
