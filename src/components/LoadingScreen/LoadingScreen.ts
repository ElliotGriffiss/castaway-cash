import { Assets, Container, Sprite } from 'pixi.js';

class LoadingScreen extends Container {
    constructor() {
        super();

        const backgroundSprite = Sprite.from(global.preload.LoadingScreen);
        this.addChild(backgroundSprite);
    }
}

export default LoadingScreen;