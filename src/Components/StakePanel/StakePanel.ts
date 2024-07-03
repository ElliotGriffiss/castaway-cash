import {Container, Sprite, BitmapText} from "pixi.js";
import gsap from 'gsap';
import {Howl} from 'howler';

import Game from "../../Game";
import Button from "../../engine/Button/Button"

class StakePanel extends Container{
    private _game: Game = null;
    private readonly _stakeText: BitmapText = null;
    private readonly _increaseStakeButton: Button = null;
    private readonly _decreaseStakeButton: Button = null;
    private readonly _playButton: Button = null;

    private readonly _showTween: gsap.core.Tween = null;
    private readonly _buttonClick: Howl = null;

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
        this._stakeText.anchor.x = 0.5;
        this._stakeText.x = 175;
        this._stakeText.y = 220;

        this._increaseStakeButton = new Button(()=> {this._increaseStake()}, {
            hideActive: true,
            active: {
                texture: global.game.ui.textures['plus.png'],
            },
            pressed: {
                texture: global.game.ui.textures['plusHighlight.png'],
                x: 5,
                y: 5
            },
            inactive: {
                texture: global.game.ui.textures['plusShadow.png'],
                x: 5,
                y: 5
            }
        });
        this._increaseStakeButton.x = 215
        this._increaseStakeButton.y = 290;

        this._decreaseStakeButton = new Button(()=> {this._decreaseStake()}, {
            hideActive: true,
            active: {
                texture: global.game.ui.textures['minus.png'],
            },
            pressed: {
                texture: global.game.ui.textures['minusHighlight.png'],
                x: 5,
                y: 5
            },
            inactive: {
                texture: global.game.ui.textures['minusShadow.png'],
                x: 5,
                y: 5
            }
        });
        this._decreaseStakeButton.x = 25;
        this._decreaseStakeButton.y = 325;

        const panelBackgroundBottom = Sprite.from(global.game.ui.textures['panelVS3.png']);
        panelBackgroundBottom.y = 420;

        this._playButton = new Button(()=> {this._onPlayButtonPressed()}, {
            hideActive: true,
            buttonText: "PLAY",
            textStyle: {
                fontName: 'skranji-white-interface-export',
                fontSize: 46,
                align: 'center',
            },
            active: {texture: global.game.ui.textures['buttonBackground.png']},
            pressed: {texture: global.game.ui.textures['buttonLighten.png']},
            inactive: {texture: global.game.ui.textures['buttonDarken.png']}
        });
        this._playButton.x = 60;
        this._playButton.y = 455;

        this._showTween = gsap.fromTo(this, {pixi: {positionX: -360}}, {pixi: {positionX: 0}, duration: 0.75, ease: "sine.out", paused: true});
        this._buttonClick = global.game.SND_Click;

        this.addChild(
            panelBackgroundTop,
            panelBackgroundMid,
            panelBackgroundBottom,
            chooseBet,
            this._stakeText,
            this._increaseStakeButton,
            this._decreaseStakeButton,
            this._playButton
        );
    }

    async show(): Promise<void> {
        this.visible = true;
        await this._showTween.restart();
        return Promise.resolve();
    }

    private _increaseStake(): void {
        this._currentStakeIndex++;

        if (this._currentStakeIndex > this._stakes.length-1) {
            this._currentStakeIndex = this._stakes.length-1;
        }

        this._buttonClick.play();
        this._stakeText.text = (`$${this._stakes[this._currentStakeIndex]}`);
        this._game.updateStake(this._stakes[this._currentStakeIndex]);
    }

    private _decreaseStake(): void {
        this._currentStakeIndex--;

        if (this._currentStakeIndex < 0) {
            this._currentStakeIndex = 0;
        }

        this._buttonClick.play();
        this._stakeText.text = (`$${this._stakes[this._currentStakeIndex]}`)
        this._game.updateStake(this._stakes[this._currentStakeIndex]);
    }

    private _onPlayButtonPressed(): void {
        this._buttonClick.play();
        this.visible = false;
        this._game.onPlayButtonPressed();
    }
}

export default StakePanel;