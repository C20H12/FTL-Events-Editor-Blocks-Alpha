const blocksTabBtn: HTMLDivElement = document.querySelector("#showBlocks")!;
const eventTestTabBtn: HTMLDivElement = document.querySelector("#showEvent")!;
const eventTestTab: HTMLDivElement = document.querySelector("#root")!;
const blocksEditTab: HTMLDivElement = document.querySelector("#blocksWorkspace")!;

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