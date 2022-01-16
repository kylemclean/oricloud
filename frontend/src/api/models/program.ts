import { CreateResult, Result } from "./result";

interface ProgramBase {
    name: string
}

export type Program = ProgramBase & {
    id: string
};

interface ProgramExecutable {
    executable: string
}

export type ProgramCreate = ProgramBase & {
    executable: File
};

export type ProgramData = ProgramBase & ProgramExecutable;

export type CreateProgramResult = CreateResult;