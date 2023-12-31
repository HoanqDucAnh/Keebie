from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import VerifyBase, VerifyById, VerifyCreate, VerifyUpdate, VerifyByUserId, VerifyByCode, VerifyRealCreate
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from sqlalchemy.exc import SQLAlchemyError
from api import deps
from security import manager
import logging
import crud
import datetime
import sqlalchemy
from fastapi import BackgroundTasks

router = APIRouter()

@router.post("/", response_model=VerifyById)
def create_verify(verify_in: VerifyCreate, backgroundtasks: BackgroundTasks,db: Session = Depends(deps.get_db)):
    try:
        obj = VerifyRealCreate()
        obj.email = verify_in.email
        # Create verify code
        import random
        verify_code = random.randint(100000, 999999)
        obj.verify_code = verify_code
        temp = crud.verify.create(db, obj_in=obj)
        crud.verifyInteract.update_expired_at(db, id=temp.id)
        user = crud.user.get(db, id=temp.user_id)
        backgroundtasks.add_task(send_verify_mail, user.email, temp.verify_code)
        return temp
    except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )
            


@router.get("/{id}", response_model=VerifyById)
def get_verify_by_id(id: int, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_email/{email}", response_model=VerifyByUserId)
def get_verify_by_email(email: str, db: Session = Depends(deps.get_db)):
    verify = crud.verifyInteract.get_by_email(db, email=email)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with email {email} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_code/{code}", response_model=VerifyByCode)
def get_verify_by_code(code: str, db: Session = Depends(deps.get_db)):
    verify = crud.verifyInteract.get_by_code(db, code=code)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with code {code} not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.delete("/{id}", response_model=int)
def delete_verify(id: int, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try:
        return crud.verify.remove(db, obj=verify)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.put("/{id}", response_model=VerifyById)
def update_verify(id: int, verify_in: VerifyBase, db: Session = Depends(deps.get_db)):
    verify = crud.verify.get(db, id=id)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with ID {id} not found",
        )
    
    try:
        return crud.verify.update(db, db_obj=verify, obj_in=verify_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[VerifyById])
def get_all_verify(db: Session = Depends(deps.get_db)):
    verify = crud.verify.get_multi(db)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify not found",
        )
    
    try :
        return verify
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        

@router.post("/verify/{verify_code}", response_model=VerifyById)
def verify_user(verify_code: str, db: Session = Depends(deps.get_db)):
    verify = crud.verifyInteract.get_by_code(db, code=verify_code)
    if not verify:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Verify with code {verify_code} not found",
        )
    

    if (verify.expired_at < datetime.datetime.now()):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Verify code expired",
        )
    elif(verify.activated == True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Verify code already activated",
        )
    else:
        try:
            crud.verifyInteract.update_activated(db, id=verify.id)
            return verify
        except SQLAlchemyError as e:
            error = str(e),
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error,
            )
            
def send_verify_mail(email: str, verify_code: str):
    import smtplib, ssl
    import email.message as em
    
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    password = "usdd bbkj bskh lbdz"
    msg = em.Message()
    msg['Subject'] = 'Verify your email'
    msg['From'] = "keebiekeyboard.uet@gmail.com"
    msg['To'] = email
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload("""\
        <!doctype html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">
                Congrats for sending test email with Mailtrap!
            </h1>
            <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
            <img alt="Inspect with Tabs" src="cid:welcome.png" style="width: 100%;">
            <p>Now send your email using our fake SMTP server and integration of your choice!</p>
            <p>Good luck! Hope it works.</p>
            </div>
            <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
            <style>
            .main { background-color: white; }
            a:hover { border-left-width: 1em; min-height: 2em; }
            </style>
        </body>
        </html>
        """)
    
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(msg['From'], password)
        server.sendmail(msg['From'], [msg['To']], msg.as_string())
        print("Email sent!")
        
def deleteAllVerifyByExpired(db: Session = Depends(deps.get_db)):
    try:
        crud.verifyInteract.delete_all_expired(db)
    except SQLAlchemyError as e:
        error = str(e),
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
def deleteAllVerifyByEmail(email: str, db: Session = Depends(deps.get_db)):
    try:
        crud.verifyInteract.delete_all_by_email(db, email=email)
    except SQLAlchemyError as e:
        error = str(e),
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )