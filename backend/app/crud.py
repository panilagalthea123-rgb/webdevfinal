from sqlmodel import Session, select
from .models import Item

def create_item(session: Session, item: Item):
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

def get_items(session: Session):
    return session.exec(select(Item)).all()
