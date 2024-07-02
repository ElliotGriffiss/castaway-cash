import {Container, AnimatedSprite, BitmapText, Sprite} from 'pixi.js';

class Symbol extends Container {
    private readonly _winText: BitmapText;
    private readonly _loseText: BitmapText;
    private readonly _chestGlow: Sprite = null;
    private readonly _chestAnimation: AnimatedSprite = null;

    private _isOpenable: boolean = false;
    private _isWin: boolean = false;
    private _resolve: () => void = null;

    constructor( x: number, y: number, rotation: number ) {
        super();
        this.x = x;
        this.y = y;
        this.rotation = rotation;

        this._winText = new BitmapText('$500.00', {
            fontName: 'skranji-yellow-export',
            fontSize: 21,
            align: 'center',
            maxWidth: 120
        });
        this._winText.x = 98;
        this._winText.y = 40;
        this._winText.anchor.x = 0.5;
        this._winText.visible = false;

        this._loseText = new BitmapText('$500.00', {
            fontName: 'skranji-white-export',
            fontSize: 21,
            align: 'center',
            maxWidth: 120
        });
        this._loseText.x = 98;
        this._loseText.y = 40;
        this._loseText.anchor.x = 0.5;
        this._loseText.visible = false;

        this._chestGlow = Sprite.from(global.game.chest.textures['chestGlow.png']);
        this._chestGlow.y = 16;
        this._chestGlow.visible = false;

        this._chestAnimation = new AnimatedSprite(
            global.game.chest.animations.chest_open
        );
        this._chestAnimation.loop = false;
        this._chestAnimation.onComplete = () => {this.revealComplete();}

        this.eventMode = 'static';
        this.cursor = 'Pointer';
        this.on("pointerup", this.revealSymbol, this);

        this.addChild(this._chestAnimation, this._winText, this._loseText, this._chestGlow)
    }

    prepareSymbol(): void {
        this._chestAnimation.gotoAndStop(0);

        this._chestGlow.visible = false;
        this._winText.visible = false;
        this._loseText.visible = false;

        this._isOpenable = true;
    }

    async setupSymbol(newText: number, isWin: boolean): Promise<void> {
        this._isWin = isWin;

        this._winText.text = (`$${newText}`);
        this._loseText.text = (`$${newText}`);

        return new Promise((resolve) => {
            this._resolve = resolve;
        });
    }

    revealSymbol(): void {
        if (this._isOpenable) {
            this._isOpenable = false;
            this._chestAnimation.play()
        }
    }

    private revealComplete(): void {
        this._resolve();

        this._chestGlow.visible = this._isWin;
        this._winText.visible = this._isWin;
        this._loseText.visible = !this._isWin;
    }
}

export default Symbol;