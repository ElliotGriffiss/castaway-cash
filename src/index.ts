import * as PIXI from 'pixi.js';

/// Global Class To Handle Game Management
export class PixiAppManager {
    private m_app: PIXI.Application;

    constructor() {
        this.m_app = new PIXI.Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "blue",
            width: 1200,
            height: 800,
        });

        // @ts-ignore
        globalThis.__PIXI_APP__ = this.m_app;
    };
}

var TemplateGame = new PixiAppManager();