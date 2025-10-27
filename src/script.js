if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker Registered!", reg))
    .catch((err) => console.log("Service Worker Registration Failed!", err));
}

const hoverImage = document.getElementById("hoverImage");
const mainContainer = document.querySelector(".main-container");

let ticking = false;

mainContainer.addEventListener("mousemove", (e) => {
  const rect = hoverImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      hoverImage.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`;
      hoverImage.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`;
      ticking = false;
    });
  }
});

mainContainer.addEventListener("mouseleave", () => {
  hoverImage.style.maskImage =
    "radial-gradient(circle 50px at 0px 0px, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)";
  hoverImage.style.webkitMaskImage =
    "radial-gradient(circle 50px at 0px 0px, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)";
});

const menu = document.querySelector("#menu");
const toggleMenu = () => {
  menu.classList.toggle("translate-x-full");
};
