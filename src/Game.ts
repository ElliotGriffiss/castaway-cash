import { Sprite, Text } from "pixi.js";

export class Game {

    constructor() {

        const sprite1 = Sprite.from(global.game.Sprite1);
        sprite1.position = {x: 50, y: 50};

        const sprite2 = Sprite.from(global.game['Sprite2']);
        sprite2.position = {x: 150, y: 50};

        const text = new Text('This is a PixiJS text', {
            fontFamily: 'arcadeclassic-webfont',
            fontSize: 24,
            fill: 0xff1010,
            align: 'center',
        });

        text.position = {x: 125, y: 15};

        global.app.stage.addChild( sprite1, sprite2, text );
    }
}

export default Game;