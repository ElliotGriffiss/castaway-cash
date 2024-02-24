import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import Game from './Game';
import AssetsManifest from './AssetManifest.json';
import "./style.css";

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";


/// Global Class To Handle Game Management
export class PixiAppManager {
    private _loadingScreen: LoadingScreen = null;

    constructor() {
        const app = new PIXI.Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "#000000",
            width: 480,
            height: 320,
        });

        global.app = app;
        globalThis.__PIXI_APP__ = app;

        void this._setup();
    };

    private async _setup(): Promise<void> {
        await this._preload();
        this._createLoadingScreen();
        await this._load();
        const game = new Game();
        this._loadingScreen.destroy();
    }

    private async _preload(): Promise<void> {
        await PIXI.Assets.init({ manifest: AssetsManifest});
        global.preload = await PIXI.Assets.loadBundle("preload");

    }

    private _createLoadingScreen(): void {
        this._loadingScreen = new LoadingScreen();
        global.app.stage.addChild(this._loadingScreen);
    }

    private async _load(): Promise<void> {
        await Promise.all( [
            global.game = await PIXI.Assets.loadBundle("game"),
            ...( AssetsManifest.bundles[0].assets.map(async ({name})=> {
                const font = new FontFaceObserver(name);
                return font.load();
            }) )
        ]);
    }
}

var TemplateGame = new PixiAppManager();