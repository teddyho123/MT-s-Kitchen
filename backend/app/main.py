from typing import Annotated
from fastapi import Depends, FastAPI
from sqlmodel import Session
from models import create_db_and_tables, get_session
#/C/Users/ticka/AppData/Local/Programs/Python/Python313/python.exe -m pip install



SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()

async def lifespan():
    create_db_and_tables()