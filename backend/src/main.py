from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import test_router
from .routers import auth_controller
from .routers import post_controller
from .routers import friend_controller

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
app.include_router(post_controller.router)
app.include_router(friend_controller.router)