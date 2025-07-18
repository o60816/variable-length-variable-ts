
# variable-length-variable-ts

A TypeScript library for encoding and decoding QUIC variable-length integers.

## Features
- Encode numbers into QUIC-style variable-length buffers
- Decode buffers back to numbers
- Supports 1, 2, 4 and 8-byte varints

## Usage

### Installation
Clone the repository and install dependencies:

```bash
npm install
```

### API

#### `makeVarint(num: number | bigint): Buffer`
Encodes a number into a variable-length buffer.

#### `getVarint(buffer: Buffer, index: number): { len: number; value: number | bigint }`
Decodes a variable-length integer from a buffer at the given index.

### Example
See `demo.ts` for usage:

```typescript
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
```

## Project Structure
- `helper.ts`: Main library functions
- `demo.ts`: Example usage
- `tsconfig.json`: TypeScript configuration
- `package.json`: Project metadata

## Run Demo

```bash
npm run start
```

## License
MIT
