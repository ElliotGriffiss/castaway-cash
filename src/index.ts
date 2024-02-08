import * as PIXI from 'pixi.js';
import Game from './Game';

/// Global Class To Handle Game Management
export class PixiAppManager {
    private m_game: Game;

    constructor() {
        const app = new PIXI.Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "orange",
            width: 1200,
            height: 800,
        });

        this.m_game = new Game();

        // @ts-ignore
        globalThis.__PIXI_APP__ = app;
    };
}

var TemplateGame = new PixiAppManager();