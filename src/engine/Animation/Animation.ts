import {Container, Ticker, Sprite} from 'pixi.js';

type AnimationSettings = {
    prefix: string,
    suffix: string,
    endingFrame: number,
    loop: boolean,
    speedModifier: number
}

class Animation extends Container {
    private _ticker: Ticker = null;
    private readonly _target: Sprite = null;

    private _settings: AnimationSettings = null;

    private _resolve: () => void = null;
    private _currentTime: number;
    private _playing: boolean = false;

    constructor(constructor: AnimationSettings) {
        super();
        this._ticker = Ticker.shared;
        this._settings = constructor;

        const startingFrame =  (`${constructor.prefix}0${constructor.suffix}`);
        console.log(global.game);
        console.log(startingFrame);
        this._target = new Sprite(global.game[startingFrame]);

        this.addChild(this._target);
    }

    async play(): Promise<void> {
        if (!this._playing) {
            this._playing = true;
            this._currentTime = 0;
            this._ticker.add(this._update, this);
            return new Promise((resolve) => {
               this._resolve = resolve;
            });
        }
    }

    stop(): void {
        if (this._playing) {
            this._playing = false;
            this._ticker.remove(this._update, this);
            this._resolve();
        }
    }

    private _update(deltaTime: number): void {
        const modifier = this._settings.speedModifier;
        const elapsed = modifier * deltaTime;
        this._currentTime += elapsed;

        const  floor = Math.floor(this._currentTime);
        const frameName =  (`${this._settings.prefix + floor + this._settings.suffix}`);

        if (floor > this._settings.endingFrame) {
            if (this._settings.loop) {
                this._currentTime = 0;
            } else {
                this.stop();
            }
        } else {
            if (this._target.texture !== global.game[frameName]) {
                this._target.texture = global.game[frameName];
            }
        }
    }
}

export default Animation;