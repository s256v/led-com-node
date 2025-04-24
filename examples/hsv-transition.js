import LedStrip from "../classes/LedStrip.js";
import Colors from "../classes/color/Colors.js";
import TimeUtils from "../classes/utils/TimeUtils.js";
import HSVColor from "../classes/color/HSVColor.js";

const LED_COUNT = 99;
const MAIN_LED_COUNT = LED_COUNT - 16;

let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();
console.log("Started");
let colors = new Array(LED_COUNT);
colors.fill(Colors.BLACK, 0, LED_COUNT);

let hueOffset = 0;
while (true) {
    hueOffset++;
    if (hueOffset >= 360) {
        hueOffset = 0;
    }

    for (let i = 0; i < MAIN_LED_COUNT; i++) {
        let hue = Math.round(i * 360 / MAIN_LED_COUNT);
        let newH = hue + hueOffset;
        if (newH >= 360) {
            newH = newH - 360;
        }
        colors[i] = new HSVColor(newH, 100, 50);
    }
    await ledStrip.setAll(colors);
    await TimeUtils.sleep(5);
}

