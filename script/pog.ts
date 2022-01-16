import Worker from './worker.worker.ts';

interface Program {
    id: string,
    name: string,
}

interface JobData {
    id: string,
    input: string,
    program: Program
}

interface RunNew {
    id: string,
    key: string,
    job: JobData
}

const baseUrl = 'http://localhost:8000';

async function main() {
    const userId: string | undefined = document.currentScript.getAttribute("user");

    if (!userId) {
        console.log('user not set, not pogging');
        return;
    }

    const response = await fetch(`${baseUrl}/runs?user=${userId}`, {
        method: 'POST'
    });
    const runData: RunNew = await response.json();

    const executableResponse = await fetch(`${baseUrl}/programs/${runData.job.program.id}/executable`);
    const executableBuf = await executableResponse.arrayBuffer();

    const inputDataResponse = await fetch(`${baseUrl}/jobs/${runData.job.id}/input`);
    const inputDataBuf = await inputDataResponse.arrayBuffer();

    const worker = Worker();
    worker.onmessage = ({ data }) => {
        const { outputBuf } = data;
        const formData = new FormData();
        console.log(outputBuf)
        formData.append("key", runData.key);
        formData.append("output", new Blob([outputBuf]));

        fetch(`${baseUrl}/runs/${runData.id}`, {
            method: 'PUT',
            body: formData,
        }).then(uploadResponse => console.log(uploadResponse));
    };

    worker.postMessage({
        program: new Uint8Array(executableBuf),
        inputData: new Uint8Array(inputDataBuf)
    });
}

main();