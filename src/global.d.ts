import {Application} from "pixi.js";

declare global {
    var app: Application;
    var __PIXI_APP__: app;
    var preload: any;
    var game: any;
}