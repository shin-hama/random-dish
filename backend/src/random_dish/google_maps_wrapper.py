from dotenv import load_dotenv
import os
from pathlib import Path
import time
from typing import Iterator, Optional

import googlemaps


class GoogleMap:
    def __init__(self):
        apikey: str = self.get_apikey()
        self.gmaps = googlemaps.Client(key=apikey)

    @classmethod
    def get_apikey(cls) -> str:
        """ Get API_KEY that is set environment variant
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

        Retrun
        ------
        geolocate : dict
            The current latitude and longitude and response information.
        """
        geolocate: dict = self.gmaps.geolocate()
        return geolocate

    def search_nearby(self, location: Optional[tuple] = None) -> list[dict]:
        """ Search 60 places that are nearby specified location.

        Parameter
        ---------
        location : tuple or None default is None
            The center location for searching.
            If the value is None, use current location.

        Return
        ------
        results : list of dict
            The places found by googlemap api
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

    def get_place_detail(self, place_id: str, fields: list[str] = []) -> dict:
        """ Get place information from place id. Return value

        Parameter
        ---------
        place_id : str
            Identified string to get place info from googlemap
        fields : list of str default is empty list
            List of detailed information to request googlemap api.
            Add this attribute to default fields.

        Return
        ------
        place["result"] : dict
            Place detail info that is extracted from responce of google map api
        """
        default_field: list = [
            "formatted_address",
            "geometry",
            "name",
            "photo",
            "type",
            "url",
            "vicinity"
        ]
        # Remove duplicate field from both input fields and default fields.
        fields = list(set([*fields, *default_field]))
        place = self.gmaps.place(place_id, fields=fields, language="ja")
        if place["status"] != "OK":
            return {}

        # # There are no "photos" key if the place has no photo.
        # photos = place["result"].get("photos", None)
        # if photos:
        #     place["result"]["photos"] = [
        #         self.get_place_photos(photo["photo_reference"])
        #         for photo in photos
        #     ]
        # else:
        #     place["result"]["photos"] = "noImage.png"

        return place["result"]

    def get_place_photo(self, photo_ref: str) -> Iterator:
        """ Get photo image chunk from photo reference of google map api.

        ex)
        place = googlemaps.Client(key=apikey).place(place_id)
        photos = self.get_place_photo(place["result"]["photos"]["reference"])

        Parameter
        ---------
        photo_refs : str
            The reference key to request googlemap api

        Return
        ------
        photo : Iterator
            Iterator containing raw image data
        """
        photo = self.gmaps.places_photo(photo_ref, max_width=600)
        return photo


if __name__ == '__main__':
    gmaps = GoogleMap()

    # places = gmaps.search_nearby()
    place = gmaps.get_place_detail("ChIJpzB3HgrkGGARsbyOD_WqzmY")
    photo = gmaps.get_place_photo(place["photos"][0]["photo_reference"])

    with open("image.png", mode="wb") as f:
        for chunk in photo:
            if chunk:
                f.write(chunk)
