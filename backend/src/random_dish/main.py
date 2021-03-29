import os
from dotenv import load_dotenv
from pathlib import Path
from random import randint

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setting
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_test():
    result = [randint(0, 100) for _ in range(0, 4)]
    return {"test": result}


@app.get("/api-key")
async def get_api():
    dotenv_path = Path(__file__).absolute().parents[2] / '.env'
    load_dotenv(dotenv_path)
    return os.environ.get("API_KEY")
