import { Container, Sprite, BitmapText } from 'pixi.js';
import gsap from 'gsap';

import Button from "../../engine/Button/Button";
import Game from "../../Game";

class WinningsPanel extends Container {
    private readonly _winAmountText: BitmapText = null;
    private readonly _playButton: Button = null;
    private readonly _setBetButton: Button = null;

    private readonly _showTween: gsap.core.Tween = null;

    private _game: Game = null;

    constructor(game: Game) {
        super();
        this._game = game;
        this.visible = false;

        const backgroundSprite = Sprite.from(global.game.ui.textures['panelEndMessage.psd']);
        backgroundSprite.x = 405;
        backgroundSprite.y = -260;

        const winMessageSprite = Sprite.from(global.game.language.textures['winMessage.psd']);
        winMessageSprite.x = 405;
        winMessageSprite.y = 60;

        this._winAmountText = new BitmapText(`$0`, {
            fontName: 'worksans-orange-export',
            fontSize: 60,
            align: 'center',
        });
        this._winAmountText.x = 640;
        this._winAmountText.y = 120;

        this._playButton = new Button(()=> {this._onPlayButtonPressed()}, {
            buttonText: "PLAY",
            textStyle: {
                fontName: 'skranji-white-interface-export',
                fontSize: 42,
                align: 'center',
            },
            active: {texture: global.game.ui.textures['buttonBackground.png']},
            pressed: {texture: global.game.ui.textures['buttonLighten.png']},
            inactive: {texture: global.game.ui.textures['buttonDarken.png']}
        });
        this._playButton.x = 420;
        this._playButton.y = 190;

        this._setBetButton = new Button(()=> {this._onSetBetButtonPressed()}, {
            buttonText: "SET BET",
            textStyle: {
                fontName: 'skranji-white-interface-export',
                fontSize: 42,
                align: 'center',
            },
            active: {texture: global.game.ui.textures['buttonBackground.png']},
            pressed: {texture: global.game.ui.textures['buttonLighten.png']},
            inactive: {texture: global.game.ui.textures['buttonDarken.png']}
        });
        this._setBetButton.x = 690;
        this._setBetButton.y = 190;

        this._showTween = gsap.fromTo(this, {pixi: {positionY: -300}}, {pixi: {positionY: 0}, duration: 0.75, ease: "sine.out", paused: true});

        this.addChild(backgroundSprite, winMessageSprite, this._winAmountText, this._playButton, this._setBetButton);
    }

    async show(): Promise<void> {
        this.visible = true;
        await this._showTween.restart();
        return Promise.resolve();
    }

    setWinAmount(amountWon: number): void {
        this._winAmountText.text = `$${amountWon}`
    }

    private _onPlayButtonPressed(): void {
        this.visible = false;
        this._game.onPlayButtonPressed();
    }

    private _onSetBetButtonPressed(): void {
        this.visible = false;
        this._game.onChangeBetButtonPressed();
    }
}

export default WinningsPanel;