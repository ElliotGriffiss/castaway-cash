import * as PIXI from 'pixi.js'
import {Sprite} from "pixi.js";

export class Game {
    private m_app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.m_app = app;

        const sprite = Sprite.from('assets/goblin.png');

        this.m_app.stage.addChild(sprite);
    }
}

export default Game;