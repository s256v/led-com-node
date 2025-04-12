import LedStrip from "../classes/LedStrip.js";
import Colors from "../classes/color/Colors.js";
import TimeUtils from "../classes/utils/TimeUtils.js";

const LED_COUNT = 64;

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

let arr = [arr0, arr1];
let k = 0;
//await ledStrip.setSameColor(Colors.RED);
while (true) {
    for (let i = 0; i < 10; i++) {
        k = 1 - k;
        await ledStrip.setAll(arr[k]);
        await TimeUtils.sleep(10)
    }
    await ledStrip.setSameColor(Colors.BLACK)
    await TimeUtils.sleep(500)
}
