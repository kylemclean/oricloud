from sqlalchemy.orm import Session

import models, schemas
import uuid

from main import app


def get_jobs_from_user(db: Session, uid):
    jobs = []
    db_jobs = db.query(models.Job).filter(models.Job.creator_id == uid).all()
    for db_job in db_jobs:
        job = get_job(db, db_job.id)
        jobs.append(job)
    return jobs


def create_job(db: Session, pid, input, user_id):
    input_msg = bytes(input)
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


def get_job(db: Session, id):
    db_job = db.query(models.Job).filter(models.Job.id == id).first()
    job_program = (
        db.query(models.Program).filter(models.Program.id == db_job.program_id).first()
    )
    return schemas.Job(id=db_job.id, state=str(db_job.state), program=job_program)


def get_job_input(db: Session, id: str):
    db_job = db.query(models.Job).filter(models.Job.id == id).first()
    return db_job.input


def get_progs_from_user(db: Session, uid: str):
    progs = []
    db_progs = db.query(models.Program).filter(models.Program.user_id == uid).all()
    for db_prog in db_progs:
        prog = get_prog(db, db_prog.id)
        progs.append(prog)
    return progs


def create_program(db: Session, prog_name, executable, uid):
    exec_bytes = bytes(executable)
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


def get_prog(db: Session, id):
    db_prog = db.query(models.Program).filter(models.Program.id == id).first()
    prog = schemas.Program(id=db_prog.id, name=db_prog.name)
    return prog


def get_prog_executable(db: Session, id: str):
    db_prog = db.query(models.Program).filter(models.Program.id == id).first()
    return db_prog.executable


def get_runs_from_job(db: Session, jid: str):
    runs = []
    db_runs = db.query(models.Run).filter(models.Run.job_id == jid).all()
    for db_run in db_runs:
        run = get_run(db, db_run.id)
        runs.append(run)
    return runs


def create_run(db: Session, id):
    job = (
        db.query(models.Job)
        .filter((models.Job.creator_id == id) and (models.Job.state == "Pending"))
        .first()
    )
    program_db = (
        db.query(models.Program).filter(models.Program.id == job.program_id).first()
    )
    program = schemas.Program(name=program_db.name, id=program_db.id)
    job_data = schemas.JobData(id=job.id, input=job.input, program=program)
    run = models.Run(
        id=str(uuid.uuid4()), state="Pending", key=str(uuid.uuid4()), job_id=job.id
    )
    new_run = schemas.RunNew(id=run.id, key=run.key, job=job_data)
    db.add(run)
    db.commit()
    db.refresh(run)
    return new_run


def get_run(db: Session, id):
    db_run = db.query(models.Run).filter(models.Run.id == id).first()
    run = schemas.Run(id=db_run.id, state=str(db_run.state))
    return run


def get_run_completion(db: Session, id):
    run_completion = (
        db.query(models.RunCompletion).filter(models.RunCompletion.run_id == id).first()
    )
    return run_completion


def complete_run(db: Session, out_data, id):
    db.query(models.Run).filter(models.Run.id == id).update(
        {"state": "Completed"}, synchronize_session="fetch"
    )
    output_data = bytes(out_data)
    run_com = models.RunCompletion(run_id=id, output=output_data)
    db.add(run_com)
    db.commit()
    db.refresh(run_com)
    return run_com
