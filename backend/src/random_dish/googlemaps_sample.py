from datetime import datetime
from dotenv import load_dotenv
import os
from pathlib import Path
import json
import time

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
# place_result = gmaps.find_place(
#     input=["Cafe", "Kanagawa", "Japan"],
#     input_type="textquery",
#     fields=["business_status", "formatted_address", "geometry",
#             "icon", "name", "photos", "place_id", "plus_code", "types"]
# )
# with open("test.json", mode="w", encoding="utf-8") as f:
#     json.dump(place_result, f, ensure_ascii=False, indent=2)

# 現在位置を取得（GPSではなく通信情報から）
geolocate_result = gmaps.geolocate()

results = gmaps.places_nearby(
    geolocate_result["location"], radius=1000, language="ja",
)
for r in results["results"]:
    print(r["name"])

for i in range(2):
    print("=" * 10 + f" {i+1} times " + "="*10)
    try:
        # sleepを入れないとエラーが帰ってくる(Google側の仕様)
        time.sleep(1.5)
        results = gmaps.places_nearby(
            page_token=results["next_page_token"]
        )
        for r in results["results"]:
            print(r["name"])
    except KeyError:
        # 最大で60件まで検索可能、60件終わると next_page_token が含まれなくなる。
        break
