from typing import List, Optional
from pydantic import BaseModel


class ProgramBase(BaseModel):
    name: str


class Program(ProgramBase):
    id: str

    class Config:
        orm_mode = True


class ProgramCreate(ProgramBase):
    executable: str


class ProgramData(Program):
    executable: str


class JobBase(BaseModel):
    pass


class Job(JobBase):
    id: str
    state: str
    program: Program

    class Config:
        orm_mode = True


class JobCreate(JobBase):
    program_id: str
    input: str


class JobData(JobBase):
    id: str
    input: str
    program: ProgramData


class RunBase(BaseModel):
    id: str


class Run(RunBase):
    state: str

    class Config:
        orm_mode = True


class RunNew(RunBase):
    key: str
    job: JobData


class RunOutputData(BaseModel):
    output: str
    

class ResultBase(BaseModel):
    success: bool


class ResultPass(BaseModel):
    id: str


class ResultError(BaseModel):
    error: str

