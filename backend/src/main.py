from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import test_router
from .routers import auth_controller

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(test_router.router)
app.include_router(auth_controller.router)