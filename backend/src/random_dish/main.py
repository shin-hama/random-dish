from io import BytesIO
import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from random_dish.google_maps_wrapper import GoogleMap

app = FastAPI()

gmaps = GoogleMap()

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


@app.get("/apikey")
async def get_api() -> dict:
    apikey: str = GoogleMap.get_apikey()
    return {"apikey": apikey}


@app.get("/geolocate")
async def get_geolocate() -> dict:
    result = gmaps.get_current_locate()
    return result["location"]


@app.get("/place/{photo_ref}")
async def get_place_photo(photo_ref: str) -> dict:
    image_row = gmaps.get_place_photo(photo_ref)
    image = BytesIO(b''.join(image_row))
    image.seek(0)
    return {"photo": StreamingResponse(image.read(), media_type="image/jpeg")}


@app.get("/places/nearby")
async def get_search_nearby_result():
    result = gmaps.search_nearby()

    selected_places = random.sample(result, 2)

    places = [gmaps.get_place_detail(place["place_id"])
              for place in selected_places]

    return {"results": places}
