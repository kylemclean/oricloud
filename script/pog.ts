import Worker from './worker.worker.ts';

const worker = Worker();
worker.onmessage = ({ data }) => console.log(data);

fetch('/bioplib.wasm').then(response => {
    response.arrayBuffer().then(data => {
        worker.postMessage({
            program: new Uint8Array(data),
            inputData: new TextEncoder().encode('jeff time')
        });
    })
});
