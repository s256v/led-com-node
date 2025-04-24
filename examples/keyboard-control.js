import readline from 'node:readline/promises';


import LedStrip from "../classes/LedStrip.js";
import HSVColor from "../classes/color/HSVColor.js";
import Colors from "../classes/color/Colors.js";

const LED_COUNT = 99;
let ledStrip = new LedStrip(LED_COUNT, "COM5");
await ledStrip.start();

let hue = 0;
let v = 10;

let arr = new Array(LED_COUNT);
arr.fill(new HSVColor(hue, 100, v), 0, LED_COUNT);
arr.fill(Colors.BLACK, LED_COUNT-16, LED_COUNT);
await ledStrip.setAll(arr);

async function inc(char) {
    switch (char) {
        case "a":
            hue--;
            break;
        case "d":
            hue++;
            break;
        case "w":
            v++;
            break;
        case "s":
            v--;
            break;
        case "q":
            process.exit(0);
            break;
    }

    if (v > 100) {
        v = 0;
    }
    if (v < 0) {
        v = 100;
    }

    if (hue >= 360) {
        hue = 0;
    }

    if (hue < 0) {
        hue = 359;
    }
    console.log({hue, v});
    let mainColor = new HSVColor(hue, 100, v);
    arr.fill(mainColor, 0, LED_COUNT - 16);
    await ledStrip.setAll(arr);
}


const listenKeyPresses = (callback = (key, data) => console.log({key, data})) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.input.on("keypress", callback);
    return rl;
};

let example = () => {
    listenKeyPresses(async (key, data) => {
        try {
            const isLetter =
                key.toLowerCase().charCodeAt() >= "a".charCodeAt() &&
                key.toLowerCase().charCodeAt() <= "z".charCodeAt();
            await inc(data.sequence);
        } catch (e) {
            console.log(e)
        }
        //console.log({sq: data.sequence});
    });
};

console.log("Control color and brightness with WASD. Q - to quit.")
example();
