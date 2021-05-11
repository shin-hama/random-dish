
import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from random_dish.google_maps_wrapper import GoogleMap

app = FastAPI()
app.mount("/index", StaticFiles(directory="build", html=True), name="react")

# CORS setting
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gmaps = GoogleMap()


@app.get("/")
async def index() -> RedirectResponse:
    return RedirectResponse("/index")


@app.get("/api/places/nearby")
async def get_search_nearby_result(
        lat: float, lng: float, radius: int = 1000, open_now: bool = False
):
    fields = {
        "location": tuple([lat, lng]),
        "radius": radius,
        "open_now": open_now
    }
    result = gmaps.search_nearby(fields)

    selected_places = random.sample(result, 2)

    places = []
    for place in selected_places:
        place_detail = gmaps.get_place_detail(place["place_id"])
        place_detail["photos"] = [
            "data:image/jpeg;base64,"
            f"{gmaps.get_place_photo(photo['photo_reference'])}"
            for photo in place_detail["photos"][0:3]
        ]
        places.append(place_detail)

    return {"results": places}


if __name__ == "__main__":
    uvicorn.run("random_dish.main:app", port=8011, reload=True)
