#!/usr/bin/env python

import uvicorn

from typing import Optional

from fastapi import FastAPI, Depends, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from typing import List

import models
from database import SessionLocal, engine
import schemas
import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/jobs", response_model=List[schemas.Job])
def read_jobs(db: Session = Depends(get_db)):
    # TODO: Set up authentication stuff to let API know which user ran the GET
    user_id = "1"
    jobs = crud.get_jobs_from_user(db, uid=user_id)
    return jobs


@app.post("/jobs")
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    job = crud.create_job(db, pid=job.program_id, input=job.input)
    if job is None:
        result = schemas.ResultError(error="Job not created")
    else:
        result = schemas.CreateResultPass(id=job.id)
    return result


@app.get("/jobs/{job_id}", response_model=schemas.Job)
def get_job_by_id(job_id: str, db: Session = Depends(get_db)):
    job = crud.get_job(db, id=job_id)
    return job


@app.get("/programs", response_model=List[schemas.Program])
def read_progs(db: Session = Depends(get_db)):
    # TODO: Set up authentication stuff to let API know which user ran the GET
    user_id = "1"
    jobs = crud.get_progs_from_user(db, uid=user_id)
    return jobs


@app.post("/programs")
def create_program(
    name: str = Form(...), executable: bytes = File(...), db: Session = Depends(get_db)
):
    prog = crud.create_program(db, prog_name=name, executable=executable)
    if prog is None:
        result = schemas.ResultError(error="Program not created")
    else:
        result = schemas.CreateResultPass(id=prog.id)
    return result


@app.get("/programs/{prog_id}", response_model=schemas.Program)
def get_prog_by_id(prog_id: str, db: Session = Depends(get_db)):
    job = crud.get_prog(db, id=prog_id)
    return job


@app.get("/runs", response_model=List[schemas.Run])
def read_runs(job: str, db: Session = Depends(get_db)):
    runs = crud.get_runs_from_job(db, jid=job)
    return runs


@app.post("/runs")
def run_job(user: str, db: Session = Depends(get_db)):
    new_run = crud.create_run(db, id=user)
    if new_run is None:
        result = schemas.ResultError(error="Job not run")
        return result
    else:
        return new_run


@app.get("/runs/{run_id}", response_model=schemas.Run)
def get_run_by_id(run_id: str, db: Session = Depends(get_db)):
    run = crud.get_run(db, id=run_id)
    return run


@app.put("/runs/{run_id}")
def complete_run(
    run_data: schemas.RunCompletion, run_id: str, db: Session = Depends(get_db)
):
    # TODO: Check key
    run = crud.complete_run(db, out_data=run_data.output, id=run_id)
    if run is None:
        result = schemas.ResultError(error="Run not created")
    else:
        result = schemas.ResultPass()
    return result


def main():
    uvicorn.run("main:app", host="0.0.0.0", reload=True, debug=True, workers=3)


if __name__ == "__main__":
    main()
