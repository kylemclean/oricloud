import { Program, ProgramData } from "./program";
import { CreateResult, Result } from "./result";

interface JobBase { }

export type Job = JobBase & {
    id: string,
    state: string,
    program: Program
};

export type JobCreate = JobBase & {
    program_id: string,
    input: string
};

export type JobData = JobBase & {
    id: string,
    input: string,
    program: ProgramData
}

export type CreateJobResult = CreateResult;