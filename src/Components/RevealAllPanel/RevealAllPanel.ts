import { Container, Sprite, BitmapText } from 'pixi.js';
import gsap from 'gsap';
import {Howl} from 'howler';

import Button from "../../engine/Button/Button";
import Game from "../../Game";

class RevealAllPanel extends Container {
    private readonly _revealButton: Button = null;
    private readonly _showTween: gsap.core.Tween = null;
    private readonly _buttonClick: Howl = null;

    private _game: Game = null;

    constructor(game: Game) {
        super();
        this._game = game;
        this.visible = false;
        this.x = 50;
        this.y = -300;

        const panelBackground = Sprite.from(global.game.ui.textures['panelRevealAll.png']);

        this._revealButton = new Button(()=> {this._onRevealAllButtonPressed()}, {
            buttonText: "REVEAL ALL",
            textStyle: {
                fontName: 'skranji-white-interface-export',
                fontSize: 32,
                align: 'center',
            },
            active: {texture: global.game.ui.textures['buttonBackground.png']},
            pressed: {texture: global.game.ui.textures['buttonLighten.png']},
            inactive: {texture: global.game.ui.textures['buttonDarken.png']}
        });
        this._revealButton.x = 12;
        this._revealButton.y = 370;

        this._showTween = gsap.fromTo(this, {pixi: {positionY: -500}}, {pixi: {positionY: -300}, duration: 0.75, ease: "sine.out", paused: true});
        this._buttonClick = global.game.SND_Click;

        this.addChild(panelBackground, this._revealButton);
    }

    async show(): Promise<void> {
        this.visible = true;
        await this._showTween.restart();
        return Promise.resolve();
    }

    private _onRevealAllButtonPressed(): void {
        this._buttonClick.play();
        this._game.onRevealAllSymbolsPressed();
    }
}

export default RevealAllPanel;