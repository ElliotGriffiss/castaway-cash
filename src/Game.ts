import { Sprite, Text } from "pixi.js";

export class Game {

    constructor() {

        const sprite1 = Sprite.from(global.game.Sprite1);
        const sprite2 = Sprite.from(global.game['Sprite2']);

        const text = new Text('This is a PixiJS text', {
            fontFamily: 'arcadeclassic-webfont',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });

        global.app.stage.addChild( sprite1, sprite2, text );
    }
}

export default Game;