import LedStrip from "../classes/LedStrip.js";
import Colors from "../classes/color/Colors.js";
import TimeUtils from "../classes/utils/TimeUtils.js";

const LED_COUNT = 99;

let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();

let arr0 = [];
let arr1 = [];

for (let i = 0; i < LED_COUNT; i++) {
    if (i < LED_COUNT / 2) {
        arr0.push(Colors.BLUE)
        arr1.push(Colors.BLACK)
    } else {
        arr0.push(Colors.BLACK)
        arr1.push(Colors.RED)
    }
}
arr0.fill(Colors.BLUE, LED_COUNT - 8, LED_COUNT);
arr1.fill(Colors.BLACK, LED_COUNT - 8, LED_COUNT);

let arr = [arr0, arr1];
let k = 0;

while (true) {
    for (let m = 0; m < 2; m++) {
        k = 1 - k;
        await ledStrip.setSameColor(Colors.BLACK)
        for (let i = 0; i < 15; i++) {
            await ledStrip.setAll(arr[k]);
            await TimeUtils.sleep(30);
            await ledStrip.setSameColor(Colors.BLACK);
            await TimeUtils.sleep(5);
        }
        await ledStrip.setSameColor(Colors.BLACK)
    }
    await TimeUtils.sleep(300);

}
await ledStrip.stop();

