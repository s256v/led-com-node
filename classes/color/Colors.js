import IntColor from "./IntColor.js";

export default class Colors {
    static RED = new IntColor(255, 0, 0);
    static GREEN = new IntColor(0, 255, 0);
    static BLUE = new IntColor(0, 0, 255);
    static BLACK = new IntColor(0, 0, 0);
    static WHITE = new IntColor(255, 255, 255);

    static randomRGBColor(maxR = 255, maxG = 255, maxB = 255) {
        return new IntColor(
            Math.ceil(Math.random() * maxR),
            Math.ceil(Math.random() * maxG),
            Math.ceil(Math.random() * maxB));
    }
}