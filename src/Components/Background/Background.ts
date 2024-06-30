import { Container, Sprite } from 'pixi.js';

class Background extends Container {
    constructor() {
        super();

        const backgroundSprite = Sprite.from(global.game.background);
        backgroundSprite.width = 1369;
        backgroundSprite.height = 855;

        const islandMiddle = Sprite.from(global.game.backgroundElements.textures['islandMiddle.png']);
        islandMiddle.x = 60;
        islandMiddle.y = 192;

        this.addChild(backgroundSprite, islandMiddle);
    }
}

export default Background;