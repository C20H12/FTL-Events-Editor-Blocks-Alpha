import {
  ContinuousToolbox,
  ContinuousFlyout,
  ContinuousMetrics, // @ts-ignore
} from "@blockly/continuous-toolbox";
import { BlocklyToolboxDef } from "./toolbox";
import { toolbox } from "./toolbox"; // @ts-ignore
import { inject, JavaScript, Xml } from "blockly";


declare global {
  interface Window {
    showSaveFilePicker?: Function;
  }
}

type BlocklyWorkspaceInjectionOption = {
  plugins: {
    toolbox: any,
    flyoutsVerticalToolbox: any,
    metricsManager: any,
  },
  toolbox: BlocklyToolboxDef,
  zoom: {
    controls: boolean,
    wheel: boolean,
    startScale: number,
    maxScale: number,
    minScale: number,
    scaleSpeed: number,
    pinch: boolean,
  },
  move: {
    scrollbars: {
      horizontal: boolean,
      vertical: boolean,
    },
    drag: boolean,
    wheel: boolean,
  },
  trashcan: boolean,
  sounds: boolean,
  media: "./src/img/",
};


class EditorConfig {
  
  private outputArea = document.getElementById("outputArea") as HTMLTextAreaElement;
  public loadBlocksWorkspaceInput = document.querySelector('#loadBlocks') as HTMLInputElement;
  private workspaceOptionsObj: BlocklyWorkspaceInjectionOption = {
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
  };
  private workspace = inject('blocklyDiv', this.workspaceOptionsObj);
  

  private injectWorkspace(injectOptObj: BlocklyWorkspaceInjectionOption) {
    this.workspace.dispose()
    this.workspace = inject('blocklyDiv', injectOptObj);
    this.workspace.addChangeListener(this.outputUpdateHandle)
  }

  private outputUpdateHandle() {
    this.outputArea.value = JavaScript.workspaceToCode(this.workspace);
  }

  private async saveFile(data: string, fileName: string, desc: string, ext: string) {
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



  public saveProject() {
    
  }

  public loadProject() {

  }

  public downloadWorkspace() {
    const xml:Document = Xml.workspaceToDom(this.workspace);
  
    this.saveFile(
      Xml.domToPrettyText(xml), 
      "blocks_workspace", 
      "Blocks File", 
      ".xml"
    )
    .catch(() => console.warn("Saving process aborted!"));
  }

  public async importWorkspace() {
    const file = this.loadBlocksWorkspaceInput.files?.item(0);
    if (file == null) return;

    const text = await file.text();

    const xml:Element = Xml.textToDom(text);
    Xml.domToWorkspace(xml, this.workspace);
    this.loadBlocksWorkspaceInput.value = "";
  }

  public exportXml() {
    this.saveFile(
      this.outputArea.value || "<FTL/>",
      "events_generated.xml",
      "FTL Events data",
      ".append"
    )
    .catch(() => console.warn("Saving process aborted!"));
  }

}
  
// saving and loading handlers
//==================================================================
const saveProject = document.querySelector("[data-saveProject]") as HTMLButtonElement;
const loadProject = document.querySelector("[data-loadProject]") as HTMLButtonElement;
const downloadWorkSpace = document.querySelector("[data-downloadWs]") as HTMLButtonElement;
const loadWorkSpace = document.querySelector("[data-loadWs]") as HTMLButtonElement;
const exportGeneratedXml = document.querySelector("[data-exportXml]") as HTMLButtonElement;



const configHandler = new EditorConfig();



downloadWorkSpace.addEventListener("click", () => configHandler.downloadWorkspace());

exportGeneratedXml.addEventListener("click", () => configHandler.exportXml());

loadWorkSpace.addEventListener('click', () => {
  configHandler.loadBlocksWorkspaceInput.click()
});
configHandler.loadBlocksWorkspaceInput.addEventListener("change", () => {
  configHandler.importWorkspace()
});

