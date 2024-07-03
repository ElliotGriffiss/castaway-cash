import * as PIXI from 'pixi.js'

import SymbolManager from "./Components/SymbolManager/SymbolManager";
import Background from "./Components/Background/Background";
import Foreground from "./Components/Foreground/Foreground";
import StakePanel from "./Components/StakePanel/StakePanel";
import WinningsPanel from "./Components/WinningsPanel/WinningsPanel";
import RevealAllPanel from "./Components/RevealAllPanel/RevealAllPanel";
import revealAllPanel from "./Components/RevealAllPanel/RevealAllPanel";
import WinUpToPanel from "./Components/WinUpToPanel/WinUpToPanel";

import settings from './app.json';

export class Game {
    private _stake: number = 1;
    private _credit: number = 120;

    private readonly _stakePanel: StakePanel = null;
    private readonly _winningsPanel: WinningsPanel = null;
    private readonly _symbolManager: SymbolManager = null;
    private readonly _revealAllPanel: revealAllPanel = null;
    private readonly _winUpToPanel: WinUpToPanel = null;

    constructor() {
        const background = new Background();
        const foreground = new Foreground();

        this._stakePanel = new StakePanel(this, settings.stakes);
        this._winningsPanel = new WinningsPanel(this);
        this._symbolManager = new SymbolManager();
        this._revealAllPanel = new RevealAllPanel(this);

        const largestWinValue = Math.max(...settings.prizeTable);
        this._winUpToPanel = new WinUpToPanel(largestWinValue);

        global.app.stage.addChild(
            background,
            this._symbolManager,
            foreground,
            this._winUpToPanel,
            this._stakePanel,
            this._revealAllPanel,
            this._winningsPanel
        );

        void this._stakePanel.show();
    }

    updateStake(currentStake: number): void {
        this._stake = currentStake;
    }

    onChangeBetButtonPressed(): void {
        void this._stakePanel.show();
        this._winningsPanel.visible = false;
    }

    onPlayButtonPressed(): void {
        if (this._credit >= this._stake) {
            void this._playGame();
        } else {
            void this._stakePanel.show();
            console.log("not Enough Credit");
        }
    }

    onRevealAllSymbolsPressed(): void {
        this._symbolManager.revealAllSymbols();
    }

    async _playGame(): Promise<void> {
        // deduct credit;
        this._credit -= this._stake;
        console.log("Credit: "+ this._credit);

        this._winningsPanel.visible = false;

        // close all chests
        this._symbolManager.prepareAllSymbols();

        void this._revealAllPanel.show();

        const randomIndex = Math.floor(Math.random() * settings.scenarioData.length);
        const betResult = settings.scenarioData[randomIndex];

        const prizes = betResult.prizeIndexes.map((index)=> {
            return settings.prizeTable[index];
        })

        await this._symbolManager.updateSymbols(prizes, betResult.winningIndexes);
        let winTotal = 0;
        const countedWinValues: number[] = [];

        // works out how much the player has won.
        betResult.winningIndexes.map((value) => {
            if (!countedWinValues.includes(prizes[value])) {
                countedWinValues.push(prizes[value]);
            }
        });

        // Calculates the win total.
        countedWinValues.forEach((value)=> {
           winTotal+= value;
        });

        this._winningsPanel.setWinAmount(winTotal);
        console.log("You Won: "+ winTotal);

        this._credit+= winTotal;
        console.log("Credit: "+ this._credit);

        this._revealAllPanel.visible = false;
        await this._winningsPanel.show();

        return Promise.resolve()
    }
}

export default Game;