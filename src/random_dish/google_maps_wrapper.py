import base64
from dotenv import load_dotenv
import os
from pathlib import Path
import time

import googlemaps


class GoogleMap:
    def __init__(self):
        apikey: str = self.get_apikey()
        self.gmaps = googlemaps.Client(key=apikey)
        print("setup successfully: googlemap api wrapper")

    @classmethod
    def get_apikey(cls) -> str:
        """ Get API_KEY that is set environment variant
        """
        dotenv_path = Path(__file__).absolute().parents[2] / '.env'
        if dotenv_path.exists():
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

    def search_nearby(self, fields: dict) -> list[dict]:
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

        print(fields)
        if "location" not in fields.keys():
            geolocate: dict = self.get_current_locate()
            fields["location"] = geolocate["location"]

        if "radius" not in fields.keys():
            fields["radius"] = 1000
        print(fields)

        for i in range(1):
            places = self.gmaps.places_nearby(**fields)
            if places["status"] != "OK":
                continue
            results.extend(places["results"])
            try:
                # Update attribute to get next 20 places.
                fields = {
                    "page_token": places["next_page_token"]
                }
                # 連続実行するとエラー(Google側の仕様)
                time.sleep(2)
            except KeyError:
                # 最大で60件まで それ以上検索すると next_page_token がなくなる
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
            "vicinity",
            "rating",
        ]
        # Remove duplicate field from both input fields and default fields.
        fields = list(set([*fields, *default_field]))
        place = self.gmaps.place(place_id, fields=fields, language="ja")
        if place["status"] != "OK":
            return {}

        return place["result"]

    def get_place_photo(self, photo_ref: str) -> str:
        """ Get photo image chunk from photo reference of google map api.
        The place photo will be converted to base64 to display on browser.

        ex)
        place = googlemaps.Client(key=apikey).place(place_id)
        photos = self.get_place_photo(place["result"]["photos"]["reference"])

        Parameter
        ---------
        photo_refs : str
            The reference key to request googlemap api

        Return
        ------
        photo : str
            The string of image date encoded to base64
        """
        photo_bin = self.gmaps.places_photo(photo_ref, max_width=1000)
        photo = base64.b64encode(b''.join(photo_bin)).decode()
        return photo


if __name__ == '__main__':
    gmaps = GoogleMap()
