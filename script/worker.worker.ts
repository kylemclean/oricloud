// runs function with signature
// EMSCRIPTEN_KEEPALIVE uint8_t *pog_entry(uint8_t *input, uint32_t input_len, uint32_t *output_len);

onmessage = async (e: MessageEvent<{ program: Uint8Array, inputData: Uint8Array }>) => {
    const { program, inputData } = e.data;
    const module = await WebAssembly.compile(program);
    const instance = new WebAssembly.Instance(module, {});

    const exports = instance.exports as {
        memory: WebAssembly.Memory,
        pog_entry: (inputBuf: number, inputLen: number, outputLenPtr: number) => number
    };

    const mem = exports.memory.buffer;

    const outputLenPtr = new Uint32Array(mem, 0, 1);
    const inputBuf = new Uint8Array(mem, outputLenPtr.byteOffset + outputLenPtr.byteLength, inputData.byteLength);
    const inputLen = inputBuf.byteLength;
    inputBuf.set(inputData);

    const returnValue = exports.pog_entry(inputBuf.byteOffset, inputLen, outputLenPtr.byteOffset);
    const outputLen = outputLenPtr[0];
    const outputBuf = new Uint8Array(mem, returnValue, outputLen);

    console.log(`outputBuf ${outputBuf} "${new TextDecoder().decode(outputBuf)}"`)
    console.log('return value', returnValue);

    postMessage(outputBuf);
}