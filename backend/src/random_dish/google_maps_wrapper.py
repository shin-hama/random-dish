from dotenv import load_dotenv
import os
from pathlib import Path
import time
from typing import Optional

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

    def search_nearby(self, location: Optional[tuple] = None):
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
        for i in range(3):
            places = self.gmaps.places_nearby(**attr)
            results.extend(places["results"])
            # sleepを入れないとエラーが帰ってくる(Google側の仕様)
            time.sleep(1.5)
            try:
                # Update attribute to get next 20 places.
                attr = {
                    "page_token": places["next_page_token"]
                }
            except KeyError:
                # 最大で60件まで next_page_token が帰ってくる
                break

        return results


if __name__ == '__main__':
    gmaps = GoogleMap()
    places = gmaps.search_nearby()

    print(places)
