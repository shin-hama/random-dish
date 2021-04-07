import os
from dotenv import load_dotenv
from pathlib import Path
from random import randint

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from google_maps_wrapper import GoogleMap

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
async def get_api() -> dict:
    apikey: str = GoogleMap.get_apikey()
    return {"apikey": apikey}


@app.get("/search_nearby")
async def get_search_nearby_result():
    gmaps = GoogleMap()
    result = gmaps.search_nearby()

    return {"results": len(result)}
