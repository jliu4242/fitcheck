import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Import all models to register them with Base
from src.models.base import Base

load_dotenv()

database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url, echo=True)

def create_tables():
    print("Creating tables...")
    Base.metadata.create_all(engine)
    print("Tables created successfully!")

def drop_tables():
    print("Dropping tables...")
    Base.metadata.drop_all(engine)
    print("Tables dropped!")

if __name__ == "__main__":
    create_tables()
    
    # drop tables here
    # drop_tables()