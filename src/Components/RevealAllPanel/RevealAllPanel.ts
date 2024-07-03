import { Container, Sprite, BitmapText } from 'pixi.js';
import gsap from 'gsap';

import Button from "../../engine/Button/Button";
import Game from "../../Game";

class RevealAllPanel extends Container {
    private readonly _revealButton: Button = null;
    private readonly _showTween: gsap.core.Tween = null;

    private _game: Game = null;

    constructor(game: Game) {
        super();
        this._game = game;
        this.visible = false;
        this.x = 50;
        this.y = -300;

        const panelBackground = Sprite.from(global.game.ui.textures['panelRevealAll.png']);

        this._revealButton = new Button(()=> {this._onRevealAllButtonPressed()}, {
            active: {texture: global.game.language.textures['revealAllButton.psd']},
            pressed: {texture: global.game.language.textures['revealAllButton.psd']},
            inactive: {texture: global.game.language.textures['revealAllButton.psd']}
        });
        this._revealButton.x = 12;
        this._revealButton.y = 370;

        this._showTween = gsap.fromTo(this, {pixi: {positionY: -500}}, {pixi: {positionY: -300}, duration: 0.75, ease: "sine.out", paused: true});

        this.addChild(panelBackground, this._revealButton);
    }

    async show(): Promise<void> {
        this.visible = true;
        await this._showTween.restart();
        return Promise.resolve();
    }

    private _onRevealAllButtonPressed(): void {
        this._game.onRevealAllSymbolsPressed();
    }
}

export default RevealAllPanel;