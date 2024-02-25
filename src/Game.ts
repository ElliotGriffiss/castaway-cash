import { Sprite, Text } from "pixi.js";
import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";

export class Game {

    constructor() {
        const sprite1 = Sprite.from(global.game.Sprite1);
        sprite1.position = {x: 50, y: 50};

        const sprite2 = Sprite.from(global.game['Sprite2']);
        sprite2.position = {x: 150, y: 50};

        const text1 = new Text('PIXI JS Template', {
            fontFamily: '04b30',
            fontSize: 24,
            fill: "#FFFFFF",
            align: 'center'
        });
        text1.position = {x: 70, y: 15};

        const text2 = new Text('Text 2', {
            fontFamily: 'arcadeclassic',
            fontSize: 24,
            fill: "#FFFFFF",
            align: 'center'
        });
        text2.position = {x: 300, y: 50};

        const text3 = new Text('Text 3', {
            fontFamily: 'minecraftmedium',
            fontSize: 24,
            fill: "#FFFFFF",
            align: 'center'
        });
        text3.position = {x: 300, y: 80};

        void this.playAnimations();

        global.app.stage.addChild( sprite1, sprite2, text1, text2, text3 );
    }

    private async playAnimations(): Promise<void> {
        const animation1 = new Animation({
            prefix: "Animation",
            endingFrame: 4,
            loop: false,
            speedModifier: 0.05
        });
        animation1.position = {x: 50, y: 150};

        const animation2 = new Animation( {
            prefix: "Animation",
            endingFrame: 4,
            loop: true,
            speedModifier: 0.1
        });
        animation2.position = {x: 150, y: 150};

        const button = new Button(
            async ()=> {
                button.isActive = false;
                await animation1.play();
                button.isActive = true;
            },
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            }
        );
        button.position = {x:35, y: 250};

        global.app.stage.addChild( animation1, animation2, button );

        void animation2.play();
    }
}

export default Game;