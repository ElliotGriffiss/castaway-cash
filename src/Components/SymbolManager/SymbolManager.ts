import { Container } from 'pixi.js';
import Symbol from '../Symbol/Symbol';
import settings from './SymbolManagerSettings.json';

class SymbolManager extends Container {
    private _symbols: Symbol[];

    constructor() {
        super();

        this._symbols = settings.symbolPositions.map(({x, y, angle}) => {
            const symbol = new Symbol(x, y, angle)
            this.addChild(symbol);
            return symbol;
        })
    }

    prepareAllSymbols(): void {
        this._symbols.forEach((symbol) => {
            symbol.prepareSymbol();
        })
    }

    revealAllSymbols(): void {
        this._symbols.map((symbol) => {
            return symbol.revealSymbol();
        });
    }

    async updateSymbols(values: number[], winningIndexes: number[]): Promise<void> {
        await Promise.all( this._symbols.map((symbol, index) => {
            return symbol.setupSymbol(values[index], winningIndexes.includes(index));
        }));
    }
}

export default SymbolManager;