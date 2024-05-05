window.onload = function () {
  var canvas = document.getElementById("picassoCanvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(200, 100);
    ctx.lineTo(100, 200);
    ctx.lineTo(0, 100);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#AFEEEE";
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.moveTo(200, 0);
    ctx.lineTo(0, 200);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
  }
};

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

document.getElementById("mode-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  if (document.body.classList.contains("dark-mode")) {
    sunIcon.style.display = "none";
    moonIcon.style.display = "";
  } else {
    sunIcon.style.display = "";
    moonIcon.style.display = "none";
  }
});

window.addEventListener('load', function() {
  document.querySelector('.background-loader').style.display = 'none';
});
