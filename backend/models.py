# models.py
from sqlalchemy import Column, Integer, String, Float, Boolean, JSON
from backend.database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    course = Column(JSON, nullable=False, default=[])
    category = Column(JSON, nullable=False, default=[])
    portion = Column(Integer, index=True, nullable=False)
    ingredients = Column(JSON, nullable=False, default=[])
    description = Column(String, index=True, nullable=False)
    prep = Column(Float, index=True)
    total = Column(Float, index=True, nullable=False)
    img = Column(String, index=True)
    guide = Column(String, index=True, nullable=False)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, nullable=False)
    password = Column(String, index=True, nullable=False)
    email = Column(String, index=True, nullable=False)
    about = Column(String, index=True, nullable=True)
