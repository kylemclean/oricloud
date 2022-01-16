from sqlalchemy.orm import Session

import models, schemas
import uuid


def get_jobs_from_user(db: Session, uid: str):
    jobs = []
    db_jobs = db.query(models.Job).filter(models.Job.creator_id == uid).all()
    for db_job in db_jobs:
        job_program = (
            db.query(models.Program)
            .filter(models.Program.id == db_job.program_id)
            .first()
        )
        job = schemas.Job(id=db_job.id, state=db_job.state, program=job_program)
        jobs.append(job)
    return jobs


def create_job(db: Session, pid, input):
    input_msg = bytes(input, "utf-8")
    # TODO: Get user id that created the job
    user_id = 1
    job = models.Job(
        id=str(uuid.uuid4()),
        program_id=pid,
        input=input_msg,
        creator_id=user_id,
        state="Pending",
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def create_program(db: Session, prog_name, executable):
    exec_bytes = bytes(executable, "utf-8")
    # TODO: Get user id that created the job
    uid = 1
    program = models.Program(
        id=str(uuid.uuid4()),
        name=prog_name,
        executable=exec_bytes,
        user_id=uid,
    )
    db.add(program)
    db.commit()
    db.refresh(program)
    return program
