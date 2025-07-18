import { getVarint, makeVarint } from './src/helper';

const testNumbers = [
    42, // 1 byte
    10000, // 2 bytes
    1000000000, // 4 bytes
    1000000000000000000n // 8 bytes
];

testNumbers.forEach((num, idx) => {
    const encoded = makeVarint(num);
    console.log(`\nTest ${idx + 1}: Number = ${num}`);
    console.log('  Encoded Buffer:', encoded);
    const decoded = getVarint(encoded, 0);
    console.log('  Decoded value:', decoded.value);
    console.log('  Varint length:', decoded.len);
});
