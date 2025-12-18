from fastapi import FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, echo=True)



class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str   # plain text for school project ONLY

class Post(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    content: str
    user_id: int = Field(foreign_key="user.id")



@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)



@app.post("/register")
def register_user(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return {
            "message": "User registered successfully",
            "user": user
        }



@app.post("/posts")
def create_post(post: Post):
    with Session(engine) as session:
        session.add(post)
        session.commit()
        session.refresh(post)
        return {
            "message": "Post created successfully",
            "post": post
        }


@app.get("/posts")
def get_posts():
    with Session(engine) as session:
        posts = session.exec(select(Post)).all()
        return posts
