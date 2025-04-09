import Color from "./Color.js";

export default class IntColor extends Color {
    #rgb;

    constructor(r, g, b) {
        super();
        this.#rgb = {r, g, b};
    }

    getRgb() {
        return this.#rgb;
    }
}