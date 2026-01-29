from .services import router as services_router
from .barbers import router as barbers_router
from .bookings import router as bookings_router
from .auth import router as auth_router

__all__ = ["services_router", "barbers_router", "bookings_router", "auth_router"]
