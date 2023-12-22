from typing import Callable, Iterator, Optional
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form, File, UploadFile
from security import manager
from api import deps
from models.user import User
import crud
from .session import get_session


@manager.user_loader(session_provider= get_session)
def get_user_by_name_manager(
    name: str,
    db: Optional[Session] = None,
    session_provider: Callable[[], Iterator[Session]] = None
) -> Optional[User]:
    """
    Queries the database for a user with the given name

    Args:
        name: The name of the user
        db: The currently active database session
        session_provider: Optional method to retrieve a session if db is None (provided by our LoginManager)

    Returns:
        The user object or none
    """

    if db is None and session_provider is None:
        raise ValueError("db and session_provider cannot both be None.")

    if db is None:
        db = next(session_provider())

    user = db.query(User).where(User.username == name).first()
    return user