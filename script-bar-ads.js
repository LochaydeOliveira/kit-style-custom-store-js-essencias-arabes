document.addEventListener("DOMContentLoaded", function () {
  
  const bar = document.querySelector(".header-hightlightbar .container");
  if (!bar) return;

  const rawText = bar.innerText;
  const messages = rawText.split("|").map(t => t.trim());

  let index = 0;

  bar.style.opacity = 0;
  bar.innerText = messages[0];

  setTimeout(() => {
    bar.style.transition = "opacity 0.6s ease";
    bar.style.opacity = 1;
  }, 100);

  function changeText() {
    bar.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % messages.length;
      bar.innerText = messages[index];
      bar.style.opacity = 1;
    }, 600);
  }

  setInterval(changeText, 3500);
});
