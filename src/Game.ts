import { Sprite, Text } from "pixi.js";
import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";

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

        const button = new Button(
            ()=> {
                console.log("Boom!");
            },
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            }
        );

        void this.playAnimation();

        global.app.stage.addChild( sprite1, sprite2, text, button );
    }

    private async playAnimation(): Promise<void> {
        const animation1 = new Animation({
            prefix: "Animation",
            endingFrame: 4,
            loop: false,
            speedModifier: 0.05
        });
        animation1.position = {x: 50, y: 150}

        const animation2 = new Animation( {
            prefix: "Animation",
            endingFrame: 4,
            loop: true,
            speedModifier: 0.1
        });
        animation2.position = {x: 150, y: 150};

        global.app.stage.addChild( animation1, animation2 );

        await animation1.play();
        void animation2.play();
    }
}

export default Game;