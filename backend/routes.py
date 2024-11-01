# routes.py
from fastapi import APIRouter, Depends, HTTPException, FastAPI, Form, UploadFile, File
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Recipe, User
from pydantic import BaseModel
from typing import List, Dict, Union, Optional

router = APIRouter()

class RecipeCreate(BaseModel):
    name: str
    course: List[str]
    category: List[str]
    portion: int
    ingredients: List[Dict[str, Union[str, float]]]
    description: str
    prep: float
    total: float
    guide: str
    img: Optional[str] = None

class RecipeResponse(BaseModel):
    id: int
    name: str
    course: List[str]
    category: List[str]
    portion: int
    ingredients: List[Dict[str, Union[float, str]]]
    description: str
    prep: float
    total: float
    guide: str
    img: Optional[str] = None

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    about: str

class UserResponse(BaseModel):
    id: int
    username: str
    password: str
    email: str
    about: str

    class Config:
        orm_mode = True

@router.post("/newrecipe")
async def create_recipe(
    name: str = Form(...),
    course: List[str] = Form(...),
    category: List[str] = Form(...),
    portion: int = Form(...),
    ingredients: str = Form(...),  # Pass as JSON string and parse in the function
    description: str = Form(...),
    prep: float = Form(...),
    total: float = Form(...),
    guide: str = Form(...),
    img: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Parse ingredients from JSON string if needed
    import json
    parsed_ingredients = json.loads(ingredients)
    
    db_recipe = Recipe(
        name=name,
        course=course,
        category=category,
        portion=portion,
        ingredients=parsed_ingredients,
        description=description,
        prep=prep,
        total=total,
        img=img,
        guide=guide
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.get("/recipes/all", response_model=List[RecipeResponse])
def read_all_recipes(db: Session = Depends(get_db)):
    recipes = db.query(Recipe).all()
    if not recipes:
        raise HTTPException(status_code=404, detail="No recipes found")
    return recipes

@router.get("/recipes/{recipe_id}")
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.delete("/deleterecipes/{recipe_id}")
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(recipe)
    db.commit()
    return {"detail": "Recipe deleted successfully"}

@router.post("/newuser")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    print(user.dict())  # Print data to server logs for inspection
    db_user = User( username=user.username,
                    password=user.password,
                    email=user.email,
                    about=user.about,
                        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/user/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/alluser", response_model=List[UserResponse])
def read_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="No user found")
    return users

@router.delete("/deleteuser/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}
