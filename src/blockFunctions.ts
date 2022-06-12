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
  } | null,
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
  grid: {
    spacing: number,
    length: number,
    colour: string,
    snap: boolean,
  } | null,
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


export default class EditorController {
  
  private outputArea = document.getElementById("outputArea") as HTMLTextAreaElement;
  public loadBlocksWorkspaceInput = document.querySelector('#loadBlocks') as HTMLInputElement;
  
  private workspacePlugins = {
    toolbox: ContinuousToolbox,
    flyoutsVerticalToolbox: ContinuousFlyout,
    metricsManager: ContinuousMetrics,
  };
  private workspaceGrid = {
    spacing: 30,
    length: 3,
    colour: '#ccc',
    snap: true
  };
  private workspaceOptionsObj: BlocklyWorkspaceInjectionOption = {
    plugins: this.workspacePlugins,
    toolbox: toolbox,
    zoom: {
      controls: true,
      wheel: false,
      startScale: 1.0,
      maxScale: 2,
      minScale: 0.3,
      scaleSpeed: 1.05,
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
    grid: null,
    trashcan: true,
    sounds: false,
    media: "./src/img/",
  };
  private workspace = inject('blocklyDiv', this.workspaceOptionsObj);


  constructor() {
    this.workspace.addChangeListener(() => {
      this.outputArea.value = JavaScript.workspaceToCode(this.workspace);
    });
  }
  

  private updateWorkspace(injectOptObj: BlocklyWorkspaceInjectionOption) {
    const tempAllBlocksXml: Element = Xml.workspaceToDom(this.workspace);
    this.workspace.dispose()
    this.workspace = inject('blocklyDiv', injectOptObj);
    this.workspace.addChangeListener(() => {
      this.outputArea.value = JavaScript.workspaceToCode(this.workspace);
    });
    Xml.domToWorkspace(tempAllBlocksXml, this.workspace);
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
    window.alert("saved for future use");
  }

  public loadProject() {
    window.alert("saved for future use");
  }

  public downloadWorkspace() {
    const xml:Element = Xml.workspaceToDom(this.workspace, true);
  
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

    const xml:Document = Xml.textToDom(text);
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


  public editorUndo() {
    this.workspace.undo(false);
  }

  public editorRedo() {
    this.workspace.undo(true);
  }

  public editorClear() { 
    this.workspace.clear();
  }


  public setIsContinuous(isContinuous: boolean) {
    this.workspaceOptionsObj.plugins = isContinuous ? this.workspacePlugins : null;
    this.updateWorkspace(this.workspaceOptionsObj);
  }

  public setCanZoom(isZoom: boolean) {
    this.workspaceOptionsObj.zoom.wheel = isZoom;
    this.updateWorkspace(this.workspaceOptionsObj);
  }

  public setCanScroll(isScroll: boolean) {
    this.workspaceOptionsObj.move.wheel = isScroll;
    this.updateWorkspace(this.workspaceOptionsObj);
  }

  public setHasTrashBin(isTrash: boolean) {
    this.workspaceOptionsObj.trashcan = isTrash;
    this.updateWorkspace(this.workspaceOptionsObj);
  }

  public setHasGrid(isGrid: boolean) {
    this.workspaceOptionsObj.grid = isGrid ? this.workspaceGrid : null;
    this.updateWorkspace(this.workspaceOptionsObj);
  }

  public refreshWorkspace() {
    this.updateWorkspace(this.workspaceOptionsObj);
  }
}

