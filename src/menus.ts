const menuBtns = document.querySelectorAll(".menus>div>button");
const allMenus = document.querySelectorAll(".menus>div>ul");

menuBtns.forEach(elem => {
  const menuFull = document.querySelector(`#${elem.id}~ul`);
  const otherMenus = document.querySelectorAll(`.menus>div>ul:not(#${elem.id}~ul)`)
  elem.addEventListener("click", () => {
    menuFull.style.display = "block";
    otherMenus.forEach(elem2 => {
       elem2.style.display = "none"
    });
  });
});

document.querySelector("#blocklyDiv").addEventListener("click", () => {
    allMenus.forEach(elem => (elem.style.display = "none"));
});

