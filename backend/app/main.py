from fastapi import FastAPI, Depends
from sqlmodel import Session
from .database import create_db, get_session
from .models import Item
from .crud import create_item, get_items

app = FastAPI()

@app.on_event("startup")
def on_start():
    create_db()

@app.get("/")
def root():
    return {"message": "API is running!"}

@app.post("/items")
def post_item(item: Item, session: Session = Depends(get_session)):
    return create_item(session, item)

@app.get("/items")
def read_items(session: Session = Depends(get_session)):
    return get_items(session)
