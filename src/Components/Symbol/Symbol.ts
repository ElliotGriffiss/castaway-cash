import {Container, AnimatedSprite, BitmapText, Sprite, Rectangle, Graphics} from 'pixi.js';
import gsap from 'gsap';
import {Howl} from 'howler';

class Symbol extends Container {
    private readonly _textContainer: Container = null;
    private readonly _winText: BitmapText;
    private readonly _loseText: BitmapText;
    private readonly _textTween: gsap.core.Tween = null;

    private readonly _chestAnimation: AnimatedSprite = null;
    private readonly _chestGlow: Sprite = null;
    private readonly _chestGlowTween: gsap.core.Tween = null

    private readonly _chestOpenSound: Howl = null;

    private _isOpenable: boolean = false;
    private _isWin: boolean = false;
    private _resolve: () => void = null;

    constructor( x: number, y: number, angle: number ) {
        super();
        this.x = x;
        this.y = y;
        this.angle = angle;

        this._winText = new BitmapText('$500.00', {
            fontName: 'skranji-yellow-export',
            fontSize: 30,
            align: 'center',
            maxWidth: 120
        });
        this._winText.anchor.x = 0.5;
        this._winText.visible = false;

        this._loseText = new BitmapText('$500.00', {
            fontName: 'skranji-white-export',
            fontSize: 30,
            align: 'center',
            maxWidth: 120
        });
        this._loseText.anchor.x = 0.5;
        this._loseText.visible = false;

        this._textContainer = new Container();
        this._textContainer.x = 98;
        this._textContainer.y = 40;
        this._textContainer.addChild(this._loseText, this._winText);
        this._textTween = gsap.fromTo(this._textContainer, {pixi: {positionY: 100, scale: 0}},{pixi: {positionY: 40, scale: 1}, duration: 0.25, ease: "sine.in", paused: true})

        this._chestGlow = Sprite.from(global.game.chest.textures['chestGlow.png']);
        this._chestGlow.x = 95;
        this._chestGlow.y = 140;
        this._chestGlow.anchor.x = 0.5;
        this._chestGlow.anchor.y = 1;
        this._chestGlow.visible = false;
        this._chestGlowTween = gsap.fromTo(this._chestGlow, {pixi: {alpha: 0, scaleY: 0 }}, {pixi: {alpha: 1, scaleY: 1 }, duration: 0.35, ease: "sine.in", paused: true})

        this._chestAnimation = new AnimatedSprite(
            global.game.chest.animations.chest_open
        );
        this._chestAnimation.loop = false;
        this._chestAnimation.onComplete = () => {this.revealComplete();}

        this.hitArea = new Rectangle(20, 65, 160, 135);
        this.eventMode = 'static';
        this.cursor = 'Pointer';
        this.on("pointerup", this.revealSymbol, this);

        this._chestOpenSound = global.game.SND_Chest_Open;

        this.addChild(this._chestAnimation, this._textContainer, this._chestGlow)
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

    async revealSymbol(): Promise<void> {
        if (this._isOpenable) {
            this._isOpenable = false;

            this._chestAnimation.play();
            this._chestOpenSound.play();

            await new Promise(resolve => setTimeout(resolve, 200));

            this._winText.visible = this._isWin;
            this._loseText.visible = !this._isWin;
            await this._textTween.restart();

            if (this._isWin) {
                this._chestGlow.visible = true;
                this._chestGlowTween.restart();
            }
        }
    }

    async revealComplete(): Promise<void> {
        this._resolve();
    }
}

export default Symbol;