import * as PIXI from 'pixi.js';
import Game from './Game';

/// Global Class To Handle Game Management
export class PixiAppManager {

    constructor() {
        const app = new PIXI.Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "orange",
            width: 1200,
            height: 800,
        });

        new Game(app);

        // @ts-ignore
        globalThis.__PIXI_APP__ = app;
    };
}

var TemplateGame = new PixiAppManager();