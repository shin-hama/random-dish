import random
from typing import Any

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

API_ROOT = "/api"


@app.get("/")
async def index() -> RedirectResponse:
    return RedirectResponse("/index")


@app.get(f"{API_ROOT}/geolocates")
async def get_geolocate():
    try:
        geolocate = gmaps.get_current_locate()
        return build_result(geolocate)
    except Exception as e:
        print(f"{e.__class__.__name__}: {str(e)}")
        raise e


@app.get(f"{API_ROOT}/places/nearby")
async def get_search_nearby_result(
        lat: float, lng: float, radius: int = 1000, open_now: bool = False
):
    fields = {
        "location": tuple([lat, lng]),
        "radius": radius,
        "open_now": open_now
    }
    try:
        result = gmaps.search_nearby(fields)

        selected_places = random.sample(result, 2)
        return build_result(selected_places)
    except Exception as e:
        print(f"{e.__class__.__name__}: {str(e)}")
        raise e


@app.get(f"{API_ROOT}/details/{{place_id}}")
async def get_place_detail(place_id: str):
    try:
        place_detail = gmaps.get_place_detail(place_id)
        return build_result(place_detail)
    except Exception as e:
        print(f"{e.__class__.__name__}: {str(e)}")
        raise e


@app.get(f"{API_ROOT}/photos/{{ref}}")
async def get_place_photo(ref: str):
    try:
        photo = f"data:image/jpeg;base64,{gmaps.get_place_photo(ref)}"
        return build_result(photo)
    except Exception as e:
        print(f"{e.__class__.__name__}: {str(e)}")
        raise e


def build_result(result: Any) -> dict:
    print(result)
    if isinstance(result, dict):
        return result
    else:
        return {"result": result}


def main():
    uvicorn.run("random_dish.main:app", port=8011, reload=True)


if __name__ == "__main__":
    main()
