from dotenv import load_dotenv
import os
from pathlib import Path
import time
from typing import Optional, Union

import googlemaps


class GoogleMap:
    def __init__(self):
        apikey: str = self.get_apikey()
        self.gmaps = googlemaps.Client(key=apikey)

    @classmethod
    def get_apikey(cls) -> str:
        """ Get API_KEY that is environment variant
        """
        dotenv_path = Path(__file__).absolute().parents[2] / '.env'
        load_dotenv(dotenv_path)
        try:
            apikey: str = os.environ["API_KEY"]
        except KeyError:
            print("API_KEY doesn't exist")
            raise KeyError

        return apikey

    def get_current_locate(self) -> dict:
        """ Get your current location (from communication information, not GPS)
        """
        geolocate: dict = self.gmaps.geolocate()
        return geolocate

    def search_nearby(self, location: Optional[tuple] = None) -> list:
        """ Search 60 places that are nearby specified location.
        """
        results: list = []

        if location is None:
            geolocate: dict = self.get_current_locate()
            location = geolocate["location"]

        attr: dict = {
            "location": location,
            "radius": 10000,
            "language": "ja",
        }
        # We can get 20 places at one time.
        for i in range(1):
            places = self.gmaps.places_nearby(**attr)
            if places["status"] != "OK":
                continue
            results.extend(places["results"])
            try:
                # Update attribute to get next 20 places.
                attr = {
                    "page_token": places["next_page_token"]
                }
                # sleepを入れないとエラーが帰ってくる(Google側の仕様)
                time.sleep(2)
            except KeyError:
                # 最大で60件まで next_page_token が帰ってくる
                break

        return results

    def get_place_detail(self, place_id: str) -> dict:
        fields = [
            "formatted_address",
            "geometry",
            "name",
            "photo",
            "type",
            "url",
            "vicinity"
        ]
        place = self.gmaps.place(place_id, fields=fields, language="ja")
        if place["status"] != "OK":
            return {}
        import json
        with open("place_detail.json", mode="w", encoding="utf-8") as f:
            json.dump(place, f, ensure_ascii=True, indent=4)
        photos = place["result"]["photos"]
        photos = self.get_place_photos(photos)

        return place["result"]

    def get_place_photos(self, photo_refs: list[dict]) -> list[str]:
        """ Get photo image chunk from photo reference of google map api.

        ex)
        place = googlemaps.Client(key=apikey).place(place_id)
        photos = self.get_place_photos(place["result"]["photos"])
        """
        photos = []
        for i, photo_ref in enumerate(photo_refs):
            photos.append(self.gmaps.places_photo(
                photo_ref["photo_reference"], max_width=600
            ))

        return photos


if __name__ == '__main__':
    gmaps = GoogleMap()
    # places = gmaps.search_nearby()
    gmaps.get_place_detail("ChIJpzB3HgrkGGARsbyOD_WqzmY")
