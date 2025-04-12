import LedStrip from "../classes/LedStrip.js";
import IntColor from "../classes/color/IntColor.js";
import Colors from "../classes/color/Colors.js";
import TimeUtils from "../classes/utils/TimeUtils.js";
import HSVColor from "../classes/color/HSVColor.js";

const LED_COUNT = 64;
let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();
await ledStrip.setSameColor(new IntColor(0, 20, 0));
await TimeUtils.sleep(100);
await ledStrip.setLedColor(3, new IntColor(255, 0, 0));
await TimeUtils.sleep(100);
await ledStrip.setLedColor(4, new HSVColor(90, 200, 30));
await TimeUtils.sleep(100);
await ledStrip.setLedColor(5, Colors.BLUE);
await TimeUtils.sleep(100);
await ledStrip.setLedColor(5, Colors.randomRGBColor());
await ledStrip.stop();