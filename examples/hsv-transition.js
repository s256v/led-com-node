import LedStrip from "../classes/LedStrip.js";
import Colors from "../classes/color/Colors.js";
import TimeUtils from "../classes/utils/TimeUtils.js";
import HSVColor from "../classes/color/HSVColor.js";

const LED_COUNT = 64;

let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();
console.log("Started");
let colors = [];

for (let i = 0; i < LED_COUNT; i++) {
    colors.push(Colors.BLACK);
}

let hueOffset = 0;
while (true) {
    hueOffset++;
    if (hueOffset >= 360) {
        hueOffset = 0;
    }

    for (let i = 0; i < LED_COUNT; i++) {
        let hue = Math.round(i * 360 / LED_COUNT);
        let newH = hue + hueOffset;
        if (newH >= 360) {
            newH = newH - 360;
        }
        colors[i] = new HSVColor(newH, 100, 7);
    }
    await ledStrip.setAll(colors);
    await TimeUtils.sleep(5);
}

