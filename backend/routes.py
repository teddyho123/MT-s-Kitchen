# routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Recipe
from pydantic import BaseModel
from typing import List, Dict, Union, Optional

router = APIRouter()

class RecipeCreate(BaseModel):
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

@router.post("/newrecipe/")
async def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    print(recipe.dict())  # Print data to server logs for inspection
    db_recipe = Recipe( name=recipe.name,
                        course=recipe.course,
                        category=recipe.category,
                        portion=recipe.portion,
                        ingredients=recipe.ingredients,
                        description=recipe.description,
                        prep=recipe.prep,
                        total=recipe.total,
                        guide=recipe.guide
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
