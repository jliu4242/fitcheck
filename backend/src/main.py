from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import comment_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(comment_router.router)