from dotenv import load_dotenv
import os
from pathlib import Path

__version__ = '0.1.0'

dotenv_path = Path(__file__).absolute().parents[2] / '.env'
load_dotenv(dotenv_path)
print(os.environ.get("API_KEY"))
