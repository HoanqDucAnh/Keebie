from fastapi import APIRouter
from .routes import user
from .routes import auth
from .routes import category
from .routes import product
# from .routes import product_detail
from .routes import order, order_detail, status
from .routes import review
from .routes import cart
from .routes import sale, sale_detail
from .routes import voucher
from .routes import product_image



api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(product.router, prefix="/products", tags=["products"])
api_router.include_router(category.router, prefix="/categories", tags=["categories"])
# api_router.include_router(product_detail.router, prefix="/product_details", tags=["product_details"])
api_router.include_router(order.router, prefix="/orders", tags=["orders"])
api_router.include_router(order_detail.router, prefix="/order_details", tags=["order_details"])
api_router.include_router(status.router, prefix="/status", tags=["status"])
# api_router.include_router(customer.router, prefix="/customer", tags=["customers"])
api_router.include_router(cart.router, prefix="/cart", tags=["carts"])
api_router.include_router(review.router, prefix="/review", tags=["reviews"])
api_router.include_router(sale.router, prefix="/sale", tags=["sales"])
api_router.include_router(sale_detail.router, prefix="/sale_detail", tags=["sale_details"])
api_router.include_router(voucher.router, prefix="/voucher", tags=["vouchers"])
api_router.include_router(product_image.router, prefix="/product_images", tags=["product_images"])



