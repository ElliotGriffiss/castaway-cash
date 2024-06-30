import { Container, Sprite } from 'pixi.js';

class Foreground extends Container {
    constructor() {
        super();

        const bushesL = Sprite.from(global.game.backgroundElements.textures['bushesL.png']);
        bushesL.x = -130;
        bushesL.y = 610;

        const bushesR = Sprite.from(global.game.backgroundElements.textures['bushesR.png']);
        bushesR.x = 1130;
        bushesR.y = 610;

        const parmL = Sprite.from(global.game.backgroundElements.textures['palmL.png']);
        parmL.x = -580;
        parmL.y = -200;

        const parmR = Sprite.from(global.game.backgroundElements.textures['palmR.png']);
        parmR.x = 1160;
        parmR.y = -200;

        const logo = Sprite.from(global.game.logo);
        logo.x = 684.5;
        logo.y = -170;
        logo.anchor.x = 0.5;

        this.addChild(bushesL, bushesR, parmL, parmR, logo);
    }

}

export default Foreground;