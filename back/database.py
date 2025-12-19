from sqlmodel import SQLModel, create_engine, Session

sqlite_url = "sqlite:///./db.sqlite"
engine = create_engine(sqlite_url, echo=True)

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
