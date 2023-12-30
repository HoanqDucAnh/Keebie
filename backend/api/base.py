from fastapi import APIRouter
from .routes import user
from .routes import auth
from .routes import category
from .routes import product
from .routes import product_image
from .routes import order
from .routes import order_detail
from .routes import status
from .routes import verify

api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(product.router, prefix="/products", tags=["products"])
api_router.include_router(category.router, prefix="/categories", tags=["categories"])
api_router.include_router(product_image.router, prefix="/product_images", tags=["product_images"])
api_router.include_router(order.router, prefix="/orders", tags=["orders"])
api_router.include_router(order_detail.router, prefix="/order_details", tags=["order_details"])
api_router.include_router(status.router, prefix="/status", tags=["status"])
api_router.include_router(verify.router, prefix="/verify", tags=["verify"])



