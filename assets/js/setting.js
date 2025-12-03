/* LocalStorage key */
const themeKey = "trackerpro_theme_v1";

/* GLOBAL FUNCTION for HTML onclick */
window.toggleTheme = function () {
  document.body.classList.toggle("dark");

  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem(themeKey, mode);
};

/* Auto-apply saved theme */
(function applyTheme() {
  const saved = localStorage.getItem(themeKey);
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
})();
