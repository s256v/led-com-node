import LedStrip from "../classes/LedStrip.js";
import Colors from "../classes/color/Colors.js";

const LED_COUNT = 99;
let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();
await ledStrip.setSameColor(Colors.WHITE);
await ledStrip.stop();