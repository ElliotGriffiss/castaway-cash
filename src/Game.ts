import * as PIXI from 'pixi.js'

import Button from "./engine/Button/Button";
import Animation from "./engine/Animation/Animation";

import Background from "./Components/Background/Background";
import Foreground from "./Components/Foreground/Foreground";
import StakePanel from "./Components/StakePanel/StakePanel";
import MainMenu from "./Components/MainMenu/MainMenu";

import settings from './app.json';

export class Game {
    private _stake: number = 1;
    private _stakePanel: StakePanel = null;
    private _mainMenu: MainMenu = null;

    constructor() {
        const background = new Background();
        const foreground = new Foreground();

        this._stakePanel = new StakePanel(this, settings.stakes);
        this._mainMenu = new MainMenu();

        global.app.stage.addChild(
            background,
            foreground,
            this._stakePanel,
            this._mainMenu
        );
    }

    updateStake(currentStake: number): void {
        this._stake = currentStake;
    }

    playGame(): Promise<void> {
        // deduct credit;
        // hide control panel;
        // close all chests

        // const data = generateResults();

        // symbolManager.updateSymbols(data);

        // wait for reveal

        // display win panel


        return Promise.resolve()
    }
}

export default Game;