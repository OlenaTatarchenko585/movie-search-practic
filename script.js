const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const list = document.getElementById("movieList");

button.addEventListener("click", () => {
  const query = input.value;
  console.log("You searched:", query);
});