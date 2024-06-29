import * as PIXI from 'pixi.js'

import { Sprite, Text } from "pixi.js";
import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";

import Background from "./Components/Background/Background";

export class Game {

    constructor() {

        const background = new Background()

        global.app.stage.addChild(
            background,
        );
    }
}

export default Game;