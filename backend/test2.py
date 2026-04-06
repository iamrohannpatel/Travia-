import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

try:
    print("Using API KEY length:", len(GEMINI_API_KEY))
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model='gemini-2.0-flash', # Try 2.0-flash or 1.5-flash to see which exists in their project
        contents='Explain how AI works',
    )
    print(response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
