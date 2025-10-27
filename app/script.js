const sidebar = document.getElementById("sidebar");
const floatingToggle = document.getElementById("floatingToggle");
const profilemenu = document.getElementById("profilemenu");
const addTaskMenu = document.getElementById("addTaskMenu");

const handleSideBarToggle = () => {
  sidebar.classList.toggle("-translate-x-full");

  if (sidebar.classList.contains("-translate-x-full")) {
    floatingToggle.classList.remove("md:hidden");
  } else {
    floatingToggle.classList.add("md:hidden");
  }
};

const handleProfileToggle = () => {
  profilemenu.classList.toggle("hidden");
};

const handleAddTaskMenuToggle = () => {
  addTaskMenu.classList.toggle("hidden");
};

document.addEventListener("keydown", (e) => {
  console.log(e.key);

  if (e.key === "m") {
    handleSideBarToggle();
  }

  if (e.key === "p") {
    handleProfileToggle();
  }

  if (e.key === "a") {
    handleAddTaskMenuToggle();
  }

  if (e.key === "Escape") {
    profilemenu.classList.add("hidden");
  }
});
