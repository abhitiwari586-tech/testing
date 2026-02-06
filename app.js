const $ = (id) => document.getElementById(id);

function extractYouTubeId(url) {
  const u = new URL(url);
  if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
  return u.searchParams.get("v");
}

function autoplaySong(iso, root) {
  const song = window.SONGS[iso];
  if (!song) return;

  const vid = extractYouTubeId(song.url);
  const iframe = document.createElement("iframe");

  iframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&rel=0&playsinline=1`;
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.className = "player";

  root.appendChild(iframe);
}

function initIndex() {
  const list = $("dateList");

  window.SURPRISE_DATES.forEach((d, i) => {
    const card = document.createElement("div");
    card.className = "box";
    card.innerHTML = `
      <h3>Day ${i + 1}</h3>
      <p>Something I want you to feel today.</p>
      <a class="btn" href="day-${i + 1}.html">Open</a>
    `;
    list.appendChild(card);
  });
}

function initDayPage(iso) {
  const grid = $("grid");

  autoplaySong(iso, grid);

  // DAY CONTENT
  if (iso === "2026-02-06") {
    grid.innerHTML += `
      <div class="box">
        <p class="poem">
          Shall I compare thee to a summer’s day?<br>
          Thou art more lovely and more temperate…
        </p>

        <button class="btn" onclick="this.nextElementSibling.style.display='block'">
          What this means to me
        </button>

        <p class="soft" style="display:none">
          Your eyes don’t try to impress.<br>
          They stay.<br>
          They soften the world.<br>
          And they feel like home.
        </p>
      </div>
    `;
  }
}
