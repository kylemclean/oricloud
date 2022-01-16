#!/usr/bin/env python

import uvicorn

from typing import Optional

from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session

from typing import List

import models
from database import SessionLocal, engine
import schemas
import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/jobs/{user_id}", response_model=List[schemas.Job])
def read_jobs(user_id: str, db: Session = Depends(get_db)):
    jobs = crud.get_jobs_from_user(db, uid=user_id)
    return jobs


@app.post("/jobs")
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    job = crud.create_job(db, pid=job.program_id, input=job.input)
    if job is None:
        result = schemas.ResultError(success=False, error="Job not created")
    else:
        result = schemas.ResultPass(success=True, id=job.id)
    return result


@app.post("/programs")
def create_program(program: schemas.ProgramCreate, db: Session = Depends(get_db)):
    prog = crud.create_program(
        db, prog_name=program.name, executable=program.executable
    )
    if prog is None:
        result = schemas.ResultError(success=False, error="Program not created")
    else:
        result = schemas.ResultPass(success=True, id=prog.id)
    return result


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


def main():
    uvicorn.run("main:app", host="0.0.0.0", reload=True, debug=True, workers=3)


if __name__ == "__main__":
    main()
