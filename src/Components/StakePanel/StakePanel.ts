import {Container, Sprite, BitmapText} from "pixi.js";

import Game from "../../Game";
import Button from "../../engine/Button/Button"

class StakePanel extends Container{
    private _game: Game = null;
    private _stakeText: BitmapText = null;
    private _increaseStakeButton: Button = null;
    private _decreaseStakeButton: Button = null;


    private readonly _stakes: number[] = null;
    private _currentStakeIndex: number = 0;

    constructor(game: Game, stakes: number[]) {
        super();

        this._game = game;
        this._stakes = stakes;

        const panelBackgroundTop = Sprite.from(global.game.ui.textures['panelVS1.png']);
        panelBackgroundTop.y = -300;

        const chooseBet = Sprite.from(global.game.language.textures['chooseBet.psd']);
        chooseBet.y = 65;

        const panelBackgroundMid = Sprite.from(global.game.ui.textures['panelVS2.png']);
        panelBackgroundMid.y = 195;

        this._stakeText = new BitmapText(`$${this._stakes[this._currentStakeIndex]}`, {
            fontName: 'worksans-orange-export',
            fontSize: 60,
            align: 'center',
        });
        this._stakeText.x = 120;
        this._stakeText.y = 220;

        this._increaseStakeButton = new Button(()=> {this._increaseStake()}, {
            active: global.game.ui.textures['plus.png'],
            pressed: global.game.ui.textures['plusHighlight.png'],
            inactive: global.game.ui.textures['plusShadow.png']
        });
        this._increaseStakeButton.x = 215
        this._increaseStakeButton.y = 290;

        this._decreaseStakeButton = new Button(()=> {this._decreaseStake()}, {
            active: global.game.ui.textures['minus.png'],
            pressed: global.game.ui.textures['minusHighlight.png'],
            inactive: global.game.ui.textures['minusShadow.png']
        });
        this._decreaseStakeButton.x = 25;
        this._decreaseStakeButton.y = 325;

        const panelBackgroundBottom = Sprite.from(global.game.ui.textures['panelVS3.png']);
        panelBackgroundBottom.y = 420;

        this.addChild(
            panelBackgroundTop,
            panelBackgroundMid,
            panelBackgroundBottom,
            chooseBet,
            this._stakeText,
            this._increaseStakeButton,
            this._decreaseStakeButton
        );
    }

    private _increaseStake(): void {
        this._currentStakeIndex++;

        if (this._currentStakeIndex > this._stakes.length-1) {
            this._currentStakeIndex = this._stakes.length-1;
        }

        this._stakeText.text = (`$${this._stakes[this._currentStakeIndex]}`);
        this._game.updateStake(this._stakes[this._currentStakeIndex]);
    }

    private _decreaseStake(): void {
        this._currentStakeIndex--;

        if (this._currentStakeIndex < 0) {
            this._currentStakeIndex = 0;
        }

        this._stakeText.text = (`$${this._stakes[this._currentStakeIndex]}`)
        this._game.updateStake(this._stakes[this._currentStakeIndex]);
    }

    private _onPlayButtonPressed(): void {
        this.visible = false;
    }
}

export default StakePanel;