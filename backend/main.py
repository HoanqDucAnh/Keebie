from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import APIRouter, Request
from api.base import api_router
from fastapi.responses import JSONResponse
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.encoders import jsonable_encoder
from security import manager

from fastapi.exceptions import RequestValidationError
app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api")
app.mount("/api", api_router, name="api")


    

if __name__ == "__main__":
    import uvicorn
    import sys

    RELOAD = True if "--reload" in sys.argv else False
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=RELOAD)
