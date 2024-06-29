import { Container, Sprite } from 'pixi.js';

class Background extends Container {
    constructor() {
        super();

        const backgroundSprite = Sprite.from(global.game.background);

        backgroundSprite.width = 1369;
        backgroundSprite.height = 855;

        this.addChild(backgroundSprite);
    }
}

export default Background;