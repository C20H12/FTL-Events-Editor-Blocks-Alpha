import EditorController from "./blockFunctions";

const configHandler = new EditorController();

// open menu and close menu handlers
const menuBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".menus>div>button"
);
const allMenus: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  ".menus>div>ul"
);
const allMenusButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  '.menus>div>ul button'
);
const wholeDocument: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  "#blocklyDiv,.btns, #outputArea"
);
const menuWrapper = document.querySelector(".menus") as HTMLDivElement;

menuBtns.forEach(elem => {
  const menuFull = menuWrapper.querySelector(
    `#${elem.id}~ul`
  ) as HTMLUListElement;
  const otherMenus = menuWrapper.querySelectorAll(
    `div>ul:not(#${elem.id}~ul)`
  ) as NodeListOf<HTMLUListElement>;

  elem.addEventListener("click", () => {
    menuFull.style.display = "block";

    otherMenus.forEach(elem2 => {
      elem2.style.display = "none";
    });
  });
});

const closeMenus = () => {
  allMenus.forEach(elem => (elem.style.display = "none"));
};
wholeDocument.forEach(elem => {
  elem.addEventListener("click", closeMenus);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeMenus();
  }
});
allMenusButtons.forEach(elem => elem.addEventListener('click', closeMenus))
// saving and loading handlers
const saveProject = document.querySelector(
  "[data-saveProject]"
) as HTMLButtonElement;
const loadProject = document.querySelector(
  "[data-loadProject]"
) as HTMLButtonElement;
const downloadWorkSpace = document.querySelector(
  "[data-downloadWs]"
) as HTMLButtonElement;
const loadWorkSpace = document.querySelector(
  "[data-loadWs]"
) as HTMLButtonElement;
const exportGeneratedXml = document.querySelector(
  "[data-exportXml]"
) as HTMLButtonElement;

loadProject.addEventListener("click", () => configHandler.loadProject());
saveProject.addEventListener("click", () => configHandler.saveProject());

downloadWorkSpace.addEventListener("click", () =>
  configHandler.downloadWorkspace()
);

loadWorkSpace.addEventListener("click", () => {
  configHandler.loadBlocksWorkspaceInput.click();
});
configHandler.loadBlocksWorkspaceInput.addEventListener("change", () => {
  configHandler.importWorkspace();
});

exportGeneratedXml.addEventListener("click", () => configHandler.exportXml());

// edit menu handlers
const editUndo = document.querySelector("[data-undo]") as HTMLButtonElement;
const editRedo = document.querySelector("[data-redo]") as HTMLButtonElement;
const editClear = document.querySelector("[data-clear]") as HTMLButtonElement;

editUndo.addEventListener("click", () => configHandler.editorUndo());
editRedo.addEventListener("click", () => configHandler.editorRedo());
editClear.addEventListener("click", () => configHandler.editorClear());

// block workspace handlers
const editorContinuous = document.querySelector(
  "[data-editorContinuous]"
) as HTMLInputElement;
const editorZoom = document.querySelector(
  "[data-editorZoom]"
) as HTMLInputElement;
const editorScroll = document.querySelector(
  "[data-editorScroll]"
) as HTMLInputElement;
const editorTrash = document.querySelector(
  "[data-editorTrash]"
) as HTMLInputElement;
const editorGrid = document.querySelector(
  "[data-editorGrid]"
) as HTMLInputElement;

editorContinuous.addEventListener("change", () =>
  configHandler.setIsContinuous(editorContinuous.checked)
);
editorZoom.addEventListener("change", () =>
  configHandler.setCanZoom(editorZoom.checked)
);
editorScroll.addEventListener("change", () =>
  configHandler.setCanScroll(editorScroll.checked)
);
editorTrash.addEventListener("change", () =>
  configHandler.setHasTrashBin(editorTrash.checked)
);
editorGrid.addEventListener("change", () =>
  configHandler.setHasGrid(editorGrid.checked)
);

// page layout handlers
const layoutButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  "[data-layoutTopDown], [data-layoutLeftRight], [data-layoutRightLeft]"
);
const layoutAreas: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  "#blocksAreasWrapper, #blocklyDiv, #outputArea"
);

layoutButtons.forEach(elem => {
  elem.addEventListener("click", () => {
    layoutAreas.forEach(elem2 => {
      console.log(elem.dataset)
      if ("layouttopdown" in elem.dataset)
        elem2.className = "topdown";
      else if ("layoutleftright" in elem.dataset)
        elem2.className = "leftright";
      else if ("layoutrightleft" in elem.dataset)
        elem2.className = "rightleft";
    })
    configHandler.refreshWorkspace();
  })
});