

/* -------------------------------------- */
/* ------------  Settings  -------------- */
/* -------------------------------------- */

text = 'KYLE HETHERINGTON';  // The message displayed
chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';  // All possible Charactrers
scale = 61;  // Font size and overall scale
breaks = 0.009;  // Speed loss per frame
endSpeed = 0.005;  // Speed at which the letter stopps
firstLetter = 200;  // Number of frames untill the first letter stopps (60 frames per second)
delay = 5;  // Number of frames between letters stopping

function setScaleForViewport() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    scale = 22;   // smaller on mobile (adjust as you like)
  } else {
    scale = 61;   // default for desktop
  }
}

let animationDone = false;
canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

setScaleForViewport();

text = text.split('');
chars = chars.split('');
charMap = [];
offset = [];
offsetV = [];

for(var i=0;i<chars.length;i++){
  charMap[chars[i]] = i;
}

for(var i=0;i<text.length;i++){
  var f = firstLetter+delay*i;
  offsetV[i] = endSpeed+breaks*f;
  offset[i] = -(1+f)*(breaks*f+2*endSpeed)/2;
}

(onresize = function(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
})();

requestAnimationFrame(loop = function () {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Banner (currently transparent)
  ctx.fillStyle = 'transparent';
  const bannerHeight = scale * 1.7;
  ctx.fillRect(
    0,
    (canvas.height - bannerHeight) / 2,
    canvas.width,
    bannerHeight
  );

  // Track whether ALL letters have stopped this frame
  let allStopped = true;

  for (var i = 0; i < text.length; i++) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Center the whole text row
    ctx.setTransform(
      1,
      0,
      0,
      1,
      Math.floor((canvas.width - scale * (text.length - 1)) / 2),
      Math.floor(canvas.height / 2)
    );

    var o = offset[i];
    while (o < 0) o++;
    o %= 1;

    var h = Math.ceil(canvas.height / 2 / scale);

    for (var j = -h; j < h; j++) {
      var c = charMap[text[i]] + j - Math.floor(offset[i]);
      while (c < 0) c += chars.length;
      c %= chars.length;

      var s = 1 - Math.abs(j + o) / (canvas.height / 2 / scale + 1);

      // Default "trail" letters
      ctx.globalAlpha = s;
      ctx.fillStyle = '#F8FAFC'; // trail color
      ctx.font = scale * s + 'px Helvetica'; // trail size

      // Highlight the center, final letter when this letter has stopped
      var isCenterLetter =
        offsetV[i] === 0 && Math.abs(j + o) < 0.5;

      if (isCenterLetter) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#6D98E3';           // main message color
        ctx.font = scale * 1.5 + 'px Helvetica'; // bigger
      }

      ctx.fillText(chars[c], scale * i, (j + o) * scale);
    }

    // Update motion for this letter
    offset[i] += offsetV[i];
    offsetV[i] -= breaks;

    if (offsetV[i] < endSpeed) {
      offset[i] = 0;
      offsetV[i] = 0;
    }

    // If ANY letter still moving, animation not done
    if (offsetV[i] !== 0) {
      allStopped = false;
    }
  }

  // When ALL letters have stopped for the first time, trigger your element
  if (!animationDone && allStopped) {
    animationDone = true;
  
    const firstEl = document.getElementById('sub-head');
    const secondEl = document.getElementById('cards'); // second element
  
    if (firstEl) {
      firstEl.classList.add('active'); // activate immediately
    }
  
    if (secondEl) {
      setTimeout(() => {
        secondEl.classList.add('active'); // activate 1s later
      }, 1000); // 1000ms = 1 second
    }
  }

  requestAnimationFrame(loop);
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
