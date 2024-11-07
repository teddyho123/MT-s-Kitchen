from fastapi import Query, APIRouter, Depends, HTTPException, Request, Form, FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import User, Recipe
from pydantic import BaseModel
from typing import Dict
from passlib.context import CryptContext
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
    like: Optional[int] = 0

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
    like: Optional[int] = 0
    user_id: int

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    id: int
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

class UserUpdate(BaseModel):
    username: Optional[str]
    password: Optional[str]
    email: Optional[str]
    about: Optional[str]

    class Config:
        orm_mode = True

# Helper functions for login/register
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
def get_user_by_email(email: str, db: Session) -> User:
    return db.query(User).filter(User.email == email).first()



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
    user_id: str = Form(...),
    likes: int = Form(...),
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
        guide=guide,
        user_id=str(user_id),
        likes=0
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

@router.post("/recipes/{recipe_id}/like")
def like_recipe(recipe_id: int, user_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if recipe_id not in user.liked_recipes:
        user.liked_recipes = user.liked_recipes + [recipe_id]
        recipe.likes += 1
        db.commit()
        db.refresh(user)
        db.refresh(recipe)
    else:
        raise HTTPException(status_code=404, detail="Already liked recipe")

    return {"likes": recipe.likes}

@router.post("/recipes/{recipe_id}/unlike")
def unlike_recipe(recipe_id: int, user_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.liked_recipes = [id for id in user.liked_recipes if id != recipe_id]
    recipe.likes = max(0, recipe.likes - 1)
    db.commit()
    db.refresh(user)
    db.refresh(recipe)

    return {"likes": recipe.likes}

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

@router.put("/user/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Update user details
    user.username = user_update.username or user.username
    user.password = user_update.password or user.password
    user.email = user_update.email or user.email
    user.about = user_update.about or user.about

    db.commit()
    db.refresh(user)
    return user

@router.get("/user/{user_id}/recipes", response_model=List[RecipeResponse])
def get_user_recipes(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    recipes = db.query(Recipe).filter(Recipe.user_id == user_id).all()
    return recipes

@router.get("/user/{user_id}/liked-recipes", response_model=List[RecipeResponse])
def get_user_liked_recipes(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    print(f"User's liked recipes: {user.liked_recipes}")
    
    liked_recipes = db.query(Recipe).filter(Recipe.id.in_(user.liked_recipes)).all()
    if not liked_recipes:
        return []
    return liked_recipes

@router.delete("/deleteuser/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted successfully"}

@router.post("/login", response_model=Dict[str, Union[str, bool]])
async def login(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    user = get_user_by_email(email, db)
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"success": True, "msg": "Login successful", "id": str(user.id)}

@router.post("/register")
async def register(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")
    user = get_user_by_email(email, db)
    if user:
        raise HTTPException(status_code=400, detail="An account with this email already exists")
    if not email or not password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    new_user = User(
        email=email,
        password=password,
        username=email.split('@')[0],
        about=""
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"msg": "Registration successful", "id":str(new_user.id)}

