const blocksTabBtn = document.querySelector("#showBlocks");
const eventTestTabBtn = document.querySelector("#showEvent");
const eventTestTab = document.querySelector("#root");
const blocksEditTab = document.querySelector("#blocksWorkspace");

blocksTabBtn.addEventListener("click", () => {
  eventTestTab.style.display = "none";
  blocksEditTab.style.display = "block";

  if (blocksTabBtn.className.split(/\s+/).includes("tabOpen")) return;

  blocksTabBtn.classList.toggle("tabOpen");
  eventTestTabBtn.classList.toggle("tabOpen");
});

eventTestTabBtn.addEventListener("click", () => {
  eventTestTab.style.display = "block";
  blocksEditTab.style.display = "none";

  if (eventTestTabBtn.className.split(/\s+/).includes("tabOpen")) return;

  blocksTabBtn.classList.toggle("tabOpen");
  eventTestTabBtn.classList.toggle("tabOpen");
})