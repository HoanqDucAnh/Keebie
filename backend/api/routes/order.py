from typing import List
from fastapi import APIRouter, HTTPException, status, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from schemas.order import OrderCreate, OrderById, OrderBase
from schemas.user import UserById
from fastapi_login import LoginManager
from sqlalchemy.exc import SQLAlchemyError
from api import deps
import crud

router = APIRouter()

@router.post("/", response_model=OrderById)
def create_order(order_in: OrderCreate, db: Session = Depends(deps.get_db)):
    try:
        return crud.order.create(db, obj_in=order_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/{id}", response_model=OrderById)
def get_order_by_id(id: int, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_customer/{user_id}", response_model=List[OrderById])
def get_order_by_customer(user_id: int, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_user(db, user_id=user_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with customer ID {user_id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_status/{status_id}", response_model=List[OrderById])
def get_order_by_status(status_id: int, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_status(db, status_id=status_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with status ID {status_id} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

@router.put("/{id}", response_model=OrderById)
def update_order(id: int, order_in: OrderCreate, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    try :
        return crud.order.update(db, db_obj=order, obj_in=order_in)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/", response_model=List[OrderById])
def get_all_orders(db: Session = Depends(deps.get_db)):
    orders = crud.order.get_all(db)
    if not orders:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No orders found",
        )
    
    try :
        return orders
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
        
@router.get("/by_status_name/{status_name}", response_model=List[OrderById])
def get_order_by_status_name(status_name: str, db: Session = Depends(deps.get_db)):
    order = crud.orderInteract.get_by_status_name(db, status_name=status_name)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with status name {status_name} not found",
        )
    
    try :
        return order
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )
    
@router.delete("/{id}", response_model=int)
def delete_order(id: int, db: Session = Depends(deps.get_db)):
    order = crud.order.get(db, id=id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {id} not found",
        )
    order_details = crud.order_detailInteract.get_by_order(db, order_id=id)
    try:
        for order_detail in order_details:
            order_detail_stock = order_detail.amount
            product_in_stock = crud.productInteract.get_stock_by_id(db, id = order_detail.product_id)
            crud.productInteract.update_stock_by_id(db, id=order_detail.product_id, stock=order_detail.amount + product_in_stock)
            crud.order_detail.remove(db, obj=order_detail)
        return crud.order.remove(db, obj=order)
    except SQLAlchemyError as e:
        error = str(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error,
        )

def send_order_mail(order: OrderById, email : str, user: UserById, order_details: List[OrderBase]):
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

    