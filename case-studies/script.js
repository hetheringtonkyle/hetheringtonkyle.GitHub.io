function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener("DOMContentLoaded", () => {
  let count = 0;

  const WORDS = ["Delivers", "Matters", "Scales", "Excites"]; // your rotation words
  const SWAPPER = document.querySelector(".hero-title .swap");

  if (!SWAPPER) {
    console.error("SWAPPER not found. Check .hero-title .swap in your HTML.");
    return;
  }

  const SWAP = () => {
    // ✅ If user is hovering ANY flip card, skip swapping this tick
    if (document.querySelector(".flip:hover")) return;
    if (document.getElementById('mySidenav').style.width === '250px') return;

    const nextWord = WORDS[(count += 1) % WORDS.length];

    if (!document.startViewTransition) {
      SWAPPER.innerText = nextWord;
    } else {
      document.startViewTransition(() => {
        SWAPPER.innerText = nextWord;
      });
    }
  };

  SWAP();                 // run once immediately
  setInterval(SWAP, 2000); // keep rotating every 2s
});


