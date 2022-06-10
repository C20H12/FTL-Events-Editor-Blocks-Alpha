const menuBtns = document.querySelectorAll(".menus>div>button") as NodeListOf<HTMLButtonElement>;
const allMenus = document.querySelectorAll(".menus>div>ul") as NodeListOf<HTMLDivElement>;
const wholeDocument = document.querySelectorAll("#blocklyDiv,.btns") as NodeListOf<HTMLDivElement>;
const menuWrapper = document.querySelector(".menus") as HTMLDivElement;

menuBtns.forEach(elem => {
  const menuFull = menuWrapper.querySelector(`#${elem.id}~ul`) as HTMLUListElement;
  const otherMenus = menuWrapper.querySelectorAll(`div>ul:not(#${elem.id}~ul)`) as NodeListOf<HTMLUListElement>;
  
  elem.addEventListener("click", () => {
    menuFull.style.display = "block";
    
    otherMenus.forEach(elem2 => {
       elem2.style.display = "none"
    });
    
  });
});

wholeDocument.forEach(elem => {
  elem.addEventListener("click", () => {
    allMenus.forEach(elem => (elem.style.display = "none"));
  });
})

export default menuBtns