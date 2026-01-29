from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import engine, Base
from config import FRONTEND_URL, API_HOST, API_PORT
from routers import services_router, barbers_router, bookings_router, auth_router
from seed import seed_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed data
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield
    # Shutdown
    pass

app = FastAPI(
    title="Black Beard API",
    description="API для барбершопа Black Beard",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(services_router)
app.include_router(barbers_router)
app.include_router(bookings_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"status": "ok", "service": "Black Beard API"}

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=API_HOST, port=API_PORT)
