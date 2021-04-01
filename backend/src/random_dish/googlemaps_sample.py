from datetime import datetime
from dotenv import load_dotenv
import os
from pathlib import Path
import json

import googlemaps

dotenv_path = Path(__file__).absolute().parents[2] / '.env'
load_dotenv(dotenv_path)
apikey = os.environ.get("API_KEY")

gmaps = googlemaps.Client(key=apikey)

# # Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# # Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# # Request directions via public transit
# now = datetime.now()
# directions_result = gmaps.directions("Sydney Town Hall",
#                                      "Parramatta, NSW",
#                                      mode="transit",
#                                      departure_time=now)

# 検索条件 (input) に一致する場所を検索
place_result = gmaps.find_place(
    input=["Cafe", "Kanagawa", "Japan"],
    input_type="textquery",
    fields=["business_status", "formatted_address", "geometry",
            "icon", "name", "photos", "place_id", "plus_code", "types"]
)
with open("test.json", mode="w", encoding="utf-8") as f:
    json.dump(place_result, f, ensure_ascii=False, indent=2)
