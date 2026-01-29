from routers.services import router as services_router
from routers.barbers import router as barbers_router
from routers.bookings import router as bookings_router
from routers.auth import router as auth_router

__all__ = ["services_router", "barbers_router", "bookings_router", "auth_router"]
