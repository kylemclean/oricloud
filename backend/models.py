import enum
from sqlalchemy import Column, ForeignKey, Integer, String, LargeBinary, Enum
from sqlalchemy.orm import relationship

from .database import Base


class State(enum.Enum):
    Pending = 1
    Cancelled = 2
    Completed = 3


class Job(Base):
    __tablename__ = "job"

    id = Column(String, primary_key=True)
    input = Column(LargeBinary)
    programId = Column(String, ForeignKey("program.id"))
    creatorId = Column(String, ForeignKey("user.id"))
    state = Column(Enum(State))

    program = relationship("Program")
    creator = relationship("Creator")


class JobResult(Base):
    __tablename__ = "jobresult"

    run_id = Column(String, ForeignKey("run.id"), primary_key=True)
    output = Column(LargeBinary)

    run = relationship("Run")


class Run(Base):
    __tablename__ = "run"

    id = Column(String, primary_key=True)
    state = Column(Enum(State))
    key = Column(String)
    jobId = Column(String, ForeignKey("job.id"))

    job = relationship("Job")


class Program(Base):
    __tablename__ = "program"

    id = Column(String, primary_key=True)
    name = Column(String)
    executable = Column(LargeBinary)
    user = Column(String, ForeignKey("user.id"))

    user = relationship("User")


class User:
    __tablename__ = "user"

    id = Column(String, primary_key=True)
    email = Column(String)
    password = Column(String)
