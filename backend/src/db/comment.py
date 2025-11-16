from sqlalchemy.orm import Session
from sqlalchemy import select

def get_content(db:Session, id:str):
    db.query()