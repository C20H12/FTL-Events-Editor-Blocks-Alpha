const blocksTabBtn = document.querySelector("#showBlocks") as HTMLDivElement;
const eventTestTabBtn = document.querySelector("#showEvent") as HTMLDivElement;
const eventTestTab = document.querySelector("#root") as HTMLDivElement;
const blocksEditTab = document.querySelector("#blocksWorkspace") as HTMLDivElement;

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

export default blocksEditTab;