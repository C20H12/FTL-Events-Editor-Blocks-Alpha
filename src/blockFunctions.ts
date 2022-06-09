import {
  ContinuousToolbox,
  ContinuousFlyout,
  ContinuousMetrics,
  // @ts-ignore
} from "@blockly/continuous-toolbox";
import { toolbox } from "./toolbox";
// @ts-ignore
import { inject, JavaScript, Xml } from "blockly";

declare global {
  interface Window {
    showSaveFilePicker?: Function;
  }
}


const outputArea = document.getElementById("outputArea") as HTMLTextAreaElement;
const downloadWorkSpace = document.querySelector("[data-downloadWs]") as HTMLButtonElement;
const exportGeneratedXml = document.querySelector("[data-exportXml]") as HTMLButtonElement;
const loadProject = document.querySelector("[data-loadProject]") as HTMLButtonElement;
const loadBlocksWorkspace = document.querySelector('#loadBlocks') as HTMLInputElement;
//==================================================================

const workspaceOptionsObj = {
  plugins: {
    toolbox: ContinuousToolbox,
    flyoutsVerticalToolbox: ContinuousFlyout,
    metricsManager: ContinuousMetrics,
  },
  toolbox: toolbox,
  zoom: {
    controls: true,
    wheel: false,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  move: {
    scrollbars: {
      horizontal: true,
      vertical: true,
    },
    drag: true,
    wheel: true,
  },
  trashcan: true,
  sounds: false,
  media: "./src/img/",
}
let workspace = inject("blocklyDiv", workspaceOptionsObj);

// real time update handler
function dynamicUpdater(_: any) {
  let allcode = JavaScript.workspaceToCode(workspace);
  outputArea.value = allcode;
}
workspace.addChangeListener(dynamicUpdater);

// document.querySelector("#test").addEventListener("click", () => {
//   workspace.dispose();
//   workspace = inject("blocklyDiv", {
//     plugins: {
//       toolbox: ContinuousToolbox,
//       flyoutsVerticalToolbox: ContinuousFlyout,
//       metricsManager: ContinuousMetrics,
//     },
//     toolbox: toolbox,
//     zoom: {
//       controls: false,
//       wheel: false,
//       startScale: 1.0,
//       maxScale: 3,
//       minScale: 0.3,
//       scaleSpeed: 1.2,
//       pinch: true,
//     },
//     move: {
//       scrollbars: {
//         horizontal: false,
//         vertical: false,
//       },
//       drag: true,
//       wheel: true,
//     },
//     trashcan: true,
//     sounds: false,
//     media: "./src/img/",
//   });
//   workspace.addChangeListener(dynamicUpdater);
// });

// saving and loading handlers
async function saveFile(data: string, fileName: string, desc: string, ext: string) {
  const file = new Blob([data], { type: "text/xml" });
  if (typeof window?.showSaveFilePicker === "function") {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: desc,
          accept: { "text/xml": [ext] },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(file);
    writable.close();
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    const urlFile = window.URL.createObjectURL(file)
    a.href = urlFile;
    a.download = fileName + ext;
    a.click();
    window.URL.revokeObjectURL(urlFile);
    a.remove();
  }
}

downloadWorkSpace.addEventListener("click", () => {
  const xml = Xml.workspaceToDom(workspace);
  const xmlString = Xml.domToPrettyText(xml);

  saveFile(xmlString, "blocks_workspace", "Blocks File", ".xml").catch(() =>
    console.log("Saving process aborted!")
  );
});

exportGeneratedXml.addEventListener("click", () => {
  const outputXmlString = outputArea.value || "<empty/>";

  saveFile(
    outputXmlString,
    "events_generated.xml",
    "FTL Events data",
    ".append"
  ).catch(() => console.log("Saving process aborted!"));
});

loadProject.addEventListener('click', () => {
  loadBlocksWorkspace.click()
})

loadBlocksWorkspace.addEventListener("change", async () => {
    const file = loadBlocksWorkspace.files!.item(0);
    if (file === null) return;

    const text = await file.text();

    const xml:Element = Xml.textToDom(text);
    Xml.domToWorkspace(xml, workspace);
    loadBlocksWorkspace.value = "";
  });
