import { Container, Sprite, Texture } from 'pixi.js';

type barSettings = {
    maxWidth: number,
    height: number
}

class Bar extends Container {
    private readonly _bar: Sprite = null;
    private _progress: number;

    private _settings: barSettings = null;

    set progress(progress: number) {
        this._progress = progress;
        this._updateBar();
    }

    constructor(constructor: barSettings) {
        super();
        this._settings = constructor;

        this._bar = Sprite.from(Texture.WHITE);
        this.addChild(this._bar);

        this._bar.width = this._settings.maxWidth;
        this._bar.height = constructor.height;
    }

    private _updateBar(): void {
        const clamp = Math.min(Math.max(this._progress, 0), 1);
        this._bar.width = clamp * this._settings.maxWidth;
    }
}

export default Bar;