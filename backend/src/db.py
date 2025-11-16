from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, poolclass=NullPool)
session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()