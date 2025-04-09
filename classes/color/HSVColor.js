import Color from "./Color.js";
import hsvToRgb from '@fantasy-color/hsv-to-rgb'

/**
 * Color based on HSV model
 */
export default class HSVColor extends Color {
    #h;
    #s;
    #v;

    #r;
    #g;
    #b;

    /**
     * Create color based on HSV color model
     * @param h color 0 - 360
     * @param s saturation 0 - 100
     * @param v brightness 0 - 100
     */
    constructor(h, s, v) {
        super();
        this.#h = h;
        this.#s = s;
        this.#v = v;
        let {red: r, green: g, blue: b} = hsvToRgb.default({hue: h, saturation: s, value: v});
        this.#r = r;
        this.#g = g;
        this.#b = b;
    }

    getRgb() {
        return {r: this.#r, g: this.#g, b: this.#b};
    }

    toString() {
        return `HSVColor{h=${this.#h} s=${this.#s} r=${this.#v} -> g=${this.#r} r=${this.#g} b=${this.#b}}`
    }
}