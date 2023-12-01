from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import APIRouter
from api.base import api_router

app = FastAPI()

app.include_router(api_router, prefix="/api")
app.mount("/api", api_router, name="api")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    # uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
