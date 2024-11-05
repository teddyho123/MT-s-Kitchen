# models.py
from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
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
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="recipes")
    likes = Column(Integer, default=0)
    liked_by_users = relationship(
        "User",
        secondary="user_recipe_likes",
        back_populates="liked_recipes"
    )

    def increment_likes(self,session):
        self.likes += 1
        session.commit()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, nullable=False)
    password = Column(String, index=True, nullable=False)
    email = Column(String, index=True, nullable=False)
    about = Column(String, index=True, nullable=True)
    recipes = relationship("Recipe", back_populates="user")
    liked_recipes = relationship(
        "Recipe",
        secondary="user_recipe_likes",
        back_populates="liked_by_users"
    )


class UserRecipeLikes(Base):
    __tablename__ = "user_recipe_likes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    recipe_id = Column(String, ForeignKey("recipes.id"), nullable=False)

    __table_args__ = (UniqueConstraint('user_id', 'recipe_id', name='_user_recipe_uc'),)