import { Container, Sprite } from 'pixi.js';
import gsap from 'gsap';

class Foreground extends Container {
    constructor() {
        super();

        const bushesL = Sprite.from(global.game.backgroundElements.textures['bushesL.png']);
        bushesL.x = 306;
        bushesL.y = 970;
        bushesL.anchor.x = 1;
        bushesL.anchor.y = 1;
        bushesL.scale.x = 1.5;
        bushesL.scale.y = 1.5;
        gsap.fromTo(bushesL, {pixi: {skewX: -1 }}, {pixi: {skewX: 1 }, repeat: -1, duration: 3, ease: "sine.inOut", yoyo: true});

        const bushesR = Sprite.from(global.game.backgroundElements.textures['bushesR.png']);
        bushesR.x = 1613.5;
        bushesR.y = 1023;
        bushesR.anchor.x = 1;
        bushesR.anchor.y = 1;
        bushesR.scale.x = 1.5;
        bushesR.scale.y = 1.5;
        gsap.fromTo(bushesR, {pixi: {skewX: -1 }}, {pixi: {skewX: 1 }, repeat: -1, duration: 3, ease: "sine.inOut", yoyo: true});

        const parmL = Sprite.from(global.game.backgroundElements.textures['palmL.png']);
        parmL.x = -580;
        parmL.y = -294;
        gsap.fromTo(parmL, {pixi: {skewX: -1 }}, {pixi: {skewX: 1 }, repeat: -1, duration: 3, ease: "sine.inOut", yoyo: true});

        const parmR = Sprite.from(global.game.backgroundElements.textures['palmR.png']);
        parmR.x = 946;
        parmR.y = -430;
        gsap.fromTo(parmR, {pixi: {skewX: -1 }}, {pixi: {skewX: 1 }, repeat: -1, duration: 3, ease: "sine.inOut", yoyo: true});

        const logo = Sprite.from(global.game.logo);
        logo.x = 684.5;
        logo.y = -170;
        logo.anchor.x = 0.5;

        this.addChild(bushesL, bushesR, parmL, parmR, logo);
    }

}

export default Foreground;