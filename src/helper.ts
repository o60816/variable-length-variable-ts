function getVarint(buffer: Buffer, index: number): { len: number; value: number | bigint } {
    let len = 1 << (buffer[index] >> 6);
    let tempBuffer = buffer.slice(index, index + len);
    let byte = tempBuffer[0];
    tempBuffer[0] &= 0x3f;

    let value: number | bigint = 0;
    if (len === 8) {
        value = tempBuffer.readBigUInt64BE(0);
    } else {
        value = tempBuffer.readUIntBE(0, len);
    }

    tempBuffer[0] = byte;
    
    return {
        len: len,
        value: value
    }
}

function makeVarint(num: number | bigint): Buffer {
    let length = 1;
    let significantBits = 0x0;
    do {
        if (64 > num) {
            break;
        }

        if (16384 > num) {
            length = 2;
            significantBits = 0x40;
            break;
        }

        if (1073741824 > num) {
            length = 4;
            significantBits = 0x80;
            break;
        }

        if (4611686018427387904n > num) {
            length = 8;
            significantBits = 0xc0;
            break;
        }
    } while (0);

    let buffer = Buffer.alloc(length);
    if (length <= 6) {
        buffer.writeUIntBE(typeof num === 'bigint' ? Number(num) : num, 0, length);
    } else {
        buffer.writeBigUint64BE(typeof num === 'bigint' ? num : BigInt(num), 0);
    }
    buffer[0] |= significantBits;
    return buffer;
}

export { getVarint, makeVarint };