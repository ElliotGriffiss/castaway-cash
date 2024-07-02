import { Container, Sprite, BitmapText } from 'pixi.js';
import Button from "../../engine/Button/Button";
import Game from "../../Game";

class WinningsPanel extends Container {
    private readonly _winAmountText: BitmapText = null;
    private readonly _playButton: Button = null;
    private readonly _setBetButton: Button = null;

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
            active: global.game.language.textures['playButton.psd'],
            pressed: global.game.language.textures['playButton.psd'],
            inactive: global.game.language.textures['playButton.psd']
        });
        this._playButton.x = 420;
        this._playButton.y = 190;

        this._setBetButton = new Button(()=> {this._onSetBetButtonPressed()}, {
            active: global.game.language.textures['changeBetButton.psd'],
            pressed: global.game.language.textures['changeBetButton.psd'],
            inactive: global.game.language.textures['changeBetButton.psd']
        });
        this._setBetButton.x = 690;
        this._setBetButton.y = 190;

        this.addChild(backgroundSprite, winMessageSprite, this._winAmountText, this._playButton, this._setBetButton);
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