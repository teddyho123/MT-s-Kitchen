from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "sqlite:///./backend/test.db"  # Example: SQLite for local development

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()  # Updated to use the new declarative_base import

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()