# routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Item
from pydantic import BaseModel
from typing import Union

router = APIRouter()

class ItemCreate(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@router.post("/items/")
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(name=item.name, price=item.price, is_offer=item.is_offer)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/items/{item_id}")
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
