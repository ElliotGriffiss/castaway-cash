import {Container, Sprite, Texture, BitmapText, IBitmapTextStyle} from 'pixi.js';

type SpriteSettings = {
    texture?: Texture;
    x?: number;
    y?: number;
}

type buttonSettings = {
    hideActive?: boolean;
    textStyle?: IBitmapTextStyle,
    active?: SpriteSettings;
    pressed?: SpriteSettings;
    inactive?: SpriteSettings;
}

class Button extends Container {
    private _isActive: boolean = true;

    private readonly _activeSprite: Sprite;
    private readonly _pressedSprite : Sprite;
    private readonly _inactiveSprite: Sprite;

    private readonly _buttonPayload: () => void;
    private readonly _buttonSettings: buttonSettings = null;

    constructor(buttonPayload:() => void, constructor: buttonSettings) {
        super();
        this._buttonPayload = buttonPayload;
        this._buttonSettings = constructor;

        this.x = 292;
        this.y = 254;

        this._activeSprite = Sprite.from(constructor.active.texture);
        this._activeSprite.x = constructor.active.x ?? 0;
        this._activeSprite.y = constructor.active.y ?? 0;

        this._pressedSprite = Sprite.from(constructor.pressed.texture);
        this._pressedSprite.x = constructor.pressed.x ?? 0;
        this._pressedSprite.y = constructor.pressed.y ?? 0;

        this._inactiveSprite = Sprite.from(constructor.inactive.texture);
        this._inactiveSprite.x = constructor.inactive.x ?? 0;
        this._inactiveSprite.y = constructor.inactive.y ?? 0;

        this.eventMode = 'static';
        this.cursor = 'Pointer';

        this._pressedSprite.visible = false;
        this._inactiveSprite.visible = false;

        this.addChild(this._activeSprite, this._pressedSprite, this._inactiveSprite);

        this.on("pointerup", this._onButtonReleased, this);
        this.on("pointerdown", this._onButtonPressed, this);
        this.on("pointerout", this._cancel, this);
    }

    set isActive(active: boolean) {
        this._isActive = active;

        if (!this._buttonSettings.hideActive) {
            this._activeSprite.visible = active;
        }

        this._inactiveSprite.visible = !active;

        (this._isActive) ? this.cursor = 'Pointer' : this.cursor = 'default';
    }

    private _onButtonReleased(): void {
        if (this._isActive) {
            this._activeSprite.visible = true;
            this._pressedSprite.visible = false;
            this._buttonPayload();
        }
    }

    private _onButtonPressed(): void {
        if (this._isActive) {
            if (!this._buttonSettings.hideActive) {
                this._activeSprite.visible = false;
            }

            this._pressedSprite.visible = true;
        }
    }

    private _cancel(): void {
        if (this._isActive) {
            this._activeSprite.visible = true;
            this._pressedSprite.visible = false;
        }
    }
}

export default Button;