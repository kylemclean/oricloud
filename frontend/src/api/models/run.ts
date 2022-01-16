import { JobData } from "./job";
import { Result } from "./result";

interface RunBase {
    id: string
}

export type Run = RunBase & {
    state: string
};

export type RunNew = RunBase & {
    key: string,
    job: JobData
};

export interface RunCompletion {
    key: string,
    output: string
}

export type CompleteRunResult = Result;