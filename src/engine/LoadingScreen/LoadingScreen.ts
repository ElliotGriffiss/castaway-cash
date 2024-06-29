import { Container, Sprite } from 'pixi.js';

import Bar from "../Bar/Bar";
import background from "../../Components/Background/Background";

class LoadingScreen extends Container {
    private readonly _bar: Bar = null;

    constructor() {
        super();

        this.width = 1369;
        this.height = 855;

        this._bar = new Bar({
            maxWidth: 145,
            height: 5
        });
        this._bar.position = {x:168, y:177.5};

        const backgroundSprite = Sprite.from(global.preload.LoadingScreen);
        backgroundSprite.width = 1369;
        backgroundSprite.height = 855;

        const loadingBarBackground = Sprite.from(global.preload.LoadingBarBackground);
        loadingBarBackground.position = {x: 240, y: 180};
        loadingBarBackground.anchor.set(0.5, 0.5);

        this.addChild(backgroundSprite, loadingBarBackground, this._bar);
    }

    updateProgress(progress: number) {
        this._bar.progress = progress;
    }
}

export default LoadingScreen;