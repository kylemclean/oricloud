#!/usr/bin/env python

import uvicorn

from typing import Optional

from fastapi import FastAPI

app = FastAPI()


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
