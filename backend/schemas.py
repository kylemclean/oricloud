from typing import List, Optional
from pydantic import BaseModel


class ProgramBase(BaseModel):
    name: str


class Program(ProgramBase):
    id: str

    class Config:
        orm_mode = True


class JobBase(BaseModel):
    pass


class Job(JobBase):
    id: str
    state: str
    program: Program

    class Config:
        orm_mode = True


class JobData(JobBase):
    id: str
    program: Program


class RunBase(BaseModel):
    id: str


class Run(RunBase):
    state: str

    class Config:
        orm_mode = True


class RunNew(RunBase):
    key: str
    job: JobData


class RunCompletion(BaseModel):
    key: str
    output: str


class ResultBase(BaseModel):
    success: bool


class ResultPass(ResultBase):
    success: bool = True


class CreateResultPass(ResultPass):
    id: str


class ResultError(BaseModel):
    success: bool = False
    error: str
