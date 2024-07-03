import * as PIXI from 'pixi.js';

import { extensions } from 'pixi.js';
import {gsap} from 'gsap';
import { PixiPlugin } from "gsap/PixiPlugin";
// @ts-ignore
import HowlerLoaderParser from 'howler-pixi-loader-middleware';

gsap.registerPlugin(PixiPlugin);

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

        PixiPlugin.registerPIXI(app);
        extensions.add(HowlerLoaderParser);
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