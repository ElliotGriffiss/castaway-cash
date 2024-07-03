import {Container, Sprite, BitmapText} from "pixi.js";

class WinUpToPanel extends Container {
    constructor(maxWin: number) {
        super();
        this.x = 545;
        this.y = 270;

        const winUpToSprite = Sprite.from(global.game.language.textures['winUpTo.psd']);

        const winUpToText = new BitmapText(`$${maxWin.toLocaleString()}` ,{
            fontName: 'skranji-interface-export',
            fontSize: 42,
            align: 'center',
        });
        winUpToText.x = 135;
        winUpToText.y = 60;
        winUpToText.anchor.x = 0.5;
        winUpToText.anchor.y = 0.5

        this.addChild(winUpToSprite, winUpToText);
    }
}

export default WinUpToPanel;