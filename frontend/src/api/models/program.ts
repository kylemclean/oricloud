import { Result } from "./result";

interface ProgramBase {
    name: string
}

export type Program = ProgramBase & {
    id: string
};

interface ProgramExecutable {
    executable: string
}

export type ProgramCreate = ProgramBase & ProgramExecutable;

export type ProgramData = ProgramBase & ProgramExecutable;

export type CreateProgramResult = Result;