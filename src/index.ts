import * as PIXI from 'pixi.js';
import Game from './Game';
import "./style.css";

import Loader from "./engine/Loader/Loader";

/// Global Class To Handle Game Management
export class PixiAppManager {
    constructor() {
        const app = new PIXI.Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "#000000",
            width: 1369,
            height: 855,
        });

        global.app = app;
        globalThis.__PIXI_APP__ = app;

        void this._setup();
    }

    private async _setup(): Promise<void> {
        const loader = new Loader();

        await loader._preload();
        loader.createLoadingScreen();
        await loader.load();
        new Game();
        loader.destroyLoadingScreen();
    }
}

new PixiAppManager();