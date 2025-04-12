import {SerialPort, ReadlineParser} from 'serialport';
import {Buffer} from 'node:buffer';

export default class LedStrip {
    #serialPort;
    #started = false;
    #ledCount;
    #buffer;
    #AT_RGB = "AT+RGB=";
    #AT_LN = "AT+LN=";
    #AT_RGB_OFFSET = this.#AT_RGB.length;

    constructor(letCount, port, baudRate = 115200) {
        this.#ledCount = letCount;
        this.#buffer = Buffer.alloc(this.#ledCount * 3 + this.#AT_RGB.length, 0);
        for (let i = 0; i < this.#AT_RGB.length; i++) {
            this.#buffer[i] = this.#AT_RGB.charCodeAt(i);
        }

        this.#serialPort = new SerialPort({
            path: port, baudRate: baudRate, autoOpen: false,
        })
    }

    async start() {
        await this.#openPort();
        const parser = new ReadlineParser({
            delimiter: '\r\n',
        })

        parser.on('data', (data) => {
            //console.log({"read": data})
        });
        this.#serialPort.pipe(parser);

        await this.#sendLedCount();
        await this.#refresh();
    }

    async stop() {
        await this.#serialPort.close();
    }

    async setAll(colors) {
        if (colors.length !== this.#ledCount) {
            throw new Error(`Incorrect Array length ${colors.length} != ${this.#ledCount}`);
        }
        for (let i = 0; i < this.#ledCount; i++) {
            this.#setBufferColor(i, colors[i].getRgb());
        }
        await this.#refresh();
    }

    async setLedColor(index, color) {
        if (index >= this.#ledCount) {
            throw new Error(`Led index out of bound ${index} >= ${this.#ledCount}`);
        }
        let rgb = color.getRgb();
        this.#setBufferColor(index, rgb);
        await this.#refresh();
    }

    async setSameColor(color) {
        let rgb = color.getRgb();
        for (let i = 0; i < this.#ledCount; i++) {
            this.#setBufferColor(i, rgb);
        }
        await this.#refresh();
    }

    async #sendLedCount(){
        await this.#writeString(this.#AT_LN);

        const buffer = new ArrayBuffer(2);
        let dataView = new DataView(buffer);
        dataView.setUint16(0, this.#ledCount, true);

        await this.#write(dataView);
    }

    #setBufferColor(index, rgb) {
        this.#buffer[this.#AT_RGB_OFFSET + index * 3] = rgb.g;
        this.#buffer[this.#AT_RGB_OFFSET + index * 3 + 1] = rgb.r;
        this.#buffer[this.#AT_RGB_OFFSET + index * 3 + 2] = rgb.b;
    }

    #openPort() {
        return new Promise((resolve, reject) => {
            this.#serialPort.open(function (err) {
                if (err) {
                    reject('Error opening port: ' + err.message);
                }
            });
            let _this = this;
            this.#serialPort.on('open', function () {
                _this.#started = true;
                resolve("Port opened");
            })
        })
    }

    async #writeString(str) {
        let buff = Buffer.alloc(str.length, 0);
        for (let i = 0; i < str.length; i++) {
            buff[i] = str.charCodeAt(i);
        }
        await this.#write(buff);
    }

    #write(data) {
        return new Promise((resolve, reject) => {
            this.#serialPort.write(data, function (err, result) {
                if (err) {
                    reject('Error while sending message : ' + err);
                    return;
                }
                resolve(result);
            });
        });
    }

    async #refresh() {
        if (!this.#started) {
            throw new Error("Not started. Call start() first.");

        }
        await this.#write(this.#buffer);
    }
}