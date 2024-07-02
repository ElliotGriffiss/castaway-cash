import {Container, Sprite} from "pixi.js";
import gsap from 'gsap';

class WaterRipple extends Container {
    constructor() {
        super();

        const waterRipple = Sprite.from(global.game.chest.textures['waterRipple.png']);
        waterRipple.x = 682;
        waterRipple.y = 620;
        waterRipple.anchor.x = 0.5;
        waterRipple.anchor.y = 0.5;

        gsap.fromTo(waterRipple, {pixi: {scale: 2 }}, {pixi: {scale: 1, alpha: 1}, repeat: -1, duration: 3, ease: "power1.out"});
        gsap.fromTo(waterRipple, {pixi: {alpha: 0 }}, {pixi: { alpha: 1},  repeat: -1, duration: 1.5, ease: "power1.out", yoyo: true});

        this.addChild(waterRipple);
    }
}

export default WaterRipple;