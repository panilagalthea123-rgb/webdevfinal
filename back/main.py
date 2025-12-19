from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, User, Post

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- SCHEMAS --------
class Register(BaseModel):
    username: str
    email: str
    password: str

class PostCreate(BaseModel):
    title: str
    body: str
    userId: int

# -------- ROUTES --------
@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/register")
def register_user(user: Register):
    db: Session = SessionLocal()

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {
        "message": "User saved to database",
        "user_id": new_user.id
    }

@app.post("/posts")
def create_post(post: PostCreate):
    db: Session = SessionLocal()

    new_post = Post(
        title=post.title,
        body=post.body,
        user_id=post.userId
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    db.close()

    return {
        "message": "Post saved to database",
        "post_id": new_post.id
    }

@app.get("/posts")
def get_posts():
    db: Session = SessionLocal()
    posts = db.query(Post).all()
    db.close()

    return posts
