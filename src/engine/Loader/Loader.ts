import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import * as PIXI from "pixi.js";
import AssetsManifest from "../../AssetManifest.json";
import FontFaceObserver from "fontfaceobserver";

class Loader {
    private _loadingScreen: LoadingScreen = null;

    async _preload(): Promise<void> {
        await PIXI.Assets.init({manifest: AssetsManifest});
        global.preload = await PIXI.Assets.loadBundle("preload");

    }

    createLoadingScreen(): void {
        this._loadingScreen = new LoadingScreen();
        global.app.stage.addChild(this._loadingScreen);
    }

    async load(): Promise<void> {
        await Promise.all( [
            global.game = await PIXI.Assets.loadBundle("game"),
            ...( AssetsManifest.bundles[0].assets.map(async ({name})=> {
                const font = new FontFaceObserver(name);
                return font.load();
            }) )
        ]);
    }

    destroyLoadingScreen(): void {
        this._loadingScreen.destroy();
    }
}


export default Loader;